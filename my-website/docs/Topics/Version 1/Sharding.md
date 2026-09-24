**Sharding** means **splitting a huge database into smaller pieces (shards)** so that multiple machines can store and handle the data.

For the Web Crawler example, we may have **10 billion URLs**. Putting all of them into one database machine would be too much.

Instead:

```text
10 billion URLs
       ↓
 ┌─────┼─────┬─────┐
 ↓     ↓     ↓     ↓
Shard 1 Shard 2 Shard 3 ... Shard N
 2B     2B     2B
URLs    URLs   URLs
```

### How does it decide where a URL goes?

Usually using a **hash of the URL**:

```text
hash(URL) % number_of_shards
```

For example:

```text
google.com/a  → hash → Shard 2
google.com/b  → hash → Shard 5
amazon.com/x  → hash → Shard 1
```

So when you want to find a URL, you calculate its hash and know **which shard to look in**.

### Why do we need it here?

Because the crawler might have **10 billion URL records**. Sharding lets us:

* Store data across many machines
* Handle more requests in parallel
* Scale the database horizontally
* Avoid one database becoming a bottleneck

So when the notes say:

> **"The URL metadata DB should be sharded"**

it basically means:

**Don't put all 10 billion URLs into one database partition/machine; distribute them across multiple partitions/machines.** 
It means **using a DynamoDB Global Secondary Index (GSI) to quickly find whether a particular content hash already exists.**

Suppose your main DynamoDB table looks like:

| URL (Primary Key) | S3 HTML    | Content Hash |
| ----------------- | ---------- | ------------ |
| `site.com/a`      | `s3://...` | `abc123`     |
| `site.com/b`      | `s3://...` | `xyz789`     |
| `site.com/c`      | `s3://...` | `abc123`     |

The problem is: **When we crawl a new page, how do we quickly check whether its HTML content was already seen?**

We calculate:

```text
HTML → Hash → abc123
```

Then we want to ask DynamoDB:

```text
"Does hash = abc123 already exist?"
```

### Why a GSI?

Normally, DynamoDB's primary key is `URL`.

So DynamoDB is naturally good at:

```text
URL → record
```

But we want to search by:

```text
ContentHash → record
```

That's what the **GSI** gives us.

You create something like:

```text
Main Table
Primary Key: URL

        ↓
       GSI
        ↓
Partition Key: ContentHash
```

Then you can efficiently query:

```text
ContentHash = "abc123"
```

and get:

```text
URL = site.com/a
```

So the diagram:

```text
Hash → URL
```

basically means:

> **Use the content hash as the lookup key in a GSI, so we can quickly determine whether this content has already been crawled.** 

### Why is this useful?

Without the GSI, you'd potentially have to scan a huge table:

```text
10 billion records
       ↓
"Find hash abc123"
       ↓
😵 expensive
```

With the GSI:

```text
abc123
  ↓
GSI
  ↓
matching URL(s)
```

Much faster.

**One important distinction:** the main table is still organized by **URL**; the GSI is an additional index that lets you look up the same records by **ContentHash**.
Yes — **conceptually, you can think of a GSI as an additional index**, but in DynamoDB there’s an important distinction.

### Normal database index

In a traditional SQL database:

```sql
CREATE INDEX idx_hash
ON pages(content_hash);
```

You still have **one table**, and the index is an additional data structure that helps you query it.

```text
Pages table
    │
    ├── Primary index → URL
    │
    └── Secondary index → content_hash
```

### DynamoDB GSI

A **Global Secondary Index (GSI)** serves a very similar purpose:

```text
DynamoDB table
Primary key: URL

        ↓
       GSI
Partition key: content_hash
```

So you can query:

```text
content_hash = "abc123"
```

instead of only being able to efficiently query by `URL`.

### The important DynamoDB-specific difference

A GSI is **not just an in-place index structure like you might picture in PostgreSQL/MySQL**.

DynamoDB maintains the GSI as a **separate index structure that can have its own partitioning and capacity**, which is why it's called **Global** Secondary Index.

Think:

```text
                DynamoDB
                   │
          ┌────────┴────────┐
          ↓                 ↓
    Main Table             GSI
    PK = URL        PK = content_hash
          │                 │
          ↓                 ↓
   URL → record       hash → record
```

So for this crawler:

**Yes, your intuition is correct: it's essentially an additional index for looking up records by `content_hash`.** The reason the video specifically says **GSI** is because that's DynamoDB's mechanism for creating that alternate access pattern. 

Sure. In this context, **partitioning and capacity** are two separate ideas.

### 1. Partitioning = how the data is distributed

Imagine your DynamoDB table has **10 billion URLs**.

You don't want all 10 billion records sitting on one physical machine.

DynamoDB distributes them across multiple **partitions**:

```text id="u8w9nq"
10 billion URLs
       ↓
 ┌─────┼─────┬─────┐
 ↓     ↓     ↓     ↓
 P1    P2    P3    P4
 ↓     ↓     ↓     ↓
URLs  URLs  URLs  URLs
```

The **partition key** determines where a record goes.

For example:

```text id="2l0qtf"
URL = google.com/a
        ↓
   hash(URL)
        ↓
   Partition 2
```

So **partitioning = distributing data across multiple storage/processing partitions.**

---

### 2. Capacity = how much traffic a partition can handle

Now suppose thousands of crawlers are querying your database.

A partition doesn't have infinite resources. It has limits on things like:

* How many reads it can handle
* How many writes it can handle
* How much data it can store

So imagine:

```text id="h4bq0y"
Partition 1
──────────────
1000 requests/sec
```

If suddenly you send:

```text id="q6j2oe"
10,000 requests/sec
```

to that same partition, you've created a **hot partition** / bottleneck.

---

### Why this matters for the GSI

Remember our GSI:

```text id="x8w3dj"
Main Table:
PK = URL

GSI:
PK = content_hash
```

DynamoDB will distribute the GSI's data based on its **GSI partition key (`content_hash`)**.

So you want your partition key to have good distribution.

For example, this is potentially problematic:

```text id="j7b6s2"
GSI partition key = domain
```

If millions of URLs belong to:

```text id="qv5z4p"
google.com
```

you could concentrate lots of traffic/data around the same partition key.

A well-distributed key such as a content hash is generally much better:

```text id="xq8z1n"
abc123 → partition A
7f82aa → partition C
91bd72 → partition B
...
```

### In one sentence

**Partitioning = where the data goes.**

**Capacity = how much data/traffic those partitions can handle.**

And this is why I said a DynamoDB GSI can have its own **partitioning and capacity**: the GSI is maintained as its own distributed data structure rather than simply being a tiny lookup table sitting inside the main table.
