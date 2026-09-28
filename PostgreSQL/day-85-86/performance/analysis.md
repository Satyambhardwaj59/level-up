# Day 86 Performance Analysis

## Dataset

| Table | Rows |
|---|---:|
| users | 1,000 |
| categories | 5 |
| products | 10,000 |
| inventory | 10,000 |
| orders | 50,000 |
| order_items | 100,000 |
| payments | 50,000 |


---

# Experiment 1

## Category + Price

Query:

SELECT *
FROM products
WHERE category_id = 1
AND price BETWEEN 5000 AND 50000;

Before:

Record actual execution time.

After:

Record actual execution time.

Plan:

Record whether PostgreSQL used:

Index Scan
Bitmap Index Scan
Bitmap Heap Scan
Seq Scan


---

# Experiment 2

## JSONB

Query:

SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

Compare:

- execution time
- buffers
- scan type


---

# Experiment 3

## Arrays

Query:

SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];

Compare GIN vs sequential scan.


---

# Experiment 4

## Customer Order History

Query:

SELECT *
FROM orders
WHERE user_id = 500
ORDER BY created_at DESC
LIMIT 20;

The composite index:

(user_id, created_at DESC)

is designed for this access pattern.


---

# Questions

1. Which query benefited most from an index?

2. Which query still used Seq Scan?

3. Why did PostgreSQL choose that plan?

4. Which indexes support JSONB?

5. Which indexes support arrays?

6. Why is the order of columns important in a B-tree composite index?

7. What is the write cost of adding indexes?

8. Why should unused indexes be removed?

9. When should a GIN index be preferred?

10. Why should the checkout transaction lock inventory?

11. What happens when two users purchase the last item simultaneously?

12. What happens when payment creation fails?

13. What happens when inventory update fails?

14. Why should the repository own the database transaction?

15. Why should controllers avoid direct SQL?