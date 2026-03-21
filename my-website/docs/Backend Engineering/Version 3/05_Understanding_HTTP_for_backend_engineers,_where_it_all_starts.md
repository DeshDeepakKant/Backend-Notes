# HTTP Protocol Fundamentals (Backend Essentials)

## Scope of Learning

* Backend is vast → focus on **~90% commonly used concepts**
* HTTP is:

  * Most widely used protocol for client-server communication
* Used for:

  * Sending data
  * Receiving data

---

## Core Ideas of HTTP

### 1. Statelessness

* HTTP is **stateless** → no memory of past requests

### What It Means

* Each request is:

  * Independent
  * Self-contained
* Must include:

  * Headers
  * Authentication (tokens/cookies)
  * Required data

### Example

* Accessing user profile:

  * Client must send credentials **every time**

### Benefits

* **Simplicity**

  * No session storage needed on server
* **Scalability**

  * Requests can go to any server
* **Fault tolerance**

  * Server crash does not affect state

### Limitation

* No built-in state → developers use:

  * Cookies
  * Sessions
  * Tokens

---

### 2. Client-Server Model

* Two roles:

#### Client

* Initiates request
* Provides:

  * URL
  * Headers
  * Data

#### Server

* Waits for requests
* Processes request
* Sends response:

  * HTML / JSON / error

### Key Rule

* Communication is always:

  * **Client → Server → Response**

---

## HTTP vs HTTPS

* HTTPS = HTTP + security (TLS encryption)
* Same principles, but:

  * Data is encrypted
  * Uses certificates

---

## Transport Layer (Simplified)

* HTTP uses **TCP** (reliable protocol)
* Ensures:

  * No data loss
  * Ordered delivery

### Note

* Lower-level networking (TCP handshake, TLS) is:

  * Important but not core for backend basics

---

## HTTP Versions (Evolution)

### HTTP/1.0

* New connection per request → slow

### HTTP/1.1

* Persistent connections
* Multiple requests on same connection
* Improved caching

### HTTP/2

* Multiplexing (parallel requests)
* Binary format
* Header compression
* Server push

### HTTP/3

* Built on QUIC (UDP)
* Faster connections
* Lower latency

### Key Takeaway

* All versions aim to:

  * Improve performance
  * Reduce latency

---

# HTTP Messages

## Request Structure

* Method (GET, POST, etc.)
* URL (resource)
* HTTP version
* Headers (metadata)
* Blank line
* Body (optional data)

---

## Response Structure

* HTTP version
* Status code (e.g., 200)
* Headers
* Blank line
* Body (data)

---

# HTTP Headers

## Definition

* Headers = **key-value metadata**

---

## Why Headers Exist

* Like labels on a parcel:

  * Help systems process requests without opening content
* Separate:

  * Metadata (headers)
  * Data (body)

---

## Types of Headers

### 1. Request Headers

* Sent by client
* Examples:

  * `User-Agent`
  * `Authorization`
  * `Accept`

---

### 2. General Headers

* Used in both request/response
* Examples:

  * Date
  * Cache-Control
  * Connection

---

### 3. Representation Headers

* Describe body content
* Examples:

  * Content-Type
  * Content-Length
  * Content-Encoding
  * ETag

---

### 4. Security Headers

* Protect application
* Examples:

  * HSTS
  * Content-Security-Policy
  * X-Frame-Options
  * Secure cookies

---

## Key Concepts

### Extensibility

* Headers can be:

  * Added/customized easily
* Enables:

  * New features without changing protocol

---

### Remote Control

* Headers act like instructions:

  * Client → server behavior control

Examples:

* Request format (JSON/HTML)
* Caching rules
* Authentication

---

# HTTP Methods (Intent)

## Purpose

* Define **intent of request**

---

## Common Methods

### GET

* Fetch data
* No modification

---

### POST

* Create data
* Has request body

---

### PATCH

* Partial update

---

### PUT

* Full replacement

---

### DELETE

* Remove resource

---

## Idempotency

### Idempotent Methods

* Same result on repeated calls
* Examples:

  * GET
  * PUT
  * DELETE

---

### Non-Idempotent

* Different result each time
* Example:

  * POST

---

## OPTIONS (Special Method)

* Used in **CORS preflight**
* Checks:

  * Allowed methods
  * Allowed headers

---

# CORS (Cross-Origin Resource Sharing)

## Problem

* Browsers enforce **Same-Origin Policy**
* Block requests to different domains

---

## Solution

* CORS → controlled cross-origin access

---

## Simple Request Flow

1. Client sends request
2. Browser adds `Origin` header
3. Server responds with:

   * `Access-Control-Allow-Origin`

### If Allowed

* Response is accepted

### If Not

* Browser blocks response

---

## Preflight Request Flow

### When Triggered

* Non-simple method (PUT/DELETE)
* Custom headers (Authorization)
* JSON content-type

---

### Flow

1. Browser sends `OPTIONS` request

2. Server responds with:

   * Allowed origins
   * Allowed methods
   * Allowed headers

3. Browser validates response

4. Sends actual request

---

# HTTP Status Codes

## Purpose

* Standard way to indicate:

  * Success
  * Failure
  * Errors

---

## Categories

### 1xx → Informational

### 2xx → Success

### 3xx → Redirection

### 4xx → Client Errors

### 5xx → Server Errors

---

## Common Codes

### Success (2xx)

* 200 → OK
* 201 → Created
* 204 → No Content

---

### Redirection (3xx)

* 301 → Permanent redirect
* 302 → Temporary redirect
* 304 → Not modified (cache)

---

### Client Errors (4xx)

* 400 → Bad request
* 401 → Unauthorized
* 403 → Forbidden
* 404 → Not found
* 405 → Method not allowed
* 409 → Conflict
* 429 → Too many requests

---

### Server Errors (5xx)

* 500 → Internal error
* 501 → Not implemented
* 502 → Bad gateway
* 503 → Service unavailable
* 504 → Gateway timeout

---

# HTTP Caching

## Purpose

* Store responses for reuse

### Benefits

* Faster load times
* Reduced bandwidth
* Lower server load

---

## Key Headers

* Cache-Control → expiry time
* ETag → version/hash
* Last-Modified → timestamp

---

## Flow

1. First request → server sends data + ETag
2. Next request:

   * Client sends ETag
3. Server:

   * If unchanged → 304 (use cache)
   * If changed → 200 (new data)

---

# Content Negotiation

## Definition

* Client + server agree on **data format**

---

## Types

### Media Type

* JSON / XML

---

### Language

* English / Spanish

---

### Encoding

* gzip / deflate

---

## Headers Used

* Accept
* Accept-Language
* Accept-Encoding

---

# HTTP Compression

## Purpose

* Reduce response size

---

## Example

* Without compression → 26 MB
* With gzip → 3.8 MB

---

## Key Header

* Content-Encoding

---

# Persistent Connections

* Introduced in HTTP/1.1
* Reuse same TCP connection

### Benefits

* Reduced latency
* Fewer connections

---

# Handling Large Data

## Sending Large Requests

### Multipart Requests

* Used for file uploads
* Data sent in parts

---

## Receiving Large Responses

### Streaming

* Data sent in chunks
* Headers:

  * `Content-Type: text/event-stream`
  * `Connection: keep-alive`

---

# Security (SSL/TLS)

## SSL

* Old encryption protocol (deprecated)

---

## TLS

* Modern secure protocol
* Encrypts data in transit

---

## HTTPS

* HTTP + TLS

### Benefits

* Prevents:

  * Data theft
  * Tampering
  * Eavesdropping

---

# Final Takeaways

* HTTP is the **foundation of backend communication**

* Core concepts to master:

  * Statelessness
  * Headers
  * Methods
  * Status codes
  * CORS
  * Caching

* If you understand:

  * Request → flow → response → headers

➡️ You can:

* Debug APIs
* Design systems
* Work across any backend stack
