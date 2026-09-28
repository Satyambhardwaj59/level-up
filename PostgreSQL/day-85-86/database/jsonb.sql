-- ==========================================
-- READ JSONB
-- ==========================================

SELECT
    id,
    name,
    metadata
FROM products
LIMIT 10;


-- ==========================================
-- BRAND
-- ==========================================

SELECT
    name,
    metadata ->> 'brand' AS brand
FROM products
LIMIT 20;


-- ==========================================
-- RAM
-- ==========================================

SELECT
    name,
    (metadata ->> 'ram')::INTEGER AS ram
FROM products
WHERE (metadata ->> 'ram')::INTEGER >= 16;


-- ==========================================
-- NESTED EXTRACTION
-- ==========================================

SELECT
    name,
    metadata -> 'features' ->> 'wifi' AS wifi
FROM products
LIMIT 20;


-- ==========================================
-- CONTAINMENT
-- ==========================================

SELECT
    id,
    name
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';


-- ==========================================
-- KEY EXISTS
-- ==========================================

SELECT
    id,
    name
FROM products
WHERE metadata ? 'ram';


-- ==========================================
-- JSONB UPDATE
-- ==========================================

UPDATE products
SET metadata =
    jsonb_set(
        metadata,
        '{warranty}',
        '"2 years"'
    )
WHERE id = 1;


-- ==========================================
-- JSONB MERGE
-- ==========================================

UPDATE products
SET metadata =
    metadata ||
    '{"featured": true}'::jsonb
WHERE id = 1;


-- ==========================================
-- JSONB PERFORMANCE
-- ==========================================

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';