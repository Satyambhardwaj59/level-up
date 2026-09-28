-- ==========================================
-- BASIC COUNTS
-- ==========================================

SELECT COUNT(*) FROM users;

SELECT COUNT(*) FROM products;

SELECT COUNT(*) FROM orders;

SELECT COUNT(*) FROM order_items;

SELECT COUNT(*) FROM payments;


-- ==========================================
-- FOREIGN KEY INTEGRITY
-- ==========================================

SELECT
    COUNT(*) AS orphan_order_items
FROM order_items oi
LEFT JOIN orders o
    ON o.id = oi.order_id
WHERE o.id IS NULL;


-- ==========================================
-- PRODUCT JSONB
-- ==========================================

SELECT
    COUNT(*)
FROM products
WHERE metadata ? 'brand';


-- ==========================================
-- INVENTORY
-- ==========================================

SELECT
    COUNT(*)
FROM inventory
WHERE quantity < 0;


-- ==========================================
-- ORDER TOTALS
-- ==========================================

SELECT
    COUNT(*)
FROM orders
WHERE total_amount < 0;


-- ==========================================
-- AUDIT
-- ==========================================

SELECT
    operation,
    COUNT(*)
FROM audit_logs
GROUP BY operation;