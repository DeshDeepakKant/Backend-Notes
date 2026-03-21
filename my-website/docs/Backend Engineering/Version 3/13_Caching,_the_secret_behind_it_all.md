# Caching in Backend Systems

## What is Caching

* **Simple definition**:

  * Caching is a mechanism to **reduce time and effort** required to perform a task.

* **Technical definition**:

  * Storing a **subset of frequently used data** in a **faster-access location** to improve performance.

* Key idea:

  * Do **less computation** and **faster data retrieval**.

---

## Why Caching is Important

* Reduces:

  * Latency (response time)
  * Server load
  * Computational cost

* Used in:

  * High-performance systems (microseconds/milliseconds latency)

---

# Real-World Examples of Caching

## Google Search

* Problem:

  * Query processing involves:

    * Crawling
    * Indexing
    * Ranking billions of pages
  * Very **computationally expensive**

* Solution:

  * Cache results of frequent queries (e.g., “weather today”)

### Workflow

* User searches query
* System checks cache:

  * If found → **Cache Hit** → return instantly
  * If not → **Cache Miss**:

    * Compute result
    * Store in cache
    * Return result

---

## Netflix (CDN-Based Caching)

* Problem:

  * Deliver large video files globally with low latency

* Solution:

  * Use **CDN (Content Delivery Network)**

### How CDN Works

* Data stored at:

  * Origin servers (e.g., US)
  * Edge servers (global locations)

* Users get data from:

  * **Nearest edge server**

### Key Points

* Only a **subset of content is cached**
* Based on:

  * User behavior
  * Region popularity

---

## Social Media (e.g., Trending Topics)

* Problem:

  * Computing trends requires:

    * Processing millions of posts
    * Heavy computation

* Solution:

  * Cache computed trends

### Behavior

* Trends updated periodically (not real-time)
* Cached in systems like Redis
* Users get instant response

---

# When to Use Caching

Caching is useful when:

* Heavy computation exists
* Large data transfer is required
* Data is:

  * Frequently read
  * Rarely updated

---

# Types of Caching (High-Level)

## 1. Network-Level Caching

### CDN (Content Delivery Network)

* Stores data near users geographically
* Reduces latency

### Workflow

* User → DNS → nearest edge server(POP - Point of presence)
* Edge server:

  * Cache hit → return data
  * Cache miss → fetch from origin → store → return

### TTL (Time To Live)

* Defines how long data stays in cache

---

## DNS Caching

* DNS resolves:

  * Domain → IP address

### Cache Layers

* OS cache
* Browser cache
* Recursive resolver cache - provided by ISP/3rd Party (Google/Cloudflare)
* Authoritative server cache
  
DNS Query -> 1.Local Cache (OS/Browser) -> 2.Recursive Resolver -> 3. Root Servers(13/14) (have domains of [TLD] Top Level Domain Server [.com/.co/.in)) -> Authoritative Main Server

### Benefit

* Avoid repeated DNS lookups

---

## 2. Hardware-Level Caching

* Cache layers:

  * L1, L2, L3 cache
  * RAM
  * Disk
 
  * Redis
  * Memcached
  * Store dtabases InMemory (Random Access Memory) -> Finds Data through capacitors (electrical signals)

### Key Idea

* Frequently used data stored closer to CPU

### RAM vs Disk

| Feature     | RAM      | Disk       |
| ----------- | -------- | ---------- |
| Speed       | Fast     | Slow       |
| Persistence | Volatile | Persistent |
| Capacity    | Limited  | Large      |

---

## 3. Software-Level Caching (Backend)

* Tools:

  * Redis
  * Memcached
  * AWS ElastiCache

### Characteristics

* In-memory (stored in RAM)
* Key-value based 
* No strict schema (NoSQL)

---

# Why In-Memory Cache is Fast

* RAM uses:

  * Direct electrical access
* Disk uses:

  * Mechanical or slower access

Result:

```text
Cache (RAM) >> Database (Disk)
```

---

# Caching Strategies

## 1. Cache Aside (Lazy Caching)

### Flow

1. Check cache
2. If miss: (Synchrounously)
   * Fetch from DB
   * Store in cache
3. Return result

### Key Idea

* Cache only when needed

---

## 2. Write-Through Caching

### Flow

* On update: (Asynchrously)

  * Update DB
  * Update cache simultaneously

### Pros

* Cache always fresh

### Cons

* Extra write overhead

---

# Cache Eviction Policies

When cache is full → remove data.

## 1. No Eviction

* Error when memory full

---

## 2. LRU (Least Recently Used)

* Remove data not used recently

Example:

* Oldest accessed → removed

---

## 3. LFU (Least Frequently Used)

* Remove least accessed data

Example:

* Lowest usage count → removed

---

## 4. TTL-Based Eviction

* Remove expired data automatically

---

# Use Cases of Caching in Backend

## 1. Database Query Caching

* Cache results of:

  * Complex queries
  * Frequently accessed data

### Example

* Dashboard queries
* Aggregations

---

## 2. E-commerce (e.g., Amazon)

* Cache:

  * Product details
  * Prices
  * Inventory

Reason:

* Data changes rarely
* High read traffic

---

## 3. Social Media

* Cache:

  * User profiles
  * Posts

Reason:

* Read-heavy system

---

## 4. Session Storage

* Store:

  * Session tokens

Why:

* Faster authentication checks
* Avoid DB calls

---

## 5. API Caching

* Cache external API responses

### Example

* Weather API

### Benefit

* Avoid:

  * Rate limits
  * Extra cost

---

## 6. Rate Limiting

* Use cache to track:

  * Request count per user/IP

### Flow

* Key: IP address
* Value: request count

If limit exceeded:

```text
HTTP 429 → Too Many Requests
```
This uses InMemory Storage like Redis, instead of Traditional Database bcs realtional database are slow in extracting data, and 20- 30 ms is wnough to affect latency.

---

# Key Concepts Summary

## Cache Hit vs Cache Miss

* Cache Hit:

  * Data found → fast response

* Cache Miss:

  * Fetch from source → store → return

---

## Core Idea of Caching

* Store **frequently used data**
* In a **faster storage layer**
* To:

  * Reduce computation
  * Improve performance

---

# Backend Engineer Takeaways

* Use caching when:

  * Read-heavy workloads
  * Expensive queries
  * External APIs
  * High latency operations

* Choose wisely:

  * What to cache
  * When to invalidate
  * Eviction policy

---

# Final Insight

* Caching is one of the **most impactful performance optimizations**.
* Often the difference between:

```text
Slow system vs Scalable system
```
