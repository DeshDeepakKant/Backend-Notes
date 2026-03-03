---
slug: /backend/scaling-part-2
title: Backend Scaling & Performance - Part 2
---

# Backend Scaling and Performance Engineering: Part 2

While Part 1 covered the basics of performance metrics and fundamental optimization, Part 2 dives into the architectural shifts required to scale a backend horizontally.

## 1. The Core Principle: Statelessness

The key enabler of horizontal scaling is **statelessness**. For horizontal scaling to work, any instance of your server should be able to handle any request with the same result.

### What is a "State"?
A server is **stateful** if it stores information exclusive to itself (e.g., in-memory variables, local session storage, or files on its own disk).

### How to Achieve Statelessness
To scale horizontally, you must "externalize" your state:
- **Sessions**: Instead of storing session data in server memory, store it in a centralized, fast in-memory database like **Redis**.
- **File Storage**: Instead of saving user uploads to a local disk, use **Object Storage** (e.g., AWS S3, Cloudflare R2).
- **Databases**: Use centralized database instances (e.g., Postgres, RDS) rather than local file-based databases like SQLite.

## 2. Load Balancers: The Gatekeepers

A **Load Balancer (LB)** sits between the internet and your server instances. It takes incoming requests and decides which instance should handle them.

### Load Balancing Algorithms
1. **Round Robin**: Requests are sent to servers in a rotating order (A -> B -> C -> A...). 
   - *Best for*: Servers of equal capacity and requests of similar complexity.
2. **Weighted Round Robin**: Sends more requests to more powerful servers (e.g., 2x to Server A if it has 2x the RAM).
3. **Least Connections**: Sends requests to the server with the fewest active HTTP/TCP connections. 
   - *Best for*: Handling "expensive" requests that take a long time to process.
4. **Weighted Least Connections**: Combines server capacity with active connection counts.

### Health Checks
To prevent sending users to a "dead" server, the Load Balancer performs **Health Checks**. It periodically sends a test request (e.g., `GET /health`) to each instance. If an instance fails, it is blacklisted until it responds successfully again.

## 3. Database Scaling at Scale

Scaling the database is harder than scaling the application because databases must maintain data consistency.

### Read Replicas
- **Primary (Master)**: Handles all write operations (INSERT, UPDATE, DELETE).
- **Secondary (Slaves/Replicas)**: Handle read operations (SELECT).
- **Replication Lag**: There is a physical delay (based on the speed of light and network hops) before data written to the primary reaches the replicas. This can lead to "stale" reads if a user fetches data immediately after updating it.

### Database Sharding (Partitioning)
Dividing a massive table into smaller, physical chunks (shards) across different database instances.
- **Example**: Dividing an `Orders` table by month (Jan-Jun in Shard 1, Jul-Dec in Shard 2).
- **Benefit**: Reduces individual machine load and query latency (scanning 5 million rows instead of 10 billion).

## 4. Global Performance: CDNs & Edge Computing

### Content Delivery Networks (CDNs)
CDNs place servers (Edge Nodes or Points of Presence) geographically close to your users. 
- **Physics Cap**: Even at the speed of light, a request from Tokyo to a US server takes ~100ms. A CDN reduces this to ~2ms.
- **Static Content**: Images, CSS, JS, and videos are ideal for CDN caching.

### Edge Computing
Modern CDNs (like Cloudflare Workers) allow you to run code at the edge.
- **Use Cases**: Authentication checks, A/B testing, and localized content delivery.
- **Constraints**: Edge environments have limited CPU, RAM, and runtime features (e.g., no filesystem access) compared to primary servers.

## 5. Asynchronous Processing

To reduce **perceived latency**, offload heavy tasks to the background.

### Message Queues & Workers
Instead of making a user wait for an email to be sent or a video to be processed, the server:
1. Pushes a **task/job** to a **queue** (e.g., RabbitMQ, Redis).
2. Sends a successful response to the user immediately.
3. A **worker process** picks up the task and executes it in the background.

## 6. Microservices vs. Monoliths

### Monolith
A single codebase and deployment unit. Simple to build, test, and deploy.
### Microservices
Dividing the application into independent services (Payments, Notifications, etc.).
- **Why?**: To scale large teams (human organization) and scale specific components independently.
- **Trade-off**: Increases network complexity, debugging difficulty, and data consistency issues.

## 7. Serverless Computing

Serverless (e.g., AWS Lambda, Cloudflare Workers) allows you to run code without managing servers.
- **Pay-as-you-go**: You only pay for the milliseconds your code is executing.
- **Cold Starts**: The delay when a provider has to spin up a new instance for a request.
- **Best For**: Event-driven tasks (image resizing, webhooks) and bursty traffic.

---
*Scaling is about trade-offs. No single architecture fits every problem. Start simple (Monolith + Vertical Scaling) and add complexity (Horizontal Scaling, Caching, Sharding) only as your needs evolve.*
