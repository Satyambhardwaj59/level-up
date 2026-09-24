
\timing on

-- 1. DATABASE SIZE
SELECT
    pg_size_pretty(pg_database_size(current_database()))
    AS database_size;

-- 2. TABLE SIZES
SELECT
    relname AS table_name,

    pg_size_pretty(
        pg_total_relation_size(relid)
    ) AS total_size

FROM pg_catalog.pg_statio_user_tables

ORDER BY pg_total_relation_size(relid) DESC;

-- 3. ROW COUNTS
SELECT 'users' AS table_name, COUNT(*) FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;

-- 4. TABLE STATISTICS
ANALYZE users;
ANALYZE products;
ANALYZE orders;
ANALYZE order_items;
ANALYZE payments;

-- 5. EMAIL PERFORMANCE

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM users
WHERE email = 'user50000@example.com';

-- 6. CUSTOMER ORDER HISTORY
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE user_id = 5000
ORDER BY created_at DESC
LIMIT 20;

-- 7. CATEGORY + PRICE
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE category_id = 10
AND price BETWEEN 500 AND 2000;

-- 8. PENDING ORDERS
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'pending';

-- 9. TOP PRODUCTS
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
ORDER BY price DESC
LIMIT 20;

-- 10. CUSTOMER JOIN
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE u.id = 5000
GROUP BY u.id, u.name;

-- 11. ORDER → ORDER ITEMS JOIN
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    o.id,
    oi.product_id,
    oi.quantity
FROM orders o
JOIN order_items oi
    ON oi.order_id = o.id
WHERE o.user_id = 5000;

-- 12. FULL JOIN CHAIN
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

-- 13. INDEX USAGE
SELECT
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- 14. UNUSED INDEX CANDIDATES
SELECT
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan,
    pg_size_pretty(
        pg_relation_size(indexrelid)
    ) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;