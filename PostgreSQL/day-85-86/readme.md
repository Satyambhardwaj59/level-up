# Day 86 — Production E-Commerce Platform

## Objective

Build a production-style e-commerce backend integrated with PostgreSQL.

The project combines:

- Relational database design
- PostgreSQL
- JSONB
- Arrays
- GIN indexes
- B-tree indexes
- Composite indexes
- Partial indexes
- SQL functions
- Triggers
- Audit logging
- Transactions
- Row-level locking
- Analytics
- Node.js
- Express
- Repository pattern
- Service layer
- Controller layer
- API validation
- Error handling
- Performance analysis


# Architecture

Client
  ↓
Node.js API
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
  ↓
Indexes / JSONB / Functions
  ↓
Transactions
  ↓
Audit


# Database

users
categories
products
inventory
orders
order_items
payments
audit_logs


# Backend Layers

Controller

Responsible for HTTP.

Service

Responsible for business logic.

Repository

Responsible for SQL and database interaction.

Database

Responsible for:

- constraints
- transactions
- locks
- indexes
- functions
- triggers
- audit


# Main API

GET /api/health

GET /api/users

GET /api/users/:id

POST /api/users

GET /api/products

GET /api/products/:id

POST /api/products/search/metadata

POST /api/orders/checkout

GET /api/orders/:id

GET /api/analytics/dashboard

GET /api/analytics/top-products


# Checkout

POST /api/orders/checkout

Request:

{
    "userId": 1,
    "productId": 1,
    "quantity": 2
}


Transaction:

BEGIN
 ↓
Lock inventory
 ↓
Check stock
 ↓
Read product
 ↓
Calculate total
 ↓
Create order
 ↓
Create order item
 ↓
Decrease inventory
 ↓
Create payment
 ↓
COMMIT


If anything fails:

ROLLBACK


# Concurrency

Inventory uses:

SELECT ... FOR UPDATE

This protects the critical inventory row from conflicting concurrent checkout operations.


# JSONB

Product metadata supports:

- brand
- RAM
- storage
- features
- arbitrary future attributes


# Indexing

B-tree:

- users
- orders
- products

GIN:

- JSONB
- tags
- regions

Composite:

- customer order history
- order filtering


# Audit

Products, orders and inventory generate:

INSERT
UPDATE
DELETE

audit records.


# Analytics

The platform supports:

- total revenue
- customer spending
- top products
- category revenue
- order status statistics
- daily revenue


# Running

## Database

Create:

CREATE DATABASE ecommerce;


Execute:

database/schema.sql
database/seed.sql
database/functions.sql
database/triggers.sql
database/audit.sql
database/indexes.sql
database/views.sql
database/jsonb.sql
database/analytics.sql


## Backend

cd backend

npm install

Create:

.env

Copy values from:

.env.example


Run:

npm run dev


API:

http://localhost:5000/api/health


# Testing

Database:

tests/database-tests.sql

Transaction:

tests/transaction-tests.sql

Concurrency:

tests/concurrency-tests.sql

API:

node tests/api-tests.js


# Learning Outcome

After completing this project, I should be able to explain:

1. PostgreSQL schema design
2. Normalization
3. Foreign keys
4. JSONB
5. Arrays
6. GIN indexes
7. B-tree indexes
8. Composite indexes
9. Partial indexes
10. EXPLAIN ANALYZE
11. SQL functions
12. Triggers
13. Audit systems
14. Transactions
15. Row-level locking
16. Race conditions
17. Repository pattern
18. Service layer
19. Controller layer
20. PostgreSQL + Node.js integration