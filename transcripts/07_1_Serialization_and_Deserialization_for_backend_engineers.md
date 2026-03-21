# Serialization Deep Dive for System Design (Interview + Real World)

---

## 1. JSON vs Protobuf (When to Use What)

### JSON (Text-Based)

* Human-readable format
* Used in:

  * REST APIs
  * Web apps
  * Debugging/logging

### Pros

* Easy to read & debug
* Native support in browsers (JavaScript)
* No schema required

### Cons

* Large payload size
* Slower parsing (string → object)
* Inefficient over network

---

### Protobuf (Binary Format)

* Developed by Google
* Uses **schema (.proto file)**

### Example

```proto id="proto1"
message User {
  int32 id = 1;
  string name = 2;
}
```

---

### Pros

* Compact (smaller size)
* Faster serialization/deserialization
* Strong typing (schema enforced)

### Cons

* Not human-readable
* Requires schema management
* Harder debugging

---

## Key Comparison

| Feature     | JSON        | Protobuf         |
| ----------- | ----------- | ---------------- |
| Readability | High        | None             |
| Size        | Large       | Small            |
| Speed       | Slower      | Faster           |
| Schema      | Optional    | Required         |
| Use Case    | Public APIs | Internal systems |

---

## When to Use

### Use JSON when:

* Building REST APIs
* Working with frontend (React, browser)
* Debugging is important

---

### Use Protobuf when:

* Internal microservices communication
* High-performance systems (trading, backend infra)
* Network cost matters

---

## Interview Insight 🔥

* **“JSON for external, Protobuf for internal”**
* This is a very strong practical answer

---

# 2. Why gRPC is Faster than REST

---

## REST (Typical Flow)

* Uses:

  * HTTP/1.1
  * JSON

### Problems

* Text-based payload → larger size
* Repeated headers
* New connection per request (mostly)

---

## gRPC (Modern Approach)

* Uses:

  * HTTP/2
  * Protobuf

---

## Why gRPC is Faster

### 1. Binary Serialization

* Protobuf vs JSON
* Smaller payload → faster transfer

---

### 2. HTTP/2 Multiplexing

* Multiple requests on same connection
* No repeated connection overhead

---

### 3. Header Compression

* HTTP/2 compresses headers
* Saves bandwidth

---

### 4. Streaming Support

* Bidirectional streaming
* No request-response limitation

---

## Example Comparison

| Feature   | REST     | gRPC     |
| --------- | -------- | -------- |
| Protocol  | HTTP/1.1 | HTTP/2   |
| Format    | JSON     | Protobuf |
| Speed     | Moderate | High     |
| Streaming | Limited  | Native   |

---

## Real Insight

* REST = **simplicity + compatibility**
* gRPC = **performance + efficiency**

---

## Interview One-Liner 🔥

* “gRPC is faster because it uses binary serialization (Protobuf) and HTTP/2 multiplexing.”

---

# 3. How Serialization Affects Latency (Very Important for YOU)

---

## Where Serialization Adds Latency

### End-to-End Flow

```id="flow1"
Client → Serialize → Network → Deserialize → Process → Serialize → Network → Deserialize
```

---

## Latency Components

### 1. Serialization Cost

* JSON stringify (client)
* JSON parsing (server)

---

### 2. Payload Size

* Larger JSON → slower network transfer

---

### 3. Deserialization Cost

* CPU work to parse string → object

---

## Example (Realistic)

| Step             | JSON Time |
| ---------------- | --------- |
| Serialize        | 2–5 ms    |
| Network transfer | 50–100 ms |
| Deserialize      | 5–10 ms   |

---

## Why Protobuf Helps

* Smaller size → faster network
* Faster parsing → less CPU

---

## Impact on High-Performance Systems

* Trading systems (like yours):

  * Even **5–10 ms matters**
* JSON overhead becomes significant

---

## Your Case (C++ vs Go: 200ms vs 14ms)

Based on your earlier problem:

### Likely causes:

* External API call (major factor)
* Logging (sync → blocking)
* Serialization overhead (JSON parsing)

---

## Hidden Serialization Problems

### 1. Large Payloads

* Big JSON → slow parsing

---

### 2. Deeply Nested JSON

* Recursive parsing cost

---

### 3. Repeated Serialization

* Logging + API + WebSocket = multiple conversions

---

## Optimization Tips 🔥

### 1. Use Binary Protocol (if needed)

* Protobuf / FlatBuffers

---

### 2. Reduce Payload Size

* Send only required fields

---

### 3. Avoid Repeated Serialization

* Cache serialized data

---

### 4. Use Faster JSON Libraries

* C++:

  * simdjson
  * rapidjson

---

### 5. Async Everything

* Logging (very important for you)
* External API calls

---

## Key Insight (VERY IMPORTANT)

* Serialization is:

  * CPU-bound
* Network is:

  * IO-bound

👉 Together they define your latency

---

# Final Interview Summary 🔥

If asked:

### Q: JSON vs Protobuf?

* “JSON is human-readable and used for public APIs, while Protobuf is binary, faster, and used for internal high-performance communication.”

---

### Q: Why gRPC faster than REST?

* “Because it uses Protobuf and HTTP/2 multiplexing, reducing payload size and connection overhead.”

---

### Q: How serialization affects performance?

* “Serialization adds CPU overhead and increases payload size, which directly impacts latency, especially in high-throughput systems.”

---

## Bonus (For YOU specifically)

Your system (Deribit / trading style):

* Move toward:

  * Protobuf or FlatBuffers
  * Async logging
  * Avoid blocking IO

