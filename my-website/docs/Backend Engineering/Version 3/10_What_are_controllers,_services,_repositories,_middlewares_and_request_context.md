# Handlers, Services, Repositories, Middleware & Request Context — Detailed Notes

---

## 1. Overview

* This topic covers:

  * **Handlers / Controllers**
  * **Service Layer**
  * **Repository Layer**
  * **Middleware**
  * **Request Context**
* These are **design patterns**, not strict rules
* Goal:

  * Improve **scalability**
  * Improve **maintainability**
  * Reduce **code duplication** 

---

## 2. Request Lifecycle (Inside Server)

---

### Flow

1. Client sends HTTP request
2. OS forwards request to server port
3. Routing happens
4. Handler (Controller) executes
5. Service layer processes logic
6. Repository interacts with DB
7. Response returned to client

---

## 3. Handlers / Controllers

---

### Definition

* Entry point after routing
* Receives:

  * Request object
  * Response object

---

### Responsibilities

---

#### 1. Extract Data

* From request:

  * Query params (GET)
  * Body (POST/PUT/PATCH)
  * Path params

---

#### 2. Deserialize Data

* Convert JSON → native format:

  * Go → struct
  * Python → dict/class
  * Node.js → object (auto)

---

#### 3. Handle Errors

* If deserialization fails:

  * Return **400 Bad Request**

---

#### 4. Validate & Transform

* Ensure correct structure
* Modify data if needed

---

#### 5. Call Service Layer

* Pass:

  * Clean data
  * Auth info (userId, roles, etc.)

---

#### 6. Send Response

* Based on result:

  * Success → 200/201/204
  * Client error → 400
  * Server error → 500

---

### Key Principle

* Handles **HTTP-related logic only**

---

## 4. Service Layer

---

### Definition

* Core business logic layer

---

### Responsibilities

---

#### 1. Process Data

* Apply business rules

---

#### 2. Orchestrate Logic

* Combine multiple operations:

  * DB calls
  * External APIs
  * Emails
  * Notifications

---

#### 3. Call Repository Layer

* For DB interactions

---

#### 4. Return Data

* Pure function-like behavior

---

### Key Principle

* Should be **independent of HTTP**
* Should not know:

  * Status codes
  * Request/response formats

---

## 5. Repository Layer

---

### Definition

* Data access layer

---

### Responsibilities

---

#### 1. Construct Queries

* SQL / NoSQL queries

---

#### 2. Execute DB Operations

* Insert
* Fetch
* Update
* Delete

---

#### 3. Return Data

---

### Design Rule

* One method = one responsibility

---

### Example

* `getAllBooks()` → returns list
* `getBookById(id)` → returns single

❌ Avoid mixing both in one function

---

## 6. Layer Interaction Summary

---

### Flow

* Controller:

  * Extracts + validates data
* Service:

  * Processes logic
* Repository:

  * Talks to DB

---

### Key Insight

* Separation = cleaner code + easier debugging

---

## 7. Middleware

---

### Definition

* Functions executed **between request lifecycle stages**

---

### Position

* Before routing
* After routing
* Before/after handlers

---

### Middleware Receives

* Request object
* Response object
* `next()` function

---

### `next()` Function

* Passes execution to:

  * Next middleware
  * Next stage

---

## 8. Why Middleware?

---

### Purpose

* Avoid duplication
* Centralize common logic

---

### Without Middleware

* Same code repeated in every handler

---

### With Middleware

* Write once, reuse everywhere

---

## 9. Middleware Capabilities

---

* Read request
* Modify request
* Modify response
* Send response early
* Stop execution

---

## 10. Common Middleware Types

---

### 10.1 CORS Middleware

* Checks request origin
* Adds headers if allowed
* Prevents unauthorized cross-origin access

---

### 10.2 Security Headers

* Adds headers like:

  * Content Security Policy

---

### 10.3 Authentication Middleware

---

#### Steps

* Extract token
* Validate token

---

#### Outcomes

* Failure → return **401 Unauthorized**
* Success → store:

  * userId
  * roles

---

### 10.4 Rate Limiting

---

#### Purpose

* Prevent abuse

---

#### Example

* Max 30 requests / 2 seconds

---

#### Response

* If exceeded → **429 Too Many Requests**

---

### 10.5 Logging Middleware

---

* Logs:

  * Path
  * Method
  * Query params
  * Body

---

### 10.6 Global Error Handling

---

#### Purpose

* Catch errors from anywhere

---

#### Behavior

* Convert errors → structured response
* Decide:

  * 400 vs 500

---

#### Placement

* Always **last middleware**

---

### 10.7 Compression Middleware

* Compress response (e.g., gzip)
* Improves performance

---

### 10.8 Serialization Middleware

* Handle:

  * JSON parsing
  * Binding

---

## 11. Middleware Ordering

---

### Important Rule

* Order affects behavior

---

### Typical Order

1. CORS
2. Logging
3. Authentication
4. Rate limiting
5. Handlers
6. Error handling

---

## 12. Request Context

---

### Definition

* Per-request storage (state)

---

### Characteristics

* Scoped to **single request**
* Shared across:

  * Middleware
  * Handlers

---

### Structure

* Usually key-value store

---

## 13. Why Request Context?

---

### Problem

* Passing data manually between layers → tight coupling

---

### Solution

* Shared context accessible everywhere

---

## 14. Common Use Cases

---

### 14.1 Authentication Data

* Store:

  * userId
  * role
  * permissions

---

### Usage

* Handler retrieves userId from context
* Avoids trusting client input

---

### Security Benefit

* Prevents malicious user from:

  * Sending fake userId

---

### 14.2 Request ID Tracking

---

#### Flow

* Middleware generates UUID
* Stored in context

---

#### Usage

* Logging
* Debugging
* Tracing requests across services

---

### 14.3 Microservices Communication

* Pass request ID in headers
* Helps track distributed requests

---

### 14.4 Cancellation & Deadlines

* Abort long-running operations
* Prevent resource blocking

---

## 15. Key Concepts Summary

---

### Layer Responsibilities

* Controller → HTTP + validation
* Service → business logic
* Repository → database

---

### Middleware

* Runs in middle of lifecycle
* Handles reusable logic

---

### Request Context

* Shared state per request
* Enables loose coupling

---

## 16. Final Takeaways

---

* Use layers for:

  * Clean architecture
  * Scalability

* Middleware is for:

  * Reusability
  * Cross-cutting concerns

* Request context is for:

  * Sharing request-scoped data

* Always:

  * Keep responsibilities separate
  * Avoid mixing concerns

---

