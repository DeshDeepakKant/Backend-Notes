# Authentication & Authorization — Detailed Learning Notes

---

## 1. Introduction to Authentication & Authorization

* Authentication and authorization are core concepts in backend systems 
* These concepts are encountered daily (login/signup flows)

### Authentication

* Definition:

  * Mechanism to assign identity to a subject
* Answers:

  * **“Who are you?”**
* Context-dependent:

  * Platform, OS, system, application

---

### Authorization

* Definition:

  * Determines permissions/capabilities of a user
* Answers:

  * **“What can you do?”**
* Includes:

  * Roles, permissions, capabilities

---

## 2. Historical Evolution of Authentication

---

### 2.1 Pre-Industrial Era (Implicit Authentication)

* Authentication based on **human trust**
* Identity = recognition by others
* Examples:

  * Village elder vouching
  * Handshake agreements

#### Key Characteristics

* Implicit authentication
* Based on:

  * Social trust
  * Human relationships

#### Limitation

* Not scalable across:

  * Large populations
  * Different regions

---

### 2.2 Medieval Era (Seals & Tokens)

* Introduction of **explicit authentication**
* Use of:

  * Wax seals on documents

#### Properties

* Early **authentication tokens**
* Based on:

  * **Something you have**

#### Problems

* Forgery possible
* First examples of:

  * Authentication bypass attacks

---

### 2.3 Industrial Era (Passphrases & Shared Secrets)

* Trigger:

  * Growth in communication systems (telegraph)

#### Mechanism

* Use of:

  * Pre-agreed passphrases

#### Principle Shift

* From:

  * Something you have
* To:

  * **Something you know**

---

### 2.4 Early Computing Era (Passwords)

* Time: 1960s (MIT CTSS system)

#### Features

* Multi-user systems introduced passwords
* Stored in **plain text initially**

#### Major Incident

* Password file printed → exposed vulnerability

#### Outcome

* Led to:

  * Secure password storage
  * Introduction of **hashing**

---

### 2.5 Hashing & Security Principles

* Hashing:

  * Converts plaintext → fixed-length irreversible string

#### Properties

* Same input → same hash
* Fixed output length
* One-way function

#### Security Alignment

* CIA Triad:

  * Confidentiality
  * Integrity
  * Availability

---

### 2.6 Cryptographic Era (1970s)

* Key development:

  * **Diffie-Hellman key exchange**

#### Concepts

* Asymmetric cryptography
* Public-key infrastructure (PKI)

#### Impact

* Enabled:

  * Secure communication over untrusted channels

---

### 2.7 Kerberos (Ticket-Based Auth)

* Introduced:

  * Trusted third-party authentication

#### Mechanism

* Uses:

  * Tickets to verify identity

#### Importance

* Precursor to:

  * Token-based authentication

---

### 2.8 1990s (Multi-Factor Authentication)

* Need:

  * Stronger security vs brute force attacks

#### MFA Components

* Something you know → password
* Something you have → OTP/device
* Something you are → biometrics

#### Issues

* False positives/negatives
* Biometric template security

---

### 2.9 Modern Era (21st Century)

#### Drivers

* Cloud computing
* Mobile apps
* API architectures

#### Technologies

* OAuth 2.0
* JWT
* Zero Trust
* Passwordless (WebAuthn)

---

### 2.10 Future Trends

* Decentralized identity (blockchain)
* Behavioral biometrics
* Post-quantum cryptography

---

## 3. Core Components of Authentication Systems

---

### 3.1 Sessions

#### Problem

* HTTP is **stateless**:

  * No memory of previous requests

#### Need

* Maintain user continuity:

  * Login state
  * Cart items

---

### Session Workflow

1. User logs in
2. Server creates **session ID**
3. Stores:

   * Session ID + user data (DB/Redis)
4. Sends session ID as cookie
5. Client sends cookie in every request

---

### Session Storage Evolution

* File-based → not scalable
* Database-based → persistent
* Distributed stores:

  * Redis (in-memory, fast)

---

### Key Features

* Stateful
* Server-side storage
* Expiration-based

---

## 3.2 JWT (JSON Web Token)

---

### Why JWT Emerged

* Problems with sessions:

  * Memory overhead
  * Synchronization across servers
  * Latency in distributed systems

---

### JWT Properties

* Stateless
* Self-contained token

---

### Structure of JWT

1. **Header**

   * Metadata (algorithm)

2. **Payload**

   * User data:

     * sub → user ID
     * iat → issued at
     * name, role

3. **Signature**

   * Verifies integrity

---

### Advantages

* Stateless → no DB lookup
* Scalable (microservices)
* Portable (can pass across systems)

---

### Disadvantages

* Token theft → impersonation
* No easy revocation
* Cannot invalidate before expiry

---

### Hybrid Approach

* Combine:

  * JWT + blacklist (DB/Redis)

#### Tradeoff

* Loses stateless advantage

---

### Industry Practice

* Prefer using:

  * Auth providers (Auth0, Clerk)

---

## 3.3 Cookies

---

### Definition

* Mechanism to store data in browser

---

### Properties

* Set by server
* Sent automatically with requests
* Domain-restricted

---

### Usage in Auth

* Store:

  * Session ID or JWT

---

### Workflow

1. Server authenticates user
2. Sets cookie
3. Browser sends cookie in every request
4. Server validates

---

## 4. Types of Authentication

---

### 4.1 Stateful Authentication

---

### Flow

1. Client sends credentials
2. Server validates
3. Creates session
4. Stores in Redis/DB
5. Sends session ID in cookie

---

### Pros

* Centralized control
* Easy revocation
* Real-time session tracking

---

### Cons

* Scalability issues
* Distributed sync complexity

---

### 4.2 Stateless Authentication (JWT)

---

### Flow

1. Client sends credentials
2. Server generates JWT
3. Client stores token
4. Sends token in header
5. Server verifies signature

---

### Pros

* Scalable
* No storage dependency
* Good for distributed systems

---

### Cons

* Hard to revoke
* Security risk if stolen

---

### Hybrid Strategy

* Stateful → web apps
* Stateless → APIs/mobile

---

### 4.3 API Key Authentication

---

### Use Case

* Machine-to-machine communication

---

### Workflow

1. Generate API key
2. Attach key in request
3. Server validates

---

### Characteristics

* Simple
* No login flow
* Programmatic access

---

### Example

* OpenAI API usage

---

### Advantages

* Easy to use
* Ideal for backend integrations

---

### 4.4 OAuth (Authorization)

---

### Problem Solved

* Delegation:

  * One platform accessing another’s data

---

### Bad Old Solution

* Password sharing → insecure

---

### OAuth Solution

* Use **tokens instead of passwords**

---

### Key Roles

* Resource Owner → user
* Client → app requesting access
* Resource Server → data holder
* Authorization Server → issues tokens

---

### OAuth Flow

1. Redirect to auth server
2. User logs in + grants permission
3. Token issued
4. Client accesses resources

---

### OAuth 2.0 Improvements

* Simpler implementation
* Bearer tokens
* Multiple flows:

  * Authorization code
  * Implicit (deprecated)
  * Client credentials
  * Device flow

---

## 4.5 OpenID Connect (OIDC)

---

### Problem

* OAuth handles authorization, not authentication

---

### Solution

* Adds **authentication layer**

---

### Key Feature

* ID Token (JWT)

---

### Data in ID Token

* User identity
* Email
* Profile

---

### Example

* “Sign in with Google”

---

### Flow

1. Redirect to provider
2. User logs in
3. Authorization code + ID token returned
4. Access token used for resource access

---

## 5. When to Use What

---

### Stateful Auth

* Web apps
* Session-heavy systems

---

### Stateless Auth

* APIs
* Distributed systems

---

### OAuth

* Third-party login
* Delegation use cases

---

### API Keys

* Server-to-server communication

---

## 6. Authorization

---

### Definition

* Determines user permissions

---

### Problem Example

* Different users need different access levels

---

## 6.1 RBAC (Role-Based Access Control)

---

### Concept

* Assign roles → assign permissions

---

### Example Roles

* User → read
* Admin → read/write/delete
* Moderator → limited access

---

### Workflow

1. User authenticated
2. Role determined
3. Middleware checks permissions
4. Allow/deny request

---

### Response

* Unauthorized → 401
* Forbidden → 403

---

## 7. Security Best Practices

---

### 7.1 Error Messages

#### Problem

* Detailed errors help attackers

#### Example

* “User not found”
* “Incorrect password”

#### Solution

* Always return:

  * **“Authentication failed”**

---

### 7.2 Timing Attacks

---

### Problem

* Different response times reveal info

#### Example

* Username invalid → fast
* Password wrong → slower

---

### Solution

* Constant-time comparisons
* Artificial delay

---

## 8. Final Key Takeaways

---

* Authentication = identity (who)
* Authorization = permissions (what)
* Sessions = stateful
* JWT = stateless
* OAuth = delegation
* OIDC = authentication layer on OAuth
* API keys = machine communication
* RBAC = standard authorization model

