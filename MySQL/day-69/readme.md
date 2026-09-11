# Day 69 — E-Commerce Analytics Engine

## 🎯 Objective

Build a real-world E-Commerce Analytics Engine using SQL.

This project focuses on:

- Aggregation
- GROUP BY
- HAVING
- JOINs
- LEFT JOIN
- Subqueries
- CTEs
- Window Functions
- Ranking
- Running totals
- Revenue analysis
- Customer analytics
- Product analytics

---

## 📁 Project Structure

day-69/

├── README.md
├── schema.sql
├── seed.sql
├── analytics.sql
└── advanced-queries.sql

---

## 🗄️ Database Schema

users
categories
products
orders
order_items

Relationships:

users
  ↓
orders
  ↓
order_items
  ↓
products
  ↓
categories

---

## 🚀 Setup

### 1. Create database

Run:

source schema.sql

### 2. Insert data

Run:

source seed.sql

### 3. Run analytics

Run:

source analytics.sql

### 4. Run advanced queries

Run:

source advanced-queries.sql

---

## 🧠 Topics Practiced

### Aggregation

- COUNT
- SUM
- AVG
- GROUP BY
- HAVING

### Joins

- INNER JOIN
- LEFT JOIN
- Multi-table JOIN

### Advanced SQL

- Subqueries
- CTE
- COALESCE
- NULLIF

### Window Functions

- RANK()
- ROW_NUMBER()
- DENSE_RANK()
- SUM() OVER()
- PARTITION BY

---

## 🏆 Challenges

1. Total users
2. Total orders
3. Total revenue
4. Average order value
5. Highest-value order
6. Revenue per customer
7. Orders per customer
8. Revenue per category
9. Revenue per product
10. Quantity sold per product
11. Customers spending > ₹50,000
12. Customers with > 5 orders
13. Products selling > 1,000 units
14. Categories generating > ₹1 lakh
15. Customers with no orders
16. Products with no sales
17. Products above average price
18. Customers above average spending
19. Most expensive order per customer
20. Most recent order per customer
21. Rank customers by spending
22. Rank products inside categories
23. Top 3 products per category
24. Running revenue by date
25. Customer contribution to total revenue

---

## 💡 Key Learning

This project simulates the type of SQL analytics used in production
e-commerce applications, dashboards, reporting systems and interviews.

The major goal is not just writing SQL queries, but understanding
how to transform raw transactional data into meaningful business insights.