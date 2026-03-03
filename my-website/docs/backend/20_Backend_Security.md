---
slug: /backend/security
title: Backend Security
---

# Backend Security: Protecting Your Application

Security is not just a feature; it is a fundamental mindset that every backend engineer must adopt. In this guide, we will explore the core principles of backend security, common vulnerabilities, and how to defend against them.

## 1. The Security Mindset: Thinking in Boundaries

Every security vulnerability arises when data crosses a boundary—between systems, privilege levels, or programming languages. To build secure systems, you must always ask:
- Where is data crossing a boundary?
- What assumptions am I making about this data?
- What if those assumptions are wrong?

## 2. Injection Attacks

Injection attacks happen when your system confuses **data** with **code**.

### SQL Injection
The classic SQL injection occurs when user input is directly concatenated into a query string.
- **Example**: `SELECT * FROM users WHERE email = '` + user_input + `'`
- **The Fix**: Use **parameterized queries**. Database drivers treat the input as a literal value rather than part of the SQL command.

### Command Injection
This happens when you pass user input to an operating system command (e.g., resizing an image using a CLI tool like FFmpeg).
- **The Danger**: An attacker could inject symbols like `;`, `|`, or `&` to execute malicious commands like `rm -rf /`.
- **The Fix**: Use APIs provided by your language (e.g., `execFile` in Node.js) that take arguments as an array, preventing the shell from interpreting them as code.

### NoSQL Injection
Even if you don't use SQL, vulnerabilities exist. In MongoDB, an attacker might pass a JSON object instead of a string (e.g., using `$ne: ""` to bypass authentication).
- **The Fix**: Strictly validate the type of input you expect.

## 3. Authentication & Password Storage

Authentication is the process of verifying a user's identity.

### Password Storage Best Practices
Never store passwords in plain text.
1. **Hashing**: Use a one-way hashing function.
2. **Salting**: Add a unique, random string (salt) to each password before hashing to prevent **Rainbow Table** attacks.
3. **Slow Hashing**: Modern GPUs can compute billions of SHA-256 hashes per second. Use "slow" functions like **bcrypt**, **scrypt**, or **Argon2 ID** to make brute-force attacks computationally expensive.

### Authentication Strategies
- **O-Providers**: Using services like Clerk, Auth0, or Supabase Auth is often safer than building your own. They handle complex flows, social logins, and edge cases.
- **Stateful Sessions**: Storing a session ID in a database/Redis and a cookie.
- **Stateless (JWT)**: JSON Web Tokens contain claims and a signature. They are scalable but difficult to revoke immediately.

### Cookie Security
If using cookies, always set these flags:
- `HttpOnly`: Prevents JavaScript from reading the cookie (mitigates XSS).
- `Secure`: Ensures the cookie is only sent over HTTPS.
- `SameSite`: Set to `Lax` or `Strict` to prevent CSRF attacks.

## 4. Authorization: Horizontal vs. Vertical

Authorization determines what an authenticated user is allowed to do.

### BOLA (Broken Object Level Authorization)
Also known as IDOR (Insecure Direct Object Reference). This occurs when a user can access another user's data by guessing an ID.
- **The Fix**: Always check ownership in the database query. Instead of `SELECT * FROM invoices WHERE id = ?`, use `SELECT * FROM invoices WHERE id = ? AND user_id = ?`.

### BFLA (Broken Function Level Authorization)
This happens when a regular user accesses admin-only functions.
- **The Fix**: Implement role-based access control (RBAC) and verify the user's role at every sensitive entry point.

### The "404 vs 403" Principle
If a user tries to access a resource that belongs to someone else, returning `403 Forbidden` confirms the resource exists. Returning `404 Not Found` prevents this information leakage.

## 5. Cross-Site Scripting (XSS)

XSS occurs when an attacker executes malicious JavaScript in a user's browser.
- **Stored XSS**: Malicious script is saved in your database (e.g., a comment) and executed for everyone who views it.
- **Reflected XSS**: The script is part of a URL or form submission.
- **The Fix**: Always **sanitize** user-provided content. Use libraries that strip out `<script>` tags and other dangerous elements before rendering or storing data.

## 6. Rate Limiting

Rate limiting protects your server from brute-force attacks and DDoS attempts. Implement it at multiple layers:
1. **Per IP**: Limit requests from a single source.
2. **Per Account**: Lock accounts after multiple failed login attempts.
3. **Global**: Limit total traffic to sensitive endpoints (like `/login`).

## 7. Configuration & Secrets

### Secrets Management
Never commit API keys, database passwords, or secrets to your version control (Git). Use environment variables (`.env` files) or managed secret stores (AWS Parameter Store, Vault).

### Debug Mode
Ensure debug logging and stack traces are disabled in production. Leaking internal file paths or server details provides a roadmap for attackers.

## 8. Summary: Layers of Defense

Security should be implemented in layers:
1. **Input Validation**: Your first line of defense.
2. **Parameterized Operations**: Separate data from code.
3. **Point of Access Checks**: Authorize at the repository layer.
4. **Monitoring & Logging**: Track suspicious activity and audit logs.

### Recommended Resources
- [PortSwigger Academy](https://portswigger.net/web-security) (Excellent free labs)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) (The industry standard for vulnerability tracking)
