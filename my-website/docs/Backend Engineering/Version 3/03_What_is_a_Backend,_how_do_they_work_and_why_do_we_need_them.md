# Backend Fundamentals: How Requests Flow & Why Backend Exists

## Traditional Definition of Backend

* Backend = a **computer (server)** that:

  * Listens on an **open port** (e.g., 80, 443)
  * Accepts requests via:

    * HTTP
    * WebSockets
    * gRPC
* Accessible over the **internet**
* Clients (frontend/apps) can:

  * Send data
  * Receive data

### Why It’s Called a Server

* It **serves content**:

  * Static: HTML, CSS, JS, images
  * Dynamic: JSON responses
* It can also **accept and process incoming data**

---

## End-to-End Request Flow (High-Level)

### Step-by-Step Flow

1. **Browser initiates request**

   * User refreshes or performs an action

2. **DNS Resolution**

   * Domain → IP address
   * Uses:

     * A records → map domain → IP
     * CNAME → map domain → another domain

3. **Request reaches Cloud Provider (AWS EC2)**

4. **Firewall (Security Group) Check**

   * Only allowed ports pass:

     * 80 → HTTP
     * 443 → HTTPS
   * If blocked → request fails

5. **Reverse Proxy (Nginx)**

* Acts as an **intermediate server**
* Responsibilities:

  * Routing
  * SSL handling
  * Redirects

Example:

* Domain → Nginx → localhost:3001

6. **Backend Server (Node.js)**

* Runs on localhost (e.g., port 3001)
* Processes request
* Returns response

---

## Key Insight: Multi-Hop Journey

* Request travels through:

  * Browser → DNS → Cloud → Firewall → Reverse Proxy → Server
* Backend is **not just code**, but a **chain of systems working together**

---

## Local vs Production

* Local:

  * `localhost:3000/users`
* Production:

  * Domain → DNS → Cloud → Proxy → Server

Same logic, different infrastructure layers.

---

## Why Do We Need Backend?

### Example: Instagram Like

1. User clicks “Like”
2. Request sent to server
3. Server:

   * Identifies user
   * Stores like in database
   * Finds post owner
   * Sends notification

### Key Role of Backend

* **Centralized system managing all users and data**

---

## Core Responsibility of Backend

* Can be reduced to one word:

### 👉 Data

* Fetch data
* Receive data
* Persist data

---

## Why Not Do Everything on Frontend?

* Frontend is also a computer → valid question

---

# How Frontend Actually Works

## Frontend Request Flow

1. Browser requests HTML

2. Server returns HTML

3. Browser fetches:

   * CSS
   * JS
   * Fonts
   * Images

4. Browser:

   * Applies CSS → UI rendered
   * Executes JS → adds interactivity

### Key Concept

* **Browser = runtime environment**
* Code runs on **user’s machine**, not server

---

## Key Difference: Backend vs Frontend

| Backend                   | Frontend                 |
| ------------------------- | ------------------------ |
| Code runs on server       | Code runs in browser     |
| Processes logic centrally | Executes logic on client |
| Has full system access    | Runs in sandbox          |

---

# Limitations of Frontend (Why Backend is Needed)

## 1. Security Restrictions (Sandboxing)

* Browser is isolated from:

  * File system
  * OS processes
* Prevents malicious code execution

### Implication

* Frontend cannot:

  * Access files
  * Access environment variables
  * Perform sensitive operations

---

## 2. CORS Restrictions

* Browser blocks requests to other domains unless allowed

### Concept

* **CORS (Cross-Origin Resource Sharing)**:

  * Security policy
  * Restricts cross-domain API calls

### Problem

* Backend often needs:

  * External APIs
  * Third-party services
* Browser restrictions make this unreliable

---

## 3. Database Access Limitations

* Backend:

  * Uses native drivers (Postgres, MongoDB)
  * Maintains **connection pools**

* Frontend:

  * Cannot:

    * Maintain persistent DB connections
    * Handle binary protocols
    * Manage connection pooling

### Problem

* Each client would open its own DB connection → overload

---

## 4. Performance & Compute Constraints

* Frontend runs on:

  * Phones
  * Low-end devices
* Limited:

  * CPU
  * Memory

### Backend Advantage

* Centralized server:

  * Can scale resources
  * Handle heavy computations

---

## 5. Scalability & Control

* Backend:

  * Central control over logic
  * Easy to scale infrastructure

* Frontend:

  * Distributed across devices
  * Hard to enforce consistency

---

# Summary of Backend Need

* Backend exists because frontend:

  * Is **restricted**
  * Is **unreliable for heavy logic**
  * Is **not secure for sensitive operations**

---

## Final Mental Model

### Backend =

* Centralized system that:

  * Manages data
  * Handles logic
  * Coordinates actions between users

### Frontend =

* Interface that:

  * Displays data
  * Sends user actions
  * Executes limited logic

---

## Key Takeaways

* Backend is not just:

  * APIs or code
* It is:

  * **Infrastructure + networking + servers + data systems**
* Understanding request flow is critical to:

  * Build real systems
  * Debug issues
  * Design scalable architectures

---

## Closing Insight

* This understanding forms the **foundation** for:

  * Learning backend engineering deeply
  * Connecting all future concepts (HTTP, DB, scaling, etc.)
