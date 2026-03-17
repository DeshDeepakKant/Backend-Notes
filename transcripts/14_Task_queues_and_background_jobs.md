# Background Jobs / Background Tasks in Backend

## What is a Background Task

* A **background task** is:

  * Any code that runs **outside the request-response lifecycle**.
* It is:

  * **Asynchronous**
  * **Non-blocking**
  * **Non-critical to immediate response**

### Key Idea

* Does **not need to complete before sending response to client**.
* Can be executed **later in a separate process**.

---

# Why Background Tasks are Important

* Improve:

  * Backend responsiveness
  * User experience
  * System scalability

* Prevent:

  * API delays
  * Timeouts
  * Failures due to external dependencies

---

# Example: User Signup with Email

## Without Background Task (Synchronous)

### Flow

1. User signs up
2. Backend processes request
3. Backend calls email service
4. Email service:

   * May be slow or down

### Problems

* API may fail entirely
* User sees:

  * "Signup failed"
  * Or false success ("email sent" when not sent)

---

## With Background Task (Asynchronous)

### Flow

1. User signs up
2. Backend:

   * Validates input
   * Stores user
   * Creates email task
   * Pushes task to queue
3. Backend immediately responds:

   ```text
   Signup successful
   ```
4. Worker:

   * Picks task
   * Sends email

### Benefits

* Fast API response
* Reliable execution
* Better UX

---

# Core Architecture

## Components

### 1. Producer

* Your backend application
* Creates task
* Pushes to queue

### 2. Queue (Broker)

* Temporary storage of tasks
* Examples:

  * Redis (Pub/Sub)
  * RabbitMQ
  * AWS SQS

### 3. Consumer / Worker

* Separate process
* Picks tasks from queue
* Executes them

---

# Task Flow

## Step-by-Step

1. Producer:

   * Collects data (Creats a task)
   * Serializes (usually JSON)
   * Enqueues task

2. Queue:

   * Stores task
   * Waits for worker

3. Consumer:>>

   * Dequeues task
   * Deserializes data
   * Executes logic

4. Completion:

   * Sends acknowledgement to queue
  
   If the API fails, like in the previous example, the task ia again injected into the queue.
   This is called **Exponential Backoff**. - Retrying Mechanism.

# Pro (Backend Tasks Processing)
 
   * Faster Processing time
   * Responsiveness of our Backend Application
   * Retry Mechanism of a task which is prone to failing

---

# Key Concepts

## Enqueue (ENQ)

* Adding task to queue


## Broker
* Takes care of coming and going tasks

## Dequeue (DEQ)

* Removing task from queue

## Serialization

* Convert task data → JSON

## Deserialization

* JSON → native object

# Example

* RabbitMq
* Redis - Pub/Sub
* SQS - Throughout the world (AWS)
  
---

# Retry Mechanism

## Why Needed

* External services may fail

## Example Strategy: Exponential Backoff

* Retry intervals:

  * 1 min → 2 min → 4 min → 8 min

### Benefits

* Handles temporary failures
* Improves reliability

---

# Visibility Timeout

* Time during which task is **in-progress**
* If worker:

  * Fails or crashes
  * Doesn’t acknowledge

Then:

* Task becomes **available again**
* Another worker processes it

---

# Types of Background Tasks

## 1. One-off Tasks

* Single execution
* Examples:

  * Send email
  * Send push notification
  * Reset password email
 
  * Backend does not send you notifications, it's the OS, which does that.

---

## 2. Recurring Tasks

* Run periodically


### Examples

* Daily/weekly reports
* Cleanup jobs:
  * Delete expired sessions (Authenticaton in case of Stateful Application)

---

## 3. Chain Tasks (Dependent Tasks)

* Tasks depend on previous tasks

### Example (Video Processing)

1. Encode video
2. Generate thumbnails
3. Process thumbnails
4. Generate subtitles

### Notes

* Some tasks:

  * Run sequentially (dependency)
* Some:

  * Run in parallel

---

## 4. Batch Tasks

* One task triggers multiple tasks

### Example: Delete Account

* Delete:

  * User data
  * Projects
  * Files
  * Assets

* Executed as:

  * Multiple background operations

---

# Real Use Cases

## Common Tasks

* Sending emails
* Image/video processing
* Report generation
* Push notifications
* Account deletion workflows

---

# Design Considerations

## 1. Idempotency

* Task should be safe to run multiple times

### Example

* If retry happens:

  * No duplicate effects

---

## 2. Error Handling

* Must:

  * Catch failures
  * Log errors
  * Trigger retries

---

## 3. Monitoring

* Track:

  * Queue size
  * Failed tasks
  * Success rate

### Tools

* Prometheus
* Grafana

---

## 4. Scalability

* Add more workers when load increases

---

## 5. Ordering

* Some tasks must execute in order

---

## 6. Rate Limiting

* Prevent overload on:

  * External APIs
  * Third-party services

---

# Best Practices

## Keep Tasks Small and focused

* Each task:

  * One responsibility

---

## Avoid Long Running Tasks

* Break into:

  * Smaller sub-tasks
  * Chain tasks

---

## Strong Logging

* Helps:

  * Debugging
  * Monitoring
  * Failure tracking

---

## Monitor System Health

* Watch:

  * Queue length
  * Worker status
  * Failures

---

# Summary

## Why Use Background Tasks

* Offload:

  * Heavy work
  * Non-critical work

## Benefits

* Faster APIs
* Better UX
* Retry support
* Scalability

---

## Final Insight

* Background jobs are essential for:

```text
Scalable + Reliable + Responsive Backend Systems
```
