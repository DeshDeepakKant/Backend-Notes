# Authentication and Authorization

In backend engineering, securing an application revolves around two fundamental questions:
1.  **Authentication (AuthN)**: "Who are you?" (Identity/Subject)
2.  **Authorization (AuthZ)**: "What can you do?" (Permissions/Capabilities)

---

## Core Building Blocks

### 1. Sessions (Stateful)
Sessions provide a way for the server to remember a user across multiple HTTP requests.
- **Mechanism**: The server creates a unique `session_id`, stores it in a persistent store (e.g., Redis), and sends it to the client as a cookie.
- **Pros**: Centralized control; easy to revoke access in real-time.
- **Cons**: Higher server-side memory overhead; complexity in distributed/multi-region systems.

### 2. JSON Web Tokens (JWT) (Stateless)
JWTs are self-contained tokens that encode user data (claims) and a cryptographic signature.
- **Structure**: `Header.Payload.Signature` (Base64 encoded).
- **Mechanism**: The server issues a signed token to the client. The client sends it in the `Authorization` header. The server verifies the token using a secret key without needing a database lookup.
- **Pros**: Highly scalable; no server-side storage required.
- **Cons**: Revocation is difficult (requires blacklisting or short expiration times).

### 3. Cookies
Cookies are a browser-side storage mechanism.
- **Security**: Use `HttpOnly` to prevent JavaScript access (mitigating XSS) and `Secure` to ensure they are only sent over HTTPS.

---

## Modern Authentication Strategies

### Stateful vs. Stateless
- **Stateful**: Best for web applications with strict session requirements.
- **Stateless**: Ideal for high-scale APIs, microservices, and mobile applications.

### API Keys
Used primarily for **Machine-to-Machine (M2M)** communication. They provide programmatic access to a server and are often easier to manage for integrations where no human interaction (UI) is involved.

### OAuth 2.0 & OpenID Connect (OIDC)
- **OAuth 2.0**: A protocol for **delegated authorization**. It allows a third-party app to access specific resources (e.g., "Read my Google Contacts") without sharing a password.
- **OIDC**: An identity layer built on top of OAuth 2.0 that provides **authentication**, allowing features like "Sign in with Google."

---

## Authorization with RBAC

**Role-Based Access Control (RBAC)** is the standard approach for managing permissions.
- **Roles**: Logical groupings (e.g., `Admin`, `Member`, `Editor`).
- **Permissions**: Specific actions allowed for a role (e.g., `READ_POSTS`, `DELETE_USER`).

The server identifies the user's role during the request cycle and uses middleware to enforce access rules BEFORE the request reaches the business logic.

---

## Security Best Practices

### 1. Secure Password Storage
- **Never store passwords in plain text.**
- Use strong hashing algorithms (e.g., Argon2, bcrypt) to transform passwords into irreversible, fixed-length strings.

### 2. Generic Error Messages
To prevent **User Enumeration** attacks, never specify WHICH part of the authentication failed.
- **Bad**: "User not found" or "Incorrect password."
- **Good**: "Authentication failed" or "Invalid email or password."

### 3. Defending Against Timing Attacks
Attackers can guess if a username exists by measuring the time it takes for the server to respond (e.g., hashing a password takes longer than a quick "User not found" exit).
- **Solution**: Use constant-time comparison functions or introduce a simulated response delay to equalize response times.

## Summary
Authentication and Authorization are the pillars of backend security. Whether using stateful sessions or stateless JWTs, the goal is to provide a secure, scalable, and manageable way to verify identity and enforce permissions across the platform.
