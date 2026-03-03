# Mastering Databases with PostgreSQL

Databases are the foundation of any backend system. Understanding how to model, query, and optimize data storage is critical for building scalable applications.

---

## 1. Why Databases?
The primary role of a database is **Persistence**—ensuring data survives even after a program stops. While local storage or text files work for simple needs, professional backend systems require a **Database Management System (DBMS)** to handle:
- **Efficiency**: Fast data retrieval at scale.
- **Structure**: Enforcing data types and relationships.
- **Concurrency**: Handling multiple users updating the same data simultaneously.
- **Integrity**: Ensuring data accuracy and validity.

---

## 2. Choosing the Right Tool: Relational vs. Non-Relational

### Relational (SQL) - e.g., PostgreSQL
Organizes data into predefined tables, rows, and columns. 
- **Pros**: Strong data integrity, complex relationship handling, strict schema.
- **Use Case**: CRM systems, financial applications, structured data.

### Non-Relational (NoSQL) - e.g., MongoDB
Uses flexible, document-based storage.
- **Pros**: Dynamic schema, fast prototyping, horizontal scaling.
- **Use Case**: Content Management Systems (CMS), logging, real-time analytics.

> [!TIP]
> **Why Postgres is the Industry Leader**: It offers the best of both worlds. While it is a relational database, its advanced **JSONB** support allows you to store and query dynamic data as efficiently as a NoSQL database.

---

## 3. Core PostgreSQL Data Types

| Type | Description | Best Practice |
| :--- | :--- | :--- |
| **Serial / BigSerial** | Auto-incrementing integers. | Use `BigSerial` for primary keys in production. |
| **Decimal / Numeric** | Fixed-point numbers with high precision. | Always use for **Price** or financial data. |
| **Float / Real** | Floating-point numbers (faster but less precise). | Use for scientific data where slight errors don't matter. |
| **Text** | Variable length string. | Preferred over `VarChar(255)` in Postgres (no performance difference). |
| **UUID** | Universally Unique Identifier. | Excellent for public-facing IDs to avoid ID guessing. |
| **JSONB** | Binary JSON storage. | Use for semi-structured or dynamic data fields. |
| **Timestamptz** | Timestamp with time zone. | Always store time in UTC with time zone awareness. |

---

## 4. Database Modeling & Relationships

### 1:1 (One-to-One)
A user has exactly one profile. 
- **Implementation**: The secondary table (`user_profiles`) uses the primary table's ID (`user_id`) as its own Primary Key.

### 1:N (One-to-Many)
A project has many tasks. 
- **Implementation**: The `tasks` table includes a `project_id` foreign key.

### N:N (Many-to-Many)
A user can join many projects, and a project has many users.
- **Implementation**: Use a **Linking Table** (e.g., `project_members`) with a composite primary key consisting of `project_id` and `user_id`.

---

## 5. Advanced Database Features

### Referential Integrity (Foreign Keys)
- **RESTRICT**: Prevents deleting a parent record (User) if child records (Projects) exist.
- **CASCADE**: Automatically deletes all associated child records when a parent is deleted.

### Database Migrations
Treat your database schema as code. Use migration tools (like `db-mate` or `golang-migrate`) to track changes (Up/Down) in your Version Control System (Git).

### Triggers
Automate repetitive tasks at the database level.
- **Example**: Create a trigger to automatically update the `updated_at` column whenever a row is modified.

### Indexing for Performance
An index is a "lookup table" that allows the database to find rows without scanning every entry.
- **When to Index**:
  1. Fields used in `JOIN` conditions.
  2. Fields used in `WHERE` clauses (filters).
  3. Fields used in `ORDER BY` clauses (sorting).

---

## 6. Secure & Efficient Querying

### Parameterized Queries
**Never** concatenate user input directly into SQL strings. This prevents **SQL Injection** attacks.
- **Incorrect**: `SELECT * FROM users WHERE name = '` + userInput + `'`
- **Correct**: `SELECT * FROM users WHERE name = $1` (Using slots/parameters).

### Pagination & Sorting
Always implement pagination for list APIs to prevent overloading the server.
- **Pattern**: Use `LIMIT` and `OFFSET` (or cursor-based pagination) combined with a mandatory `ORDER BY` clause.

## Summary
A professional backend engineer doesn't just write queries; they design systems that ensure data integrity and performance. Stick to Postgres, leverage its strong typing and indexing, and always use migrations to manage your schema changes.
