# Full-Text Search & Elasticsearch – Structured Notes

## Problem with Traditional Search (Relational Databases)

* Basic search query:

  * `SELECT * FROM products WHERE name ILIKE '%laptop%'`
* Uses:

  * Pattern matching (`%term%`)
  * Case-insensitive search (`ILIKE`)

### Limitations

* **Slow at scale**

  * Small data (5K rows): ~50 ms
  * Large data (millions): seconds (e.g., 30s)

* **Full table scan**

  * Database checks:

    * Every row
    * Every text field
    * Character-by-character

* **No relevance ranking**

  * Results returned:

    * In arbitrary order
    * No prioritization of best matches

* **No typo tolerance**

  * Query must match exactly
  * Fails for:

    * Misspellings (e.g., "laptpo")

---

# Motivation for Search Engines

## New Requirements

* Faster results → **milliseconds latency**
* Smarter results → **relevance-based ranking**
* Robust search → **handle typos**

### Real-World Pressure

* Large-scale systems:

  * Millions of products (Amazon)
  * Billions of pages (Google)
* Users expect:

  * Instant results
  * Accurate ranking

---

# Analogy: Database as a Librarian

## Traditional Database

* Works like a librarian who:

  * Searches every book manually
  * One-by-one scanning

### Problems

* Very slow for large libraries
* No concept of:

  * Importance
  * Relevance

---

# Key Idea: Inverted Index

## Concept

* Instead of:

  * Searching documents → find words

* We:

  * Index words → map to documents

### Definition

* **Inverted Index**:

  * A data structure mapping:

    * Word → list of documents containing it

---

## Example Structure

* `machine → [Book A (pages 1,15,23), Book B (page 5)]`
* `learning → [Book A, Book C, Book D]`

### Key Insight

* Search becomes:

  * Direct lookup instead of scanning everything

---

# Benefits of Inverted Index

## 1. Speed

* No full scan
* Direct access via word lookup

## 2. Efficiency

* Avoids:

  * Checking every document
  * Repeated computation

---

# Relevance Scoring

## Problem Solved

* Not all matches are equally useful

## Solution

* Assign **scores to results**

---

## Factors Affecting Relevance

### 1. Term Frequency (TF)

* How often term appears in a document

---

### 2. Document Frequency (DF)

* How common the term is across all documents

---

### 3. Document Length

* Shorter documents:

  * May carry higher weight

---

### 4. Field Boosting

* Importance varies by field:

  * Title > Description > Content

---

## Algorithm Used

* **BM25 Algorithm**

  * Combines:

    * TF
    * DF
    * Field weights
    * Document length

---

# Elasticsearch

## What It Is

* A **full-text search engine**
* Built on:

  * **Apache Lucene**

---

## Key Features

* Fast search (milliseconds)
* Relevance-based ranking
* Typo tolerance
* Flexible query system (JSON-based DSL)

---

# Typo Tolerance

## Example

* Query:

  * `"treading"` → interpreted as `"trending"`

### Benefit

* Handles:

  * Misspellings
  * User mistakes

---

# Use Cases of Elasticsearch

## 1. Product Search

* E-commerce platforms

---

## 2. Typeahead / Autocomplete

* Real-time suggestions while typing

---

## 3. Log Management

* ELK Stack:

  * Elasticsearch
  * Logstash
  * Kibana

---

## 4. Analytics & Search

* Fast querying over large datasets

---

# Comparison: SQL vs Elasticsearch

## SQL Search

* Uses:

  * `ILIKE '%term%'`
* Characteristics:

  * Full scan
  * Slow
  * No ranking

---

## Elasticsearch Search

* Uses:

  * Inverted index
  * Scoring algorithms

* Characteristics:

  * Fast (ms)
  * Ranked results
  * Handles typos

---

# Demo Insights

## Dataset

* 50,000 records

---

## Performance Comparison

* Elasticsearch:

  * ~500 ms – 1 sec

* PostgreSQL:

  * ~3 sec – 7 sec

---

## Key Observation

* Same results:

  * Elasticsearch is significantly faster

---

# When to Use Elasticsearch

## Use It When

* You need:

  * Full-text search
  * Autocomplete
  * Typo tolerance
  * Ranking

---

## Alternatives

* PostgreSQL Full-Text Search:

  * Good for smaller scale
  * Simpler setups

---

# Practical Advice

## For Backend Engineers

* Master:

  * Databases (must-have)

* Learn:

  * Elasticsearch (tool-level understanding)

---

## Strategy

* Use Elasticsearch when:

  * Search is core feature

* Otherwise:

  * Stick to database

---

# Final Summary

## Core Idea

* Traditional DB:

  * Scan everything

* Inverted Index:

  * Direct lookup

---

## Why Elasticsearch Matters

* Enables:

  * Fast search
  * Smart ranking
  * Typo handling

---

## Key Takeaway

```text
Search systems become scalable only when we move from scanning data → indexing data.
```
