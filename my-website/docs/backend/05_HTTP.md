---
title: "Understanding HTTP for Backend Engineers"
slug: "/backend/05_HTTP"
---

# Understanding HTTP for Backend Engineers

HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web. For backend engineers, a deep understanding of HTTP is essential, as it defines how clients and servers interact, exchange data, and manage state.

## 1. HTTP Request and Response Lifecycle

Every HTTP interaction consists of a **Request** sent by a client (e.g., a browser or mobile app) and a **Response** returned by the server.

### Request Components
- **HTTP Method:** Indicates the action to be performed (GET, POST, etc.).
- **URL/Path:** The resource being accessed.
- **Headers:** Metadata providing context (e.g., `Content-Type`, `Authorization`).
- **Body:** Data sent to the server (primarily for POST, PUT, and PATCH).

### Response Components
- **Status Code:** Indicates the result of the request (e.g., 200 OK, 404 Not Found).
- **Headers:** Metadata provided by the server (e.g., `Set-Cookie`, `Cache-Control`).
- **Body:** The resource data or error message.

## 2. HTTP Methods and Idempotency

Understanding the nature of HTTP methods is crucial for designing predictable APIs.

| Method | Description | Idempotent |
| :--- | :--- | :--- |
| **GET** | Retrieves a resource. | Yes |
| **POST** | Creates a new resource. | No |
| **PUT** | Replaces an existing resource or creates it if it doesn't exist. | Yes |
| **PATCH** | Partially updates a resource. | No |
| **DELETE** | Removes a resource. | Yes |
| **OPTIONS** | Describes communication options for the target resource (used in CORS). | Yes |

> [!NOTE]
> **Idempotency** means that making the same request multiple times has the same effect as making it once. For example, deleting a resource twice results in the same state (it's gone).

## 3. HTTP Status Codes

Status codes are categorized into five classes:

- **1xx (Informational):** Request received, continuing process. (e.g., `101 Switching Protocols`)
- **2xx (Success):** The action was successfully received, understood, and accepted.
  - `200 OK`: Standard success.
  - `201 Created`: Resource successfully created.
  - `204 No Content`: Success, but no body returned.
- **3xx (Redirection):** Further action needs to be taken to complete the request.
  - `301 Moved Permanently`: Resource moved to a new URL.
  - `302 Found`: Temporary redirect.
  - `304 Not Modified`: Client can use the cached version.
- **4xx (Client Error):** The request contains bad syntax or cannot be fulfilled.
  - `400 Bad Request`: General client-side error.
  - `401 Unauthorized`: Authentication required.
  - `403 Forbidden`: Authenticated but lack permissions.
  - `404 Not Found`: Resource does not exist.
- **5xx (Server Error):** The server failed to fulfill an apparently valid request.
  - `500 Internal Server Error`: Generic server error.

## 4. Cross-Origin Resource Sharing (CORS)

CORS is a security mechanism implemented by browsers to prevent malicious scripts on one origin from accessing sensitive data on another.

### Simple Requests
Requests using "simple" methods (GET, POST, HEAD) and standard headers are sent directly. The server must include the `Access-Control-Allow-Origin` header in the response.

### Pre-flight Requests (OPTIONS)
For "non-simple" requests (e.g., using `PUT`, `DELETE`, or custom headers like `Content-Type: application/json`), the browser first sends an **OPTIONS** request.
1. **Request:** Client asks if the cross-origin request is allowed.
2. **Response:** Server responds with allowed methods and headers (e.g., `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`).
3. **Execution:** If allowed, the browser sends the actual request.

## 5. HTTP Caching

Caching improves performance by reducing redundant data transfers.

- **ETag:** A unique identifier for a specific version of a resource. The client sends it back in the `If-None-Match` header. If the resource hasn't changed, the server returns `304 Not Modified`.
- **Last-Modified:** Uses the `If-Modified-Since` header to check if the resource has been updated since a specific timestamp.
- **Cache-Control:** Headers like `max-age` tell the browser how long to store the resource locally.

## 6. Security: SSL, TLS, and HTTPS

- **SSL (Secure Sockets Layer):** The original encryption protocol, now legacy.
- **TLS (Transport Layer Security):** The modern, secure successor to SSL.
- **HTTPS:** HTTP over TLS. It ensures that communication between the client and server is encrypted, protecting sensitive data from interception and tampering.

By mastering these core concepts, you can build secure, efficient, and robust backend systems that adhere to web standards.
