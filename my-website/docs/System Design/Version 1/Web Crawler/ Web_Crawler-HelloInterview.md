# Web Crawler — System Design Notes

<img width="1321" height="591" alt="image" src="https://github.com/user-attachments/assets/ec9d6ccd-7d8f-439c-b4f3-4ae147e1d647" />


## 1. Problem Definition

### What is a Web Crawler?

A program that:

1. Downloads web pages.
2. Extracts links from those pages.
3. Recursively follows those links.
4. Stores useful information from the pages.

Common uses:

* Search engine indexing
* Research/data collection
* Website monitoring
* Training ML/LLM models 

### Interview Problem

**Design a Web Crawler that:**

* Starts from a set of **seed URLs**
* Crawls the web
* Extracts **text data**
* Stores the text
* Data will eventually be used to train an LLM
* Must finish crawling within **5 days**

Important: The crawler stops after storing the text; model training/tokenization is outside the system. 

---

# 2. Requirements

## Functional Requirements

The system should:

1. Crawl the web starting from seed URLs.
2. Download web pages.
3. Extract text from HTML.
4. Store extracted text.
5. Extract URLs from pages.
6. Continue crawling recursively until there are no more URLs. 

### Scale

Assume:

* **10 billion web pages**
* Average page size: **2 MB**
* Crawling deadline: **5 days**
* Resources: reasonably unlimited 

---

# 3. Non-Functional Requirements

### 1. Fault Tolerance

System should:

* Handle failures gracefully.
* Resume crawling after failures.
* Avoid losing large amounts of progress.

### 2. Politeness

Don't overload websites.

Must:

* Respect `robots.txt`
* Respect crawl delays
* Rate-limit requests per domain.

### 3. Scalability

Must scale to approximately **10 billion pages**.

### 4. Efficiency

Must complete the crawl within **5 days**. 

---

# 4. Core Entities

Think of these as the important data models/tables.

### URL Metadata

Potential fields:

```text
URL
Last crawled time
HTML location
Content hash
Depth
Status
```

### Domain Metadata

```text
Domain
Last crawled time
robots.txt rules
User-Agent
Disallowed paths
Crawl delay
```

### Text Data

The final extracted text stored in blob/object storage. 

---

# 5. Interface

### Input

```text
Set of seed URLs
URL metadata
```

### Output

```text
Extracted text data
```

The interface establishes the boundary of the system. 

---

# 6. Basic Data Flow

This is the most important flow to understand before drawing the architecture.

```text
Seed URLs
    ↓
Frontier
    ↓
DNS lookup
    ↓
Fetch HTML
    ↓
Extract text
    ↓
Store text
    ↓
Extract URLs
    ↓
Add URLs back to Frontier
    ↓
Repeat
```

### Frontier

**Frontier = set/queue of URLs that still need to be crawled.**

Initially:

```text
Frontier = Seed URLs
```

Continue until:

```text
Frontier = Empty
```



---

# 7. Initial High-Level Design

A simple first version:

```text
              ┌─────────────┐
              │ Frontier Q  │
              └──────┬──────┘
                     │ URL
                     ↓
              ┌─────────────┐
              │   Crawler   │
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
        DNS                 Web Server
                                │
                                ↓
                          HTML / Text
                                │
                                ↓
                              S3
                                │
                                │ extracted URLs
                                ↓
                         Frontier Q
```

Crawler initially performs:

* Pull URL
* Fetch page
* Extract text
* Extract URLs
* Store text
* Put new URLs back into queue. 

**But:** this is only the functional design.

The rest of the interview is about evolving this design to satisfy the NFRs.

---

# 8. Fault Tolerance

## Problem with One Big Crawler Worker

If one worker performs:

```text
Fetch
 ↓
Parse
 ↓
Extract text
 ↓
Extract URLs
 ↓
Store
```

then one failure can disrupt multiple stages.

Other problems:

* Poor separation of responsibility
* Difficult independent scaling
* Poor observability
* Changing requirements become expensive. 

---

# 9. Split the Pipeline

Separate the crawler into stages.

### Stage 1 — Fetch

```text
Frontier Queue
      ↓
Crawler
      ↓
Fetch HTML
      ↓
S3
```

Store **raw HTML** in S3.

### Stage 2 — Parse

```text
Parsing Queue
      ↓
Parsing Worker
      ↓
Fetch HTML from S3
      ↓
Extract text
      ↓
Store text
      ↓
Extract URLs
      ↓
Frontier Queue
```

This gives us:

```text
             Stage 1
Frontier → Crawler → S3 HTML
                       ↓
                  Parsing Queue
                       ↓
                    Parser
                    ↙    ↘
              Text S3    URLs
                           ↓
                       Frontier
```



### Why store HTML in S3?

If parsing fails, we can retry parsing without downloading the website again.

This is especially useful when:

* Websites are slow
* Websites go down
* Requests fail
* Parsing logic changes.

For example, if ML team later asks for OCR/alt text, we can reprocess existing HTML instead of crawling the internet again. 

---

# 10. Queue Should Contain Pointers, Not Huge Data

Don't put entire HTML documents into the queue.

Instead:

```json
{
  "url": "...",
  "s3_url": "..."
}
```

Why?

* Queue messages have size limits.
* Average page is ~2 MB.
* Blob storage is designed for large objects.
* Queues should contain lightweight messages/pointers.

Pattern:

```text
Queue → pointer → S3
```

rather than:

```text
Queue → huge HTML
```



---

# 11. Retry Strategy

## Bad Approach

Don't do:

```text
Request fails
    ↓
wait 5 sec in memory
    ↓
retry
```

Problems:

* Worker can crash → timer disappears.
* Website may not recover after exactly 5 seconds.

## Better: Exponential Backoff

Example:

```text
Retry 1 → 30 sec
Retry 2 → 2 min
Retry 3 → 5 min
Retry 4 → 15 min
...
```



---

# 12. SQS Retry + Dead Letter Queue

The design uses **Amazon SQS**.

SQS supports:

* Visibility timeout
* Retries
* Exponential backoff configuration
* Dead-letter queues.

### Visibility Timeout

When worker receives a message:

```text
Message
   ↓
Worker receives it
   ↓
Message becomes invisible
   ↓
Worker processes it
```

If worker fails:

```text
Visibility timeout expires
        ↓
Message becomes visible
        ↓
Another worker retries
```

If successful:

```text
Worker
  ↓
Delete message from SQS
```



### Dead Letter Queue

Don't retry forever.

Example:

```text
Attempt 1
Attempt 2
Attempt 3
Attempt 4
Attempt 5
   ↓
DLQ
```

The `approximate receive count` can be configured to move failed messages to a **Dead Letter Queue** after the maximum attempts. 

---

# 13. What if a Crawler Worker Dies?

Important interview concept:

**The URL should not disappear from the queue until successful processing is confirmed.**

With SQS:

```text
Queue
  ↓
Crawler receives URL
  ↓
Visibility timeout
  ↓
Crawler crashes
  ↓
Timeout expires
  ↓
URL becomes visible
  ↓
Another crawler processes it
```

If crawler successfully stores HTML:

```text
Crawler → S3
       ↓
Delete message from SQS
```



---

# 14. Politeness — robots.txt

Websites can specify crawling rules using:

```text
robots.txt
```

Example concepts:

```text
User-agent: *
Disallow: /private
Crawl-delay: 10
```

Meaning:

* Rules apply to all crawlers.
* `/private` shouldn't be crawled.
* Wait 10 seconds between requests to that domain. 

---

# 15. Domain Metadata

Create a domain-level metadata table:

```text
Domain
Last crawled time
User-agent
Disallowed paths
Crawl delay
```

When encountering a domain for the first time:

```text
Crawler
   ↓
Fetch robots.txt
   ↓
Store domain rules
```

For future URLs:

```text
URL
 ↓
Check domain rules
 ↓
Is path allowed?
 ↓
Check crawl delay
 ↓
Allowed → crawl
Not allowed → remove/skip
```



---

# 16. Rate Limiting

Even if `robots.txt` doesn't specify a crawl delay, don't aggressively hit one domain.

The video suggests roughly:

**≤ 1 request/second/domain**

Use a rate limiter such as:

```text
Redis
```

Possible algorithm:

```text
Sliding Window
```

Example:

```text
Domain A
Requests in last 1 sec = 1
Limit = 1

→ Don't send another request yet
```



---

# 17. Jitter

Problem:

Suppose 10 crawlers all hit the same domain and all get rate-limited.

Without jitter:

```text
10 crawlers
     ↓
wait same duration
     ↓
all retry simultaneously
     ↓
rate limiter blocks 9
     ↓
repeat
```

### Solution

Add random **jitter** to retry timing.

```text
Crawler 1 → retry at 1.2 sec
Crawler 2 → retry at 1.7 sec
Crawler 3 → retry at 2.1 sec
...
```

This spreads requests over time. 

---

# 18. Smart URL Scheduler

Another problem:

A page may contain hundreds of URLs from the same domain.

So the queue could contain:

```text
Domain A
Domain A
Domain A
Domain A
Domain A
...
```

Workers repeatedly pick them up and hit the rate limiter.

### Better approach

Introduce:

```text
Smart URL Scheduler
```

Instead of immediately pushing every URL into the frontier:

```text
Parser
  ↓
URL Metadata DB
  ↓
Smart Scheduler
  ↓
Frontier Queue
```

Scheduler decides:

* Which URLs to crawl
* When to crawl
* Priority
* Domain distribution.

This is especially useful as a deeper interview discussion. 

---

# 19. Scalability

Requirement:

```text
10 billion pages
within 5 days
```

Scalability should generally be discussed **after the entire architecture is established**, because otherwise you may miss bottlenecks introduced later. 

---

# 20. Estimating Number of Crawlers

Given:

```text
Page size ≈ 2 MB
Network capacity ≈ 400 Gbps
```

Convert:

```text
400 Gbps / 8 = 50 GB/s
```

Then:

```text
50 GB/s / 2 MB
≈ 25,000 pages/sec
```

But this is unrealistic because actual crawling has:

* DNS latency
* Website response latency
* Rate limits
* Crawl delays
* Retries
* Network inefficiencies.

So assume only ~25–30% usable bandwidth.

Approximate:

```text
25,000 × 30%
≈ 7,500–10,000 pages/sec
```

For 10 billion pages:

```text
10^10 / 10^4
= 10^6 seconds
≈ 10 days
```

Therefore:

```text
1 machine ≈ 10 days
2 machines ≈ 5 days
```

Add safety margin:

**~4 crawler machines**. 

> Important interview point: These calculations are intentionally rough. In reality, benchmark a crawler and measure its actual throughput. 

---

# 21. Dynamic Scaling of Parsing Workers

The crawler is the bottleneck.

Parsing workers should therefore scale according to queue backlog.

```text
Parsing Queue
      ↓
Queue grows
      ↓
Increase parsing workers
```

Workers can be:

* EC2
* Lambda
* Containers
* Other scalable compute.



---

# 22. DNS Bottleneck

DNS can itself become a bottleneck.

Potential solutions:

### Solution 1 — DNS Caching

Use Redis:

```text
Domain
  ↓
Redis DNS cache
  ↓
Cached IP
```

Only query DNS when cache misses.

This reduces load on external DNS providers. 

### Solution 2 — Multiple DNS Providers

Instead of:

```text
Crawler → DNS Provider A
```

use:

```text
              ┌→ Provider A
Crawler → LB ─┼→ Provider B
              └→ Provider C
```

Round-robin requests between providers.

Benefits:

* Distribute load
* Avoid provider rate limits
* Improve resilience if one provider fails. 

---

# 23. Avoid Crawling the Same URL Twice

When extracting links:

```text
Page A
 ↓
URL1
URL2
URL3
...
```

Many URLs will already exist.

So maintain URL metadata:

```text
URL → metadata
```

Make the URL the **primary key**.

Before adding a URL:

```text
Does URL exist?
    ↓
 YES → Don't add
 NO  → Add
```

At 10 billion URLs, the database should be **sharded**, potentially by URL/primary key. 

---

# 24. Avoid Parsing Duplicate Content

Different URLs can contain exactly the same content.

Example:

```text
example.com/page
another.com/page
```

could have identical HTML.

### Solution: Content Hash

After fetching HTML:

```text
HTML
 ↓
Hash
 ↓
Check hash
```

Store:

```text
URL Metadata

URL
HTML location
Content hash
```

If hash already exists:

```text
Duplicate content
     ↓
Don't parse again
```



---

# 25. How to Check Content Hash Efficiently?

### Option 1 — Global Secondary Index

If using DynamoDB:

```text
Hash → URL
```

with a GSI.

Lookup:

```text
O(log n)
```

Conceptually.

### Option 2 — Redis Set

Maintain:

```text
Redis Set<Hash>
```

Lookup:

```text
O(1)
```

Very fast, but:

* Additional infrastructure
* Memory requirements
* Need to consider Redis failures/persistence. 

---

# 26. Bloom Filter

A Bloom filter is a:

> Space-efficient probabilistic data structure for set membership.

It answers:

```text
Possibly in set
OR
Definitely not in set
```

### Important property

Bloom filter can have:

**False positives**

but not false negatives.

So:

```text
"Already parsed"
```

could incorrectly be returned even when it wasn't.

That means some content could be skipped.

Therefore, use Bloom filters only when the space/accuracy trade-off makes sense. 

### Interview lesson

Don't say:

> "I'll use Bloom filter."

immediately.

First establish:

* Memory constraints
* Accuracy requirements
* Scale
* Cost.

Then choose the data structure. 

---

# 27. Crawler Traps

A **crawler trap** is a set of pages that causes a crawler to continue indefinitely without obtaining useful information.

Example:

```text
Page A
 ↓
Page B
 ↓
Page C
 ↓
Page D
 ↓
...
```

Potentially hundreds of thousands of pages on one domain.

### Solution: Maximum Crawl Depth

Add:

```text
depth
```

to URL metadata.

Example:

```text
Seed URL → depth 0
Link → depth 1
Link → depth 2
...
```

Set:

```text
MAX_DEPTH = 20
```

If:

```text
depth > MAX_DEPTH
```

don't enqueue the URL. 

---

# 28. Final Architecture

A good final design looks conceptually like:

```text
                    ┌───────────────┐
                    │ Frontier SQS  │
                    └───────┬───────┘
                            │
                            ↓
                    ┌───────────────┐
                    │   Crawlers    │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ↓                     ↓
              DNS Cache            Web Servers
                 │                     │
                 └──────────┬──────────┘
                            ↓
                         Raw HTML
                            ↓
                           S3
                            ↓
                    Parsing Queue
                            ↓
                    ┌───────────────┐
                    │ Parse Workers │
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
             Text S3                URLs
                                        ↓
                                 URL Metadata DB
                                        ↓
                                 Frontier Queue
```

Additional components:

```text
Redis
 ├── Rate Limiting
 ├── DNS Cache
 └── Optional Content Hash Set

Domain Metadata DB
 └── robots.txt / crawl delay

DLQ
 └── Permanently failed URLs
```

---

# 29. Additional Deep Dives

<img width="536" height="127" alt="image" src="https://github.com/user-attachments/assets/c56d6814-69cd-4a47-ac1a-50857bcdd46a" />

## Dynamic Content

Modern websites often load content using:

* JavaScript
* React
* Angular
* etc.

Raw HTML may not contain the actual content.

Solution:

```text
Headless Browser
    ↓
Render JavaScript
    ↓
Extract content
```

Examples mentioned:

* Puppeteer

Trade-offs:

* Much slower
* More expensive
* More error-prone. 

---

## System Monitoring

Monitor:

* URLs in each pipeline stage
* Queue sizes
* Error rates
* Crawler health
* Parser health
* Retry counts
* DLQ size

Possible monitoring tools mentioned:

```text
Datadog
New Relic
```



---

## Large Web Pages

Some pages/files may be extremely large.

Possible solution:

Use:

```text
Content-Length
```

header to detect large responses and skip them if necessary. 

---

# 30. Continual Crawling / Updates

If the crawler needs to run continuously:

```text
Smart URL Scheduler
        ↓
URL Metadata DB
        ↓
Check last crawled time
        ↓
Due for recrawl?
        ↓
Frontier Queue
```

For example:

```text
last_crawled = 3 days ago
recrawl_interval = 1 day

→ enqueue URL
```

This is preferable to blindly putting URLs back into the queue. 

---

# ⭐ Interview Cheat Sheet

If asked **"Design a Web Crawler"**, remember this progression:

```text
1. Requirements
       ↓
2. Core entities
       ↓
3. Interface
       ↓
4. Data flow
       ↓
5. Simple architecture
       ↓
6. Fault tolerance
       ↓
7. Politeness
       ↓
8. Scalability
       ↓
9. Efficiency
       ↓
10. Deep dives
```

### Core architecture

```text
Frontier Queue
      ↓
Crawler
      ↓
Fetch HTML
      ↓
S3
      ↓
Parsing Queue
      ↓
Parser
   ↙      ↘
Text      URLs
 ↓          ↓
S3      Frontier
```

### Key concepts to mention

**Fault tolerance**

* SQS
* Visibility timeout
* Exponential backoff
* DLQ
* Retry limits

**Politeness**

* `robots.txt`
* Crawl delay
* Per-domain rate limiting
* Jitter

**Scalability**

* Multiple crawlers
* Dynamic parser scaling
* Sharding

**Efficiency**

* URL deduplication
* Content-hash deduplication
* DNS caching
* Multiple DNS providers
* Crawler-trap detection
* Maximum depth

**Advanced**

* Smart URL scheduler
* Bloom filter trade-offs
* Headless browser
* Monitoring
* Continuous recrawling

