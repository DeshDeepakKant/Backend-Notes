# Logging, Monitoring & Observability

In modern distributed systems, understanding what is happening inside your backend is critical. Logging, monitoring, and observability are not just tools; they are practices implemented on a spectrum to ensure system reliability and ease of debugging.

## The Three Pillars of Observability

A system is considered "observable" if you can determine its internal state by looking at its external outputs:

### 1. Logs (The "What")
Immutable records of discrete events. Logs help you understand exactly **what happened** at a specific point in time (e.g., "User 123 failed to authenticate").
-   **Structured Logging**: In production, logs should be in **JSON format**. This allows log management tools (like ELK or Loki) to easily parse and query metadata like `user_id` or `request_id`.
-   **Unstructured Logging**: Human-readable text logs (console logs) are great for development but difficult to analyze at scale.

### 2. Metrics (The "Trend")
Aggregate data representing the health of the system over time. Metrics help you understand **patterns and trends** (e.g., "Our average response time has increased by 20%").
-   **Standard Metrics**: CPU/Memory usage, requests per second (throughput), and error rates.
-   **Business Metrics**: Successful checkouts, new signups, or payment failures.

### 3. Traces (The "Where")
A trace follows a single request as it travels through different components of your system (e.g., from the API Gateway to the Service layer, then to the Database). Traces help you find **bottlenecks and service interactions**.

---

## Log Levels: A Guide

Assigning appropriate levels to logs helps filter signal from noise.

| Level | Usage | Environment |
| :--- | :--- | :--- |
| **DEBUG** | High-verbosity details for troubleshooting. | Development only |
| **INFO** | General operational events (e.g., "Service started"). | Production |
| **WARN** | Unusual but non-critical events (e.g., "Failed login attempt"). | Production |
| **ERROR** | Serious issues that require investigation (e.g., "DB query failed"). | Production |
| **FATAL** | Critical failures that cause the application to crash. | Production |

---

## The Observability Workflow

How these pillars work together to resolve incidents:
1.  **Alerting**: A monitoring tool (like **Prometheus**) detects that your error rate has crossed a threshold (e.g., >5%) and sends a Slack alert via **Grafana**.
2.  **Dashboarding**: You check the **Metrics** to see if this is a global spike or limited to a specific region/method.
3.  **Tracing**: You look at a **Trace** to see where the request failed—did it time out in the Database or was it rejected by an external Payment API?
4.  **Logging**: You dive into the **Logs** for that specific failed request to see the exact error message and stack trace.

---

## Tools of the Trade

Depending on your team's size and resources, you can choose between open-source or proprietary solutions:

-   **Open Source (Self-Hosted)**:
    -   **Metrics**: Prometheus
    -   **Dashboard/Alerts**: Grafana
    -   **Logs**: Loki / ELK Stack (Elasticsearch, Logstash, Kibana)
    -   **Traces**: Jaeger / Tempo
-   **Proprietary (SaaS)**:
    -   **New Relic**: A one-stop solution for all three pillars.
    -   **Datadog**: Highly popular for cloud-native observability.

## Summary
Observability is a collective effort between developers (who instrument the code) and DevOps (who manage the infrastructure). By implementing **distributed tracing**, **structured logs**, and **real-time metrics**, you transform your backend from a "black box" into a transparent, maintainable system.
