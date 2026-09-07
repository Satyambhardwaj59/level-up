# 📅 Challenge Progress

| Day | Topic | Status |
|:---:|------------------------------|:------:|
| **MongoDB** | | |
| 61 | MongoDB Fundamentals | ✅ |
| 62 | MongoDB Indexes & Query Optimization | ✅ |
| 63 | MongoDB Aggregation Pipeline | ✅ |
| 64 | MongoDB + Mongoose: Schema Design & Relationships | ✅ |
| 65 | MongoDB Transactions, Atomicity & Concurrency | ✅ |

---


# Day 62 — MongoDB Performance & Indexing

## 🎯 Objective

The goal of Day 62 was to understand MongoDB performance optimization using:

- Large datasets
- Indexes
- Query optimization
- explain("executionStats")
- Execution statistics
- Before/after performance comparison

---


# 🚀 Day 63 — MongoDB Aggregation Framework

## 🎯 Objective

Build advanced MongoDB aggregation pipelines using a 100,000+ product dataset.

Topics covered:

- $match
- $group
- $sort
- $limit
- $project
- $unwind
- $bucket
- $lookup
- $facet
- Aggregation pipelines

---


# 🚀 Day 64 — MongoDB Schema Design with Mongoose

## 🎯 Objective

Design a production-style e-commerce database using Mongoose.

Topics:

- Mongoose schemas
- Embedded documents
- Referenced documents
- ObjectId
- `ref`
- `populate()`
- Historical snapshots
- Schema validation
- Indexes
- One-to-many relationships

---

# Day 65 — MongoDB Transactions & Concurrency

## 🎯 Objective

Learn how MongoDB transactions maintain consistency when
multiple collections must be updated together.

---

## 📚 Topics

- MongoDB Transactions
- Mongoose Sessions
- `withTransaction()`
- Commit
- Rollback
- Atomic Updates
- `$inc`
- `$gte`
- Inventory Management
- Race Conditions
- Concurrent Requests
- Preventing Overselling
- Historical Order Prices

---

## 🏗️ Architecture

```text
POST /api/orders
        |
        v
Controller
        |
        v
Order Service
        |
        v
MongoDB Transaction
        |
        +---- Validate User
        |
        +---- Check Products
        |
        +---- Check Inventory
        |
        +---- Create Order
        |
        +---- Decrease Stock
        |
        +---- Create Payment
        |
        v
     COMMIT


# 📂 Repository Structure

```text
MongoDB/

├── Day-61/
├── Day-62/
├── Day-63/
├── Day-64/
├── Day-65/
├── Day-66/
└── readme.md

```

--- 