# Error Handling & Fault-Tolerant Systems

In backend engineering, errors are not exceptions; they are an inevitable part of the system's lifecycle. Building a fault-tolerant system requires moving beyond simply "fixing bugs" to adopting a proactive mindset where failure is anticipated and managed.

## The Taxonomy of Errors

Understanding the source of an error is the first step in handling it correctly.

### 1. Logic Errors
Logic errors are the most dangerous because they don't crash the application but produce incorrect results (e.g., applying a discount twice). These often stem from misunderstood requirements or incorrect algorithm implementation.
- **Prevention**: Robust unit testing and clear requirement documentation.

### 2. Database Errors
The database is often the most critical point of failure.
- **Connection Errors**: Caused by network partitions, overloaded servers, or exhausted connection pools.
- **Constraint Violations**: Trying to insert duplicate emails (Unique Key) or referencing non-existent records (Foreign Key).
- **Deadlocks**: Circular dependencies between concurrent database operations.

### 3. External Service Errors
Modern systems rely on third-party APIs (Stripe, Twilio, OpenAI), each of which is a potential point of failure.
- **Network Issues**: Timeouts and DNS failures.
- **Rate Limiting**: Exceeding an API's quota (often returns HTTP 429).
- **Service Outages**: Inevitable downtime of external providers.

### 4. Configuration Errors
Often occurs when moving between Development, Staging, and Production. Missing environment variables can cause runtime failures.
- **Best Practice**: Validate all required configurations at the application's startup.

---

## Proactive Error Detection

The best error handling starts **before** an error happens.

### Health Checks
Expose a `/health` or `/status` endpoint for monitoring.
- **Liveness**: Is the process running?
- **Readiness**: Is the service ready to serve traffic? (e.g., is the database connected?)

### Monitoring & Observability
- **The Three Pillars**: Logs, Metrics, and Traces.
- **Performance Indicators**: Degradation in response times often precedes a total system failure.
- **Business Metrics**: A sudden drop in successful checkouts can indicate a technical issue even if error logs look normal.

---

## The "Final Safety Net": Global Error Handling

A **Global Error Handler** is a centralized middleware that catches all unhandled exceptions and converts them into structured, user-friendly responses.

### Advantages:
1.  **Robustness**: Ensures no error results in an unhandled crash or a leaky 500 internal server error.
2.  **Consistency**: Returns a standardized JSON error format across the entire API.
3.  **Redundancy**: Prevents repeating the same `try/catch` logic in every controller.

### Implementation Logic:
- **Repository Layer**: Throws low-level DB errors.
- **Service Layer**: Adds business context to the error.
- **Global Middleware**: Identifies the error type and chooses the HTTP status code (e.g., 404 for "No Rows," 400 for "Constraint Violation").

---

## Security in Error Handling

> [!CAUTION]
> **Never leak internal details to the user.** Probing error messages is a common tactic for attackers to learn about your system's architecture.

-   **Generic Messages**: Instead of "Table 'users' does not have column 'email_address'", return "Something went wrong."
-   **Authentication**: In response to a failed login, use "Invalid email or password" rather than "User not found" to prevent account enumeration attacks.
-   **Log Sanitization**: Ensure sensitive data (passwords, API keys, credit card numbers) is never written to logs or external observability tools.

## Summary

Fault tolerance is a mindset. By combining **proactive monitoring**, **centralized error handling**, and **secure response practices**, you can build backend systems that remain resilient even when the unexpected happens.
