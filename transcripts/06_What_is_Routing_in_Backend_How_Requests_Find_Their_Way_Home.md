# Routing in Backend Systems

## Role of Routing

* HTTP methods define **“what” (intent)**:

  * GET → fetch
  * POST → create
  * PATCH → update
  * DELETE → remove

* Routing defines **“where” (resource)**:

  * Which endpoint/resource the action applies to

### Combined Meaning

* **Method + Route = Complete instruction**
* Server uses both to:

  * Match a handler
  * Execute logic
  * Return response

---

## Definition of Routing

* Routing = **mapping URL + method → server-side logic (handler)**

---

## Basic Example

* Request:

  * Method: `GET`
  * Route: `/users`

* Meaning:

  * Fetch users from server

---

## Static Routes

### Definition

* Routes with **fixed paths**
* No dynamic values

### Example

* `/api/books`

### Characteristics

* Always same path
* Always maps to same handler

---

## Dynamic Routes (Path Parameters)

### Definition

* Routes with **variable segments**

### Example

* `/api/users/:id`

### Example Request

* `/api/users/123`

### Meaning

* Fetch user with ID = 123

---

### Key Concept

* `:id` = **path parameter**
* Extracted by server from URL

---

## Path Parameters vs Query Parameters

### Path Parameters

* Part of URL path
* Used for:

  * Identifying resources

Example:

* `/users/123`

---

### Query Parameters

* Key-value pairs after `?`
* Used for:

  * Filtering
  * Searching
  * Pagination

Example:

* `/search?query=books`

---

## Why Query Parameters?

* GET requests **don’t have a body**
* Used to send additional data

---

## Query Parameter Use Cases

* Pagination:

  * `/books?page=2&limit=20`
* Filtering:

  * `/books?category=science`
* Sorting:

  * `/books?sort=asc`

---

## Nested Routes

### Definition

* Routes representing **hierarchical relationships**

---

### Example

* `/api/users/123/posts/456`

### Meaning

* User → 123
* Fetch:

  * Post → 456
  * Belonging to that user

---

### Levels of Nesting

* `/users` → all users
* `/users/123` → specific user
* `/users/123/posts` → all posts of user
* `/users/123/posts/456` → specific post

---

### Purpose

* Improves:

  * Readability
  * Semantic clarity

---

## Route Versioning

### Definition

* Adding version to API path

---

### Example

* `/api/v1/products`
* `/api/v2/products`

---

### Why Needed

* APIs evolve over time
* New requirements may:

  * Change response format
  * Break old clients

---

### Benefits

* Maintain backward compatibility
* Allow gradual migration

---

### Deprecation Flow

1. Release v2
2. Mark v1 as deprecated
3. Give time to migrate
4. Remove v1 later

---

## Catch-All Routes

### Definition

* Handles **unmatched routes**

---

### Example

* `/*`

### Purpose

* Return:

  * 404 Not Found
  * User-friendly message

---

### Why Important

* Prevent:

  * Empty responses
  * Confusing errors

---

## Key Routing Concepts Summary

### Core Mapping

* `(HTTP Method + Route) → Handler`

---

### Types of Routes

* Static → fixed paths
* Dynamic → path parameters
* Query-based → filters & metadata
* Nested → hierarchical relationships
* Versioned → API evolution
* Catch-all → fallback handling

---

## Final Takeaways

* Routing is the **entry point of backend logic**

* Defines:

  * Where requests go
  * How they are processed

* Good routing design:

  * Improves readability
  * Makes APIs intuitive
  * Enables scalability and maintainability

---

## Mental Model

* Method = **What to do**
* Route = **Where to do it**

➡️ Together → **Complete backend instruction**
