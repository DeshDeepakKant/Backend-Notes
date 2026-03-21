# Serialization & Deserialization (Client–Server Communication)

---

## What Problem Are We Solving?

* Client (e.g., JavaScript frontend) and server (e.g., Rust backend) use:

  * Different programming languages
  * Different data types
* Question:

  * How do they **understand each other’s data**?

---

## Core Idea: Common Format

* Solution:

  * Define a **standard format** both client and server agree on
* Process:

  * Client converts its data → standard format
  * Server converts standard format → its own data structures
* This process is called:

  * **Serialization** (to standard)
  * **Deserialization** (from standard) 

---

## Definition

### Serialization

* Converting data → **common transferable format**
* Example:

  * JavaScript object → JSON

---

### Deserialization

* Converting data from common format → **language-specific structure**
* Example:

  * JSON → Rust struct / Python dict

---

## Simple Flow

1. Client creates data (JS object)
2. Serializes → JSON
3. Sends via HTTP
4. Server receives JSON
5. Deserializes → native object
6. Processes logic
7. Sends response (JSON again)
8. Client deserializes and renders UI

---

## Why Do We Need It?

* Language-agnostic communication
* Cross-platform compatibility
* Standardized data exchange

---

## Where It Happens in Network Stack

* Happens at **Application Layer**
* Lower layers:

  * Convert data into:

    * Packets
    * Bits (0/1)
* Important:

  * Backend engineers mostly care about:

    * **JSON level**
    * Not underlying network encoding 

---

## Common Serialization Formats

### 1. Text-Based Formats

* Human-readable

#### JSON (Most Popular)

* Used in ~80% of web APIs
* Lightweight
* Easy to parse

#### Others

* XML
* YAML

---

### 2. Binary Formats

* Compact & faster
* Not human-readable

#### Example

* Protobuf (Protocol Buffers)

---

## JSON (Focus Format)

### What is JSON?

* Stands for:

  * **JavaScript Object Notation**
* Language-independent
* Looks like JS object

---

## JSON Structure Rules

* Starts with `{}` (object)
* Keys:

  * Must be strings
  * Must be in double quotes
* Values can be:

  * String
  * Number
  * Boolean
  * Array
  * Nested object 

---

## Example JSON

```json
{
  "name": "Alice",
  "age": 25,
  "isStudent": false,
  "address": {
    "country": "India"
  }
}
```

---

## Key Properties of JSON

* Human-readable
* Lightweight
* Easy to debug
* Widely supported

---

## Real API Example

### Request (Client → Server)

```json
{
  "id": 1,
  "title": "Book",
  "author": "John"
}
```

* Sent via HTTP POST

---

### Response (Server → Client)

```json
{
  "books": [
    {
      "id": 1,
      "title": "Book",
      "author": "John"
    }
  ]
}
```

* Server processes and returns JSON

---

## Important Mental Model

* You can think:

```
Client Object → JSON → Network → JSON → Server Object
```

* Ignore:

  * TCP packets
  * Bit-level transmission

---

## Where Else JSON is Used

* API communication
* Config files
* Logging systems
* Data storage (sometimes)

---

## Key Takeaways

* Serialization = **convert to standard format**
* Deserialization = **convert from standard format**
* JSON = most widely used format
* Enables:

  * Cross-language communication
  * Distributed systems

---

## Final Summary

* Without serialization:

  * Systems cannot communicate reliably
* With serialization:

  * Data becomes:

    * Portable
    * Interoperable
    * Understandable across systems

