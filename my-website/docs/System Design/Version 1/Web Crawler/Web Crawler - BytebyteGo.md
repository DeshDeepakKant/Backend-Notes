# Additional Notes — Large-Scale Web Crawler

These are **only the concepts that were not covered in the previous notes**.

## 1. Scale Calculation: 1 Billion Pages / Month

A large-scale crawler might need to crawl:

> **1 billion pages every month**

This translates to roughly:

> **400 pages/second**

So the crawler cannot be a single-process application. It needs to be designed as a **distributed, high-throughput system**.

The main requirements at this scale are:

* High throughput
* Distributed execution
* Politeness toward websites
* Intelligent crawl prioritization
* Fault tolerance

---

# 2. Host-Based Queuing

The previous notes discussed rate limiting, but this video introduces a more specific architecture for **per-host politeness**.

### Problem

Suppose the crawler discovers:

```text
wikipedia.org/page1
wikipedia.org/page2
wikipedia.org/page3
...
wikipedia.org/page100000
```

A normal global queue could cause the workers to continuously hit Wikipedia.

Even if the crawler has thousands of workers, a single website should not receive thousands of simultaneous requests.

### Solution: Group URLs by Host

Conceptually:

```text
URL
 ↓
Extract Host
 ↓
Host Queue
 ↓
Delayed Requests
```

All URLs belonging to the same host should be processed through the same logical queue.

This allows the crawler to control:

> **How frequently requests are sent to each website.**

---

# 3. Why We Don't Create One Queue Per Website

There can be **millions of websites**.

Creating a dedicated queue for every host would be inefficient.

Instead, the video proposes using a **fixed number of queues**, for example:

```text
Queue 0
Queue 1
Queue 2
...
Queue 999
```

Then use hashing:

```text
host
 ↓
hash(host)
 ↓
hash % number_of_queues
 ↓
queue
```

For example:

```text
example.com
     ↓
   hash
     ↓
Queue 27

wikipedia.org
     ↓
   hash
     ↓
Queue 832
```

### Important property

The same host always maps to the same queue.

Therefore:

```text
wikipedia.org/page1 ─┐
wikipedia.org/page2 ─┼──→ Queue 832
wikipedia.org/page3 ─┘
```

This provides a scalable way to maintain host-level request control without maintaining millions of queues.

---

# 4. Crawl Frontier

The **frontier** is the collection of URLs that are waiting to be crawled.

Think of it as:

```text
Discovered URLs
      ↓
   Frontier
      ↓
URLs waiting to be fetched
```

The important addition from this video is that the frontier is **not simply a FIFO queue**.

URLs can have different priorities.

For example:

```text
High priority
    ↓
Apple homepage

Medium priority
    ↓
Popular article

Low priority
    ↓
Obscure forum post
```

The scheduler decides which URL should be crawled next.

---

# 5. Crawl Prioritization

A large crawler should not treat every URL equally.

The video gives factors that can influence priority:

### Popularity

More popular pages may receive higher priority.

### Update frequency

Pages that change frequently may need to be crawled more often.

### Number of incoming links

A page linked to by many other websites may receive higher priority.

So conceptually:

```text
URL
 ↓
Priority Model
 ↓
Priority Score
 ↓
Frontier
```

The video mentions that real-world prioritization models can become sophisticated and may use **machine learning models that adapt in real time**.

For understanding the architecture, the important idea is:

> **A web crawler should strategically decide what to crawl next rather than simply crawling URLs in discovery order.**

---

# 6. URL Seen vs Content Seen

This is an important distinction that was not covered previously.

A crawler needs to detect **two different types of duplication**.

## URL Seen

Answers:

> "Have I already crawled this URL?"

Example:

```text
https://example.com/article
```

If discovered again, don't crawl it again.

```text
URL
 ↓
URL Seen?
 ↓
YES → Skip
NO  → Crawl
```

This prevents duplicate **requests**.

---

## Content Seen

Answers:

> "Have I already seen this content?"

Two different URLs can contain identical content.

Example:

```text
example.com/article
example.org/copied-article
```

Different URLs, but potentially identical pages.

Therefore:

```text
URL A ──→ Content X
URL B ──→ Content X
```

A content-deduplication system can identify that both pages contain the same content.

The video suggests hashing:

* Page text
* Page structure

to identify duplicate content.

### Key distinction

```text
URL Seen
→ prevents duplicate URLs

Content Seen
→ prevents duplicate content
```

---

# 7. Parsing Pipeline

The video gives a more explicit pipeline after downloading a page:

```text
Download
   ↓
Parse
   ↓
Extract
   ↓
Filter
   ↓
Prioritize
   ↓
Frontier
   ↓
Download again
```

### Parser

After downloading HTML, the parser:

* Validates HTML
* Extracts useful text
* Finds links

Then the **link extractor** processes discovered links.

---

# 8. Relative URL → Absolute URL

Web pages frequently contain relative links.

For example:

```text
/products
```

instead of:

```text
https://example.com/products
```

The crawler needs to convert relative URLs into absolute URLs using the page's base URL.

Conceptually:

```text
Current page:
https://example.com/shop/item

Relative link:
/products

        ↓

Absolute URL:
https://example.com/products
```

This happens as part of link extraction.

---

# 9. URL Filtering

Not every discovered URL should enter the crawler.

The video explicitly mentions filtering things such as:

* Image files
* Video links
* Disallowed domains

So:

```text
Discovered URLs
       ↓
   URL Filter
       ↓
   Valid URLs
       ↓
 Prioritizer
```

This prevents the crawler from wasting resources on content that isn't part of its crawling objective.

---

# 10. Distributed Crawling Across Regions

At billion-page scale, crawling can be distributed geographically.

Example:

```text
                Global Frontier
                       |
          +------------+------------+
          |            |             |
          ↓            ↓             ↓
       Region A     Region B      Region C
       Crawler      Crawler       Crawler
```

Each crawler handles part of the overall frontier.

The video mentions placing crawlers **close to target servers geographically**.

This can help with network performance.

---

# 11. Distributed Politeness

Once multiple crawlers exist, politeness becomes harder.

Imagine:

```text
Crawler A ──→ example.com
Crawler B ──→ example.com
Crawler C ──→ example.com
```

Each crawler might individually obey its rate limit, but collectively they could still send too many requests to the same host.

Therefore, at distributed scale, **politeness has to be coordinated across crawler instances**, not just enforced independently by each worker.

The video identifies this as a significant scaling challenge.

---

# 12. DNS as a Performance Bottleneck

Before making an HTTP request, the crawler may need DNS resolution:

```text
example.com
     ↓
 DNS lookup
     ↓
IP address
     ↓
HTTP request
```

At huge scale, repeatedly performing DNS lookups becomes expensive.

Therefore, the video specifically mentions:

> **Aggressive DNS caching**

as a performance optimization.

Conceptually:

```text
Host
 ↓
DNS Cache
 ↓
Cached IP?
 ├── Yes → Use it
 └── No  → DNS lookup → Cache result
```

---

# 13. Checkpointing

A billion-page crawler will inevitably encounter failures.

For example:

```text
Crawler running
     ↓
500 million pages processed
     ↓
Process crashes
```

You don't want to restart from the beginning.

### Checkpointing

Periodically save the crawler's progress/state.

Then:

```text
Crash
 ↓
Restart
 ↓
Load checkpoint
 ↓
Continue from previous state
```

The video's key point:

> **Checkpointing allows the crawler to recover from crashes without starting over.**

---

# 14. Fault Tolerance Is a Core Requirement

At this scale:

> Something will always go wrong.

Potential failure categories mentioned or implied by the video include:

* Crawler crashes
* DNS performance problems
* Network failures
* Website rate limits
* Distributed coordination issues

Therefore, the crawler must be designed as a system that **expects failures**, rather than assuming everything will work.

---

# 15. Final Large-Scale Architecture

Putting the new concepts together:

```text
                    Seed URLs
                       |
                       ↓
                +-------------+
                |   Frontier  |
                +-------------+
                       |
                       ↓
              Priority Scheduler
                       |
                       ↓
              Host-based Queues
                       |
             +---------+---------+
             |         |         |
             ↓         ↓         ↓
          Queue A   Queue B   Queue C
             |         |         |
             ↓         ↓         ↓
          Workers   Workers   Workers
             |
             ↓
          Download
             |
             ↓
           Parser
             |
        +----+----+
        |         |
        ↓         ↓
     Content    Links
      Seen        |
        |         ↓
        |     URL Filter
        |         |
        |         ↓
        |    New URLs
        |         |
        +---------+
              |
              ↓
         Prioritizer
              |
              ↓
           Frontier
```

Alongside this system:

```text
Distributed Crawlers
        +
DNS Cache
        +
Checkpointing
        +
Distributed Politeness
```
