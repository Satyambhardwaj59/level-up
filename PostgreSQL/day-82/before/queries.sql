-- =========================================================
-- BEFORE INDEXES
-- DAY 82 PERFORMANCE LAB
-- =========================================================


-- =========================================================
-- CHALLENGE 1
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM users
WHERE email = 'user50000@example.com';


-- =========================================================
-- CHALLENGE 2
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE user_id = 5000
ORDER BY created_at DESC
LIMIT 20;


-- =========================================================
-- CHALLENGE 3
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE category_id = 10
AND price BETWEEN 500 AND 2000;


-- =========================================================
-- CHALLENGE 4
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'pending';


-- =========================================================
-- CHALLENGE 5
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM users
WHERE LOWER(email) = 'user50000@example.com';


-- =========================================================
-- CHALLENGE 6
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
ORDER BY price DESC
LIMIT 20;


-- =========================================================
-- CHALLENGE 7
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE user_id = 5000
AND status = 'pending'
ORDER BY created_at DESC
LIMIT 10;


-- =========================================================
-- CHALLENGE 8
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    o.id,
    o.user_id,
    oi.product_id,
    oi.quantity,
    oi.price
FROM orders o
JOIN order_items oi
    ON oi.order_id = o.id
WHERE o.user_id = 5000;


-- =========================================================
-- CHALLENGE 9
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    u.id,
    u.name,
    o.id AS order_id,
    oi.product_id,
    oi.quantity
FROM users u
JOIN orders o
    ON o.user_id = u.id
JOIN order_items oi
    ON oi.order_id = o.id
WHERE u.id = 5000;


-- =========================================================
-- CHALLENGE 10
-- SEQ SCAN
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'pending';


-- =========================================================
-- CHALLENGE 11
-- ACTIVE PRODUCTS
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE is_active = TRUE
AND category_id = 10;


-- =========================================================
-- CHALLENGE 12
-- CUSTOMER ORDER HISTORY
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE user_id = 5000
ORDER BY created_at DESC
LIMIT 20;


-- =========================================================
-- CHALLENGE 13
-- CASE-INSENSITIVE EMAIL
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM users
WHERE LOWER(email) = 'user50000@example.com';


-- =========================================================
-- CHALLENGE 14
-- FIND A POSSIBLY UNUSED INDEX
-- =========================================================

SELECT
    schemaname,
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;


-- =========================================================
-- CHALLENGE 15
-- BASELINE INSERT
-- =========================================================

EXPLAIN (ANALYZE, BUFFERS)
INSERT INTO users
(name, email, phone)
VALUES
(
    'Performance Test User',
    'performance-before@example.com',
    '9000000000'
)
RETURNING *;


DELETE FROM users
WHERE email = 'performance-before@example.com';