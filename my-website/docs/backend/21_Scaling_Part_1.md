---
slug: /backend/scaling-part-1
title: Backend Scaling & Performance - Part 1
---

# Backend Scaling and Performance Engineering: Part 1

Scaling and performance are two of the most critical aspects of backend engineering. Understanding how to measure performance and how systems behave under load is essential for building robust infrastructure.

## 1. What is Performance?

When we say a system is "fast," we are usually talking about **latency**.

### Latency
- **Definition**: The total time it takes from a user action (like clicking a button) to the final result showing on their screen.
- **Variability**: Latency is not a single number. It varies based on network conditions, server load, and whether the data was served from a cache or a database.

### Measuring Latency: Why Averages Lie
Averages can be misleading because they hide outliers. If 99% of your users have a 50ms experience but 1% wait for 5 seconds, the average might look "okay," but 10,000 out of a million users are having a terrible experience.

Instead, we use **percentiles**:
- **P50 (Median)**: 50% of requests are faster than this number.
- **P90**: 10% of users experience this latency or worse.
- **P99**: Only 1% of users experience this latency. This "tail latency" is critical because it often represents your most complex logic and most valuable customers (e.g., checkout flows).

## 2. Throughput & Utilization

### Throughput
- **Definition**: The number of requests your system can handle in a given time period (e.g., Requests Per Second - RPS).
- **Throughput-Latency Relationship**: As throughput increases, latency remains stable until the system reaches a "knee" in the curve, after which latency increases exponentially.

### Utilization
- **Headroom**: You should never run your systems at 100% utilization. Most production systems aim for **60-80% utilization**, leaving a buffer (headroom) to absorb traffic bursts.
- **Queueing Theory**: When utilization is high, requests wait in a queue for their turn. Even if the processing time is the same, the *wait time* increases perceived latency.

## 3. Identifying Bottlenecks: Don't Guess, Measure

A **bottleneck** is the specific part of your system causing slowness. 

- **Always Measure**: Don't jump to solutions like "adding a cache" or "upgrading the server" until you have data.
- **Profiling**: Use CPU profilers and flame graphs to see where your code spends its time.
- **Distributed Tracing**: Essential for IO-bound applications. It tracks a request as it travels through different services, databases, and APIs to pinpoint exactly where the delay occurs.

## 4. Database Optimization

Databases are the most common bottleneck in backend systems.

### The N+1 Query Problem
Fetching a list of items and then running a separate query for each item's details (e.g., fetching 20 posts and then 20 separate queries for their authors).
- **The Fix**: Use **Joins** or **Bulk Fetching**. Fetch all required data in 1 or 2 queries instead of $N+1$.

### Database Indexes
An index is a sorted data structure (usually a B-Tree) that allows the database to find rows without scanning the entire table.
- **Full Table Scan**: Scanning every row (slow).
- **Index Scan**: Finding the location directly (fast).
- **Cost**: Indexes aren't free; they take up disk space and slow down write operations (INSERT/UPDATE/DELETE).

### Connection Pooling
Opening and closing a database connection for every request is expensive (TCP handshakes, auth, memory allocation).
- **The Fix**: Use a **Connection Pool** (like PG Bouncer for Postgres) that keeps a set of open connections ready to be reused.

## 5. Caching Strategies

Caching stores the results of expensive operations in fast, in-memory storage like **Redis**.

### Invalidation: The Hardest Problem
- **Time-Based (TTL)**: Automatic expiration after a fixed time.
- **Event-Based**: Explicitly deleting the cache when the underlying data is updated.

### Caching Patterns
- **Cache Aside (Lazy Loading)**: Check cache; if miss, fetch from DB and update cache.
- **Write Through**: Update both DB and cache simultaneously.
- **Write Behind**: Update cache first, then asynchronously update the DB.

## 6. Scaling Strategies: Vertical vs. Horizontal

### Vertical Scaling (Scale Up)
Adding more "muscle" to a single server (more CPU, RAM, or SSD).
- **Pros**: Simple, no code changes required.
- **Cons**: Hard hardware limits, single point of failure (SPOF), and no geographic distribution.

### Horizontal Scaling (Scale Out)
Adding more servers (instances) to your stack.
- **Pros**: Theoretically infinite scale, redundancy, and geographic distribution.
- **Cons**: Increased complexity. You need **Load Balancers**, service discovery, and must handle distributed state (statelessness).

---
*In Part 2, we will dive deeper into Load Balancers, Database Sharding, and Advanced Architectural Patterns.*
