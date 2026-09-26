
-- Test INSERT audit

INSERT INTO products (
    name,
    price,
    tags,
    regions,
    metadata
)
VALUES (
    'Audit Test Product',
    5000,
    ARRAY['test', 'audit'],
    ARRAY['IN'],
    '{
        "brand": "TestBrand",
        "ram": 16
    }'::jsonb
);

-- Check:
SELECT
    id,
    table_name,
    record_id,
    operation,
    old_data,
    new_data,
    changed_at,
    changed_by
FROM audit_logs
ORDER BY id DESC
LIMIT 1;

/*
Expected:

operation = INSERT
old_data = NULL
new_data = product JSON
*/

-- Test UPDATE audit

UPDATE products
SET
    price = 5500,
    metadata =
        metadata ||
        '{"warranty": "3 years"}'::jsonb
WHERE name = 'Audit Test Product';

-- Check:
SELECT
    operation,
    old_data,
    new_data,
    changed_at
FROM audit_logs
WHERE table_name = 'products'
ORDER BY id DESC
LIMIT 2;

-- Expected: UPDATE

-- Test DELETE audit

DELETE FROM products
WHERE name = 'Audit Test Product';

-- Check:
SELECT
    operation,
    old_data,
    new_data
FROM audit_logs
WHERE table_name = 'products'
ORDER BY id DESC
LIMIT 3;
/*
Expected sequence:

DELETE
UPDATE
INSERT  */

-- Test JSONB

SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

-- Test arrays
SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];

-- Test function
SELECT
    calculate_discount(10000, 20);

-- Expected: 8000.00
-- Test order total

SELECT
    calculate_order_total(1);
-- Test stock function
SELECT
    name,
    get_stock_status(
        metadata || '{"stock": 5}'::jsonb
    )
FROM products
LIMIT 5;

-- Expected: LOW_STOCK
-- Test updated_at
SELECT
    id,
    updated_at
FROM products
WHERE id = 1;

UPDATE products
SET price = price + 1
WHERE id = 1;

SELECT
    id,
    updated_at
FROM products
WHERE id = 1;

-- Test GIN index
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

-- Test array GIN index
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];

-- Audit statistics
SELECT
    operation,
    COUNT(*)
FROM audit_logs
GROUP BY operation
ORDER BY operation;