# Backend Architecture: Controllers, Services, and Middleware

A professional backend application is structured into distinct layers to ensure scalability, maintainability, and clear separation of concerns. This layered approach follows the **Request Life Cycle** from the moment it hits the server until a response is sent.

---

## 1. The Layered Architecture

### Controller (Handler) Layer
The **entry point** for an HTTP request.
- **Responsibilities**:
    - Extracting data from the `request` object (query params, body, headers).
    - **Binding**: Deserializing data into native language formats (e.g., structs, classes).
    - **Validation & Transformation**: Ensuring data integrity early.
    - **Response Management**: Deciding the appropriate HTTP status code (e.g., 200, 201, 400, 500) and sending the response.
- **Rule**: Keep it "thin." It should only handle HTTP-specific logic.

### Service Layer
Where the **business logic** lives.
- **Responsibilities**:
    - Processing data received from the controller.
    - Orchestrating calls to multiple repositories.
    - Handling external integrations (sending emails, third-party API calls).
- **Rule**: The service layer should be **agnostic of the transport layer** (e.g., it shouldn't know it's being called via HTTP).

### Repository Layer
The **data access layer**.
- **Responsibilities**:
    - Constructing and executing database queries (SQL, NoSQL).
    - Mapping database results back to application models.
- **Rule**: Each repository method should have a single responsibility (e.g., `findById`, `create`).

---

## 2. Middleware

Middlewares are functions that execute between the request's entry point and the final handler.

### How they Work
Middlewares receive three arguments: `request`, `response`, and a `next()` function. Calling `next()` passes control to the next middleware or handler in the chain.

### Common Use Cases
- **Security**: CORS, Security Headers, Rate Limiting.
- **Authentication**: Verifying tokens and attaching user identity to the request.
- **Logging/Monitoring**: Recording request details for auditing and debugging.
- **Global Error Handling**: Catching errors from anywhere in the app and returning a structured JSON response.
- **Data Parsing/Compression**: Automating deserialization or Gzip compression.

> [!IMPORTANT]
> **Order Matters**: Middlewares are executed sequentially. For example, CORS and Logging should happen early, while Global Error Handling typically happens last.

---

## 3. Request Context

The **Request Context** is a shared, request-scoped state (usually a key-value store) that travels with the request through its entire life cycle.

- **Purpose**: To pass metadata between middlewares and handlers without coupling them together.
- **Examples**:
    - **User Identity**: An authentication middleware stores the `user_id` and `role` in the context for the handler to use.
    - **Request ID**: A unique UUID generated at the start of a request for tracing logs across microservices.
    - **Deadlines/Cancellations**: Communicating when a request should be aborted to downstream services.

## Summary
By separating responsibilities into **Controllers**, **Services**, and **Repositories**, and leveraging **Middleware** and **Request Context**, you create a robust framework that can grow in complexity while remaining easy to debug and extend.
