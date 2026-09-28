-- Run database/indexes.sql first.

ANALYZE;


-- ==========================================
-- CATEGORY + PRICE
-- ==========================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE category_id = 1
  AND price BETWEEN 5000 AND 50000;


-- ==========================================
-- JSONB
-- ==========================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';


-- ==========================================
-- ARRAY
-- ==========================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];


-- ==========================================
-- CUSTOMER ORDERS
-- ==========================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE user_id = 500
ORDER BY created_at DESC
LIMIT 20;