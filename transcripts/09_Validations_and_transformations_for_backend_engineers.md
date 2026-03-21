# API Validations & Transformations — Detailed Learning Notes

---

## 1. Overview

* Validations and transformations ensure:

  * **Data integrity**
  * **Security**
* Applied during API design as a set of **rules/guidelines** 

---

## 2. Backend Architecture Context

---

### Typical Layers

#### Repository Layer

* Handles:

  * Database connections
  * Queries (insert, delete, update)
* Works with:

  * SQL DBs, Redis, etc.

---

#### Service Layer

* Contains:

  * Business logic
* Examples:

  * Calling repository methods
  * Sending emails
  * Webhooks
  * Notifications

---

#### Controller Layer

* Handles:

  * HTTP logic
  * Input/output formatting
  * Status codes
* Calls:

  * Service layer methods

---

### Key Idea

* Separation of concerns:

  * Controller → HTTP + validation
  * Service → business logic
  * Repository → data

---

## 3. Where Validations & Transformations Happen

---

### Execution Flow

1. Request arrives
2. Route matched
3. **Validation & transformation pipeline runs**
4. Controller logic executes
5. Service layer called

---

### Critical Placement

* Validations occur:

  * **Before any business logic**
  * **At entry point (controller layer)**

---

## 4. Purpose of Validation

---

### Core Idea

* Ensure incoming data:

  * Matches expected format
  * Prevents unexpected states

---

### Example Requirement

```json
{
  "name": "string (5–100 chars)"
}
```

---

### Validation Steps

* Check:

  * Field existence
  * Data type
  * Value constraints

---

### Example Checks

* Field `name` exists
* Type = string
* Length between 5–100

---

## 5. Why Validation is Important

---

### Without Validation

* Invalid data reaches:

  * Service → Repository → Database

#### Example

* API expects string
* Client sends number

---

### Result

* Database rejects query
* Server returns:

  * **500 Internal Server Error**

---

### Problem

* Bad user experience
* Hard to debug

---

### With Validation

* Server returns:

  * **400 Bad Request**
* Clear error:

  * “Invalid input format”

---

## 6. Types of Validations

---

### 6.1 Syntactic Validation

---

#### Definition

* Validates **structure/format of data**

---

#### Examples

* Email format:

  * `name@domain.com`
* Phone number:

  * Country code + digits
* Date format:

  * `YYYY-MM-DD`

---

### Key Idea

* Checks pattern, not meaning

---

### 6.2 Semantic Validation

---

#### Definition

* Checks whether data **makes logical sense**

---

#### Examples

* Date of birth:

  * Cannot be in future
* Age:

  * Cannot be 365

---

### Key Idea

* Validates meaning/context

---

### 6.3 Type Validation

---

#### Definition

* Ensures correct **data types**

---

#### Examples

* String field → must be string
* Number field → must be number
* Array field → must be array
* Boolean → true/false

---

### Nested Validation

* Array elements can have:

  * Their own constraints

---

## 7. Complex Validation Rules

---

### Cross-field Validation

* Example:

  * `password` == `confirmPassword`

---

### Conditional Validation

* Example:

  * If `married = true` → `partner` required

---

### Key Insight

* Validation can depend on:

  * Multiple fields
  * Business logic

---

## 8. Transformation

---

### Definition

* Process of:

  * Converting input data into required format

---

### Why Needed

* Client data may not match server expectations

---

### Example: Query Parameters

---

#### Input

```
?page=2&limit=20
```

* Received as:

  * Strings

---

#### Problem

* Validation expects numbers

---

#### Solution

* Transform:

  * `"2"` → `2`
  * `"20"` → `20`

---

### Transformation Types

---

#### Before Validation

* Convert types:

  * string → number

---

#### After Validation

* Normalize data:

  * Email → lowercase
  * Phone → add `+` prefix
  * Date → standardized format

---

### Example Transformations

* `"TeSt@Gmail.com"` → `"test@gmail.com"`
* `"123456"` → `"+123456"`

---

## 9. Validation + Transformation Pipeline

---

### Combined Approach

* Both happen in:

  * **Single pipeline**

---

### Benefits

* Centralized logic
* Easier maintenance
* Clear API requirements

---

## 10. API Validation Examples

---

### Example 1: Syntactic

* Required:

  * email
  * phone
  * date

---

### Example 2: Semantic

* DOB must not be future
* Age must be ≤ 120

---

### Example 3: Complex

* Password length ≥ 8
* Password = confirm password
* Conditional fields (partner)

---

### Example 4: Type

* stringField → string
* numberField → number
* arrayField → array of strings
* booleanField → boolean

---

## 11. Frontend vs Backend Validation

---

### Frontend Validation

* Purpose:

  * **User Experience (UX)**
* Provides:

  * Immediate feedback

---

### Backend Validation

* Purpose:

  * **Security**
  * **Data integrity**

---

### Important Rule

* Never rely on frontend validation

---

### Why?

* Multiple clients:

  * Web apps
  * Postman / Insomnia
  * Mobile apps

---

### Risk

* Without backend validation:

  * Server can break
  * Invalid data enters system

---

## 12. Combined Workflow

---

### Flow

1. User enters data
2. Frontend validates (UX)
3. API request sent
4. Backend validates (security)
5. Response returned

---

### Example

* Frontend blocks invalid email
* Backend still validates email

---

## 13. Key Principles

---

* Validate **everything at entry point**
* Never trust client input
* Use:

  * Syntactic + Semantic + Type validation
* Transform data for consistency
* Keep validation logic centralized

---

## 14. Final Takeaways

---

* Validation ensures:

  * Correct structure
  * Logical correctness
  * Data safety

* Transformation ensures:

  * Data usability

* Backend validation is:

  * Mandatory

* Frontend validation is:

  * Optional (UX only)

