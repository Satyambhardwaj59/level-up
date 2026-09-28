-- Remove experiment indexes if necessary.

DROP INDEX IF EXISTS idx_products_category_price;
DROP INDEX IF EXISTS idx_products_active;
DROP INDEX IF EXISTS idx_products_price_desc;

DROP INDEX IF EXISTS idx_products_metadata_gin;
DROP INDEX IF EXISTS idx_products_tags_gin;
DROP INDEX IF EXISTS idx_products_regions_gin;

DROP INDEX IF EXISTS idx_orders_user_created;
DROP INDEX IF EXISTS idx_orders_user_status_created;
DROP INDEX IF EXISTS idx_orders_pending;


-- ==========================================
-- PRODUCT CATEGORY + PRICE
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