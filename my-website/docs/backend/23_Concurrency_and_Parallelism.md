---
slug: /backend/concurrency-and-parallelism
title: Concurrency & Parallelism for Backend Engineers
---

# Concurrency & Parallelism: IO-Bound vs. CPU-Bound

Every backend system faces a core requirement: the ability to handle multiple tasks simultaneously. Without this, a server would be limited to processing one request at a time, leading to significant delays or errors for all other users.

## 1. The Core Problem: Idle Resources

In a typical API call, the server spends a vast majority of its time waiting for external resources (Database queries, external API calls, file system operations). 

- **Example**: If a server waits 100ms for a database response, it could have executed roughly **300 million instructions** during that time.
- **Result**: In synchronous systems, the CPU remains idle 95-99% of the time.

## 2. Concurrency vs. Parallelism

While often used interchangeably, they represent different approaches to performance.

### Concurrency (Dealing with multiple things)
The ability to manage multiple tasks by starting, pausing, and resuming them. Concurrency can be achieved on a **single CPU core** by switching between tasks during idle periods (IO waits).
- **Focus**: Structure and management of tasks.

### Parallelism (Doing multiple things)
The ability to execute multiple instructions at exactly the same moment. This requires **hardware support** (multiple CPU cores).
- **Focus**: Performance and execution speed.

## 3. Workload Types: IO-Bound vs. CPU-Bound

Understanding the nature of your workload is critical for choosing the right concurrency model.

| Feature | IO-Bound | CPU-Bound |
| :--- | :--- | :--- |
| **Characteristic** | High time spent waiting for external resources. | High time spent crunching numbers/data. |
| **Examples** | Database queries, API calls, Logging, Disk I/O. | Image processing, Encryption, Validations, Video encoding. |
| **Solution** | **Concurrency** (Event Loops/Virtual Threads). | **Parallelism** (Multithreading/Multi-core). |

## 4. Concurrency Mechanisms

### OS Threads
Managed directly by the Operating System.
- **Overhead**: High memory usage (stack size ~8MB), context switching costs (saving registers, bookkeeping), and creation latency.
- **Scheduling**: Preemptive (OS pauses threads whenever it decides).

### Event Loops (e.g., Node.js, Python Asyncio)
Uses a single thread to monitor multiple connections using OS primitives like `epoll` (Linux) or `kqueue` (macOS).
- **Benefit**: Extremely efficient for IO-bound tasks; no thread context switching.
- **Rule**: **Never block the event loop.** Any CPU-heavy task will freeze the entire server.

### Virtual Threads (e.g., Go Routines)
A hybrid model where thousands of "virtual threads" are mapped to a small number of actual OS threads (M:N scheduling).
- **Benefit**: Lightweight (2KB stack vs 8MB), allowing millions of concurrent routines for IO-bound work without the overhead of native threads.

## 5. Async/Await: Under the Hood

Modern `async/await` syntax is often syntactic sugar for **State Machines**.
- Each `await` point marks a transition in the state machine.
- When `await` is called, the function pauses, returns control to the runner (event loop/scheduler), and waits for the IO to complete before jumping to the next state.

## 6. The Danger: Shared State & Race Conditions

Concurrency introduces complexity when multiple tasks access the same memory.

### The Race Condition
When the outcome of a program depends on the timing or sequence of non-atomic operations.
- **Lost Update**: Two threads read `Value: 0`, both increment it to `1`, and both write `1` back. The final value is `1` instead of `2`.

### Solutions
- **Locks/Mutexes**: Ensuring only one thread can access a "critical section" at a time.
- **Channels (Go)**: "Do not communicate by sharing memory; instead, share memory by communicating."
- **Statelessness**: Avoiding shared state entirely whenever possible.

---
*Concurrency is about making your program productive during unavoidable waits. Parallelism is about making your program faster through raw hardware power. Master both to build truly scalable systems.*
