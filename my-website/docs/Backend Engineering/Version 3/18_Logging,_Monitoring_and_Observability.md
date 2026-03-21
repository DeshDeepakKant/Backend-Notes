# Logging, Monitoring, and Observability

## Overview

* Logging, monitoring, and observability are **practices**, not strict rules.
* These practices exist on a **spectrum** → no system is “perfectly implemented.”
* Widely used across companies, startups, and production systems.
* Closely tied to **code implementation** and **infrastructure setup**.
* Essential for modern **distributed systems** running across:

  * Multiple servers
  * Different regions
  * Global users

---

## Why We Need Them

* Modern applications are **distributed and complex**.
* Need visibility into:

  * Application behavior
  * Infrastructure state
  * Request lifecycle

### Key Goal

* **Track what is happening in the system** across:

  * Services
  * Servers
  * Databases
  * Requests

---

## Logging

### Definition

* Logging = **recording events** happening in the application.

### What to Log

* Important events:

  * User actions (e.g., login)
  * API requests
  * Database queries
  * Errors and failures
  * Security-related events

### Metadata in Logs

* Logs should include context:

  * User ID
  * Request ID
  * Timestamp
  * Function/method triggered
  * Latency

### Purpose

* Acts like a **journal/diary** of the application.
* Helps answer:

  * What happened?
  * When did it happen?
  * Why did it happen?

---

## Monitoring

### Definition

* Monitoring = **tracking system state over time**.

### What It Tracks

* System health and performance:

  * CPU usage
  * Memory usage
  * Requests per second
  * Database connections
  * Error rates

### Characteristics

* Provides **near real-time data** (usually ~10–15 sec delay).
* Aggregates data into **metrics**.

### Purpose

* Detect issues and patterns:

  * Performance degradation
  * Increased error rates
  * Resource bottlenecks

---

## Observability

### Definition

* Observability = ability to **infer internal system state from external outputs**.

### Three Pillars of Observability

1. **Logs**

   * Records of events

2. **Metrics**

   * Numerical data over time (e.g., error rate, throughput)

3. **Traces**

   * Tracks request flow across components

---

## Traces (Transactions)

* A trace represents a **full request journey**.
* Tracks:

  * Where request started (frontend, load balancer, backend)
  * Which components it passed through:

    * Handler layer
    * Service layer
    * Validation layer
    * Repository layer
    * Database

### Purpose

* Helps identify:

  * Where failure occurred
  * Latency bottlenecks
  * Component interactions

---

## Monitoring vs Observability

### Traditional Monitoring

* Detects **that something is wrong**
* Provides alerts (e.g., high error rate)
* Limited debugging capability

### Observability

* Detects **what is wrong and where**
* Uses logs + metrics + traces
* Enables **deep debugging**

---

## How They Work Together

### Workflow Example

1. **Alert Triggered**

   * Example: Error rate > 80%
   * Notification via Slack/webhook

2. **Check Metrics**

   * Error rate, throughput, response time

3. **Inspect Logs**

   * View failed requests
   * Identify error messages

4. **Analyze Traces**

   * Track request path
   * Identify exact failure point

### Key Mapping

* Logs → **What happened**
* Metrics → **Trends and patterns**
* Traces → **Component interactions**

---

## Metrics

### Definition

* Metrics = **quantitative data** about system behavior.

### Examples

* Number of requests processed
* Number of failed requests
* Error rate
* Throughput
* Response time
* Business metrics (e.g., todos created)

### Characteristics

* Can be:

  * Real-time
  * Historical
* Configurable based on system needs

---

## Logging Best Practices

### Log Levels

* **Debug**

  * Detailed logs for development
  * Disabled in production

* **Info**

  * General operations (e.g., successful actions)

* **Warn**

  * Non-critical issues (e.g., wrong password)

* **Error**

  * Failures (e.g., DB query failure)

* **Fatal**

  * Critical failure → application crash/restart

---

### Structured vs Unstructured Logging

#### Unstructured Logging (Development)

* Human-readable text
* Colored, formatted output
* Easy to debug locally

#### Structured Logging (Production)

* JSON format
* Machine-readable
* Easier for tools to parse

### Why Structured Logs in Production?

* Tools (e.g., ELK, Grafana stack) need structured data
* Easier extraction of:

  * User ID
  * Request ID
  * Error details

---

## Instrumentation

### Definition

* Instrumentation = **measuring and collecting data from code**.

### Purpose

* Adds visibility into:

  * Function execution
  * Request lifecycle
  * System behavior

---

## OpenTelemetry

* Open standard for observability
* Provides:

  * SDKs
  * APIs
  * Tools
* Works across languages:

  * Node.js, Go, Python, etc.
* Enables consistent instrumentation

---

## Example Workflow in Code

### Request Lifecycle

1. **Middleware**

   * Creates a transaction (trace)
   * Adds metadata:

     * Service name
     * Environment
     * IP address
     * User ID
     * Request ID

2. **Context Passing**

   * Transaction stored in context
   * Accessible across layers

3. **Service Layer**

   * Extract transaction
   * Add attributes (e.g., user ID, title)

4. **Logging**

   * Log important events:

     * Operation start
     * Validation
     * DB execution
     * Errors
     * Success

5. **Error Handling**

   * Log error with:

     * Level = error
     * Metadata
   * Attach error to trace

6. **Success Case**

   * Log success event
   * Add attributes to trace

---

## Monitoring Implementation

* Middleware instruments each request
* Tracks:

  * Response time
  * Error rate
  * Throughput

---

## Observability Tools

### Open Source Stack

* **Grafana** → Dashboard
* **Prometheus** → Metrics
* **Loki / Promtail** → Logs
* **Jaeger** → Traces

### Proprietary Tools

* **New Relic**
* **Datadog**

### Trade-offs

* Open Source:

  * More control
  * More setup complexity

* Proprietary:

  * Easier integration
  * Less maintenance

---

## Dashboard Insights (Example)

### Metrics View

* Error rate
* Average response time
* Throughput

### Logs View

* Error details:

  * Status code
  * API route
  * Timestamp
  * Metadata

### Traces View

* Full request path
* Component-level breakdown
* Failure point identification

---

## Key Takeaways

* Logging, monitoring, and observability are **essential for production systems**.
* They must be implemented **both in code and infrastructure**.
* Observability provides **deep system understanding**:

  * Logs → events
  * Metrics → trends
  * Traces → flow
* Implementation is **incremental and evolving**, not perfect.

---

## Final Note

* Not a single “skill” but a **core engineering practice**.
* Critical for:

  * Debugging
  * Performance optimization
  * Reliability

[Context unclear – verify from video: Ending sentence incomplete]
