---
title: "Complete REST API Design"
slug: "/backend/11_REST_API"
---

# Complete REST API Design

REST (Representational State Transfer) is the industry-standard architectural style for building scalable web APIs. Designing a professional API requires more than just making it work; it must be intuitive, consistent, and standard-compliant.

---

## 1. The Core Constraints of REST
Proposed by Roy Fielding, these constraints ensure the web remains scalable:
1. **Client-Server**: Separation of concerns between the UI and data/logic.
2. **Stateless**: Each request must contain all information needed to process it. The server doesn't store client sessions.
3. **Uniform Interface**: Components communicate via a standardized way (Resources, HTTP methods).
4. **Cacheable**: Servers must label responses as cacheable to improve performance.
5. **Layered System**: Clients only interact with the immediate layer (e.g., Load Balancer), not necessarily the end server.

---

## 2. Resource-Based URL Design

URLs should represent **Resources** (nouns) rather than actions (verbs).

| Good Pattern (Plural Nouns) | Avoid (Verbs/Singular) |
| :--- | :--- |
| `GET /v1/organizations` | `GET /v1/getOrganizations` |
| `POST /v1/projects` | `POST /v1/create_project` |
| `GET /v1/users/123/tasks` | `GET /v1/user/123/get_tasks` |

### URL Formatting Rules
- **Lowercase**: Use `/books`, not `/Books`.
- **Hyphens**: Use `/harry-potter`, not `/harry_potter` or `/harry%20potter`.
- **Hierarchy**: Use forward slashes to show relationships (`/organizations/:id/projects`).

---

## 3. HTTP Methods & Idempotency

**Idempotency** means performing an action multiple times has the same effect as performing it once.

| Method | Role | Idempotent? | Description |
| :--- | :--- | :--- | :--- |
| **GET** | Read | Yes | Fetches data. No side effects on the server. |
| **POST** | Create | **No** | Creates a new resource. Repeated calls create duplicate records. |
| **PUT** | Replace | Yes | Completely replaces a resource with the provided payload. |
| **PATCH** | Update | Yes | Partially updates specific fields of a resource. |
| **DELETE** | Remove | Yes | Deletes a resource. Subsequent calls result in 404 but no new side effects. |

---

## 4. Advanced API Patterns

### Pagination
Avoid returning all data at once. Use a standard pagination structure.
- **Request**: `GET /books?limit=10&page=2`
- **Response**:
  ```json
  {
    "data": [...],
    "total": 50,
    "page": 2,
    "total_pages": 5
  }
  ```

### Sorting & Filtering
- **Filtering**: Use query parameters matching field names (`GET /tasks?status=active`).
- **Sorting**: Use `sort_by` and `sort_order` (`GET /users?sort_by=name&sort_order=asc`).
- **Standard Defaults**: Always sort by `created_at` in descending order by default.

### Custom Actions
For actions that aren't standard CRUD (e.g., `archive`, `clone`), use the **POST** method with an action suffix.
- `POST /v1/organizations/:id/archive`
- `POST /v1/projects/:id/clone`

---

## 5. Best Practices for Professional APIs

1. **Be Consistent**: Use `CamelCase` for JSON keys globally. Don't use `item_name` in one API and `itemName` in another.
2. **Standard Status Codes**:
    - `200 OK`: Success.
    - `201 Created`: Post-creation success.
    - `204 No Content`: Successful deletion.
    - `400 Bad Request`: Validation failure.
    - `404 Not Found`: Specific resource ID doesn't exist.
3. **Sane Defaults**: Don't force clients to send optional fields (e.g., set `status: "active"` by default on creation).
4. **Interactive Docs**: Always maintain a Swagger/OpenAPI playground for developers to test the API.

## Summary
A great API is predictable. By sticking to RESTful standards and focusing on resource-based designs, you ensure that your API is "self-documenting" and delightful for other engineers to integrate.
