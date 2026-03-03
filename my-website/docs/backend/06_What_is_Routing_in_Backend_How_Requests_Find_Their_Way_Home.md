# Routing in Backend Development

Routing is the mechanism that maps incoming HTTP requests to specific server-side logic, known as **handlers**. It is essentially the "address system" of your backend, determining where a request should go based on its destination and intent.

## The Core of Routing: Method + Path

A route is defined by the combination of two key elements:
1.  **HTTP Method**: Expresses the *intent* (e.g., `GET` for fetching, `POST` for creating).
2.  **URL Path**: Expresses the *location* or *resource* (e.g., `/api/books`).

The server uses this unique "Method + Path" key to identify the correct handler. Two routes with the same path but different methods (e.g., `GET /books` vs `POST /books`) are distinct and will not clash.

## Types of Routes

### 1. Static Routes
Static routes are constant strings that do not change. They match a specific, fixed URL path.
*   **Example**: `GET /api/books` or `POST /api/login`.
*   **Use Case**: Accessing a collection of resources or fixed endpoints.

### 2. Dynamic Routes (Path Parameters)
Dynamic routes contain variable segments, often denoted by a colon (e.g., `:id`). These allow a single route to handle multiple related resources by extracting variable data from the path.
*   **Example**: `GET /api/users/:userId`
*   **Request**: `/api/users/123` -> Extracts `userId = "123"`.
*   **Semantic Meaning**: Path parameters express the **identity** of the resource. They answer the question: "Which specific resource am I interacting with?"

---

## Route Parameters

### Path Parameters vs. Query Parameters

While both can send data to the server, they serve different semantic purposes:

| Feature | Path Parameters | Query Parameters |
| :--- | :--- | :--- |
| **Location** | Part of the URL path (`/users/:id`) | After the `?` (`/search?q=info`) |
| **Purpose** | **Resource Identity**: Defines *which* resource. | **Modality/Metadata**: Modifies *how* the resource is returned. |
| **Usage** | Required for resource identification. | Optional; used for filtering, sorting, searching, etc. |
| **Example** | `GET /books/123` | `GET /books?author=rowling&sort=desc` |

### Query Parameters in GET Requests
Since `GET` requests lack a request body, query parameters are the primary way to send user-defined values (like search queries or filter settings) without cluttering the semantic structure of the URL path.

**Common Use Case: Pagination**
Query parameters are standard for paginated data:
`GET /api/books?page=2&limit=20`

---

## Advanced Routing Patterns

### Nested Routes
Nested routes reflect hierarchical relationships between resources. They allow for complex data retrieval while maintaining readability.
*   **Example**: `GET /api/users/:userId/posts/:postId`
*   **Meaning**: Fetch a specific post (ID: `postId`) belonging to a specific user (ID: `userId`).

### Route Versioning and Deprecation
Versioning ensures that breaking changes don't disrupt existing clients. It provides a migration window for users.
*   **V1**: `GET /api/v1/products` (returns `{ "id": 1, "name": "Item" }`)
*   **V2**: `GET /api/v2/products` (returns `{ "id": 1, "title": "Item" }`)
*   **Strategy**: Introduce V2, mark V1 as deprecated, and eventually remove V1 once clients have migrated.

### Catch-all Routes
A catch-all route acts as a fallback for any requests that don't match existing handlers. It is typically used to return a user-friendly `404 Not Found` response rather than a null or generic system error.
*   **Logic**: If no match found -> Route to `*` handler -> Return "Route not found".

---

## Summary
Understanding routing is essential for navigating a backend codebase. By mastering static/dynamic paths, parameter types, nesting, and versioning, you can build scalable, REST-compliant APIs that are both human-readable and efficient.
