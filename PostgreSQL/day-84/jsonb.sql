-- Read complete metadata

SELECT
    id,
    name,
    metadata
FROM products;

-- Extract brand

SELECT
    name,
    metadata ->> 'brand' AS brand
FROM products;

-- Extract RAM
SELECT
    name,
    metadata -> 'ram' AS ram
FROM products;

-- Extract RAM as integer
SELECT
    name,
    (metadata ->> 'ram')::INTEGER AS ram
FROM products;

-- Nested extraction
SELECT
    name,
    metadata -> 'screen' ->> 'resolution' AS resolution
FROM products;

-- Nested screen size
SELECT
    name,
    (metadata -> 'screen' ->> 'size')::NUMERIC AS screen_size
FROM products;

-- JSONB filtering
-- Find Lenovo products:

SELECT *
FROM products
WHERE metadata ->> 'brand' = 'Lenovo';

-- Find products with 16 GB RAM:

SELECT *
FROM products
WHERE (metadata ->> 'ram')::INTEGER = 16;

-- JSONB containment
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

-- Nested containment:

SELECT *
FROM products
WHERE metadata @>
'{
    "features": {
        "wifi": true
    }
}';

-- Key existence
SELECT *
FROM products
WHERE metadata ? 'ram';

-- Check nested key:
SELECT *
FROM products
WHERE metadata -> 'features' ? 'bluetooth';

-- JSONB update
--Update RAM:
UPDATE products
SET metadata =
    jsonb_set(
        metadata,
        '{ram}',
        '32'
    )
WHERE id = 1;

--Update nested resolution:

UPDATE products
SET metadata =
    jsonb_set(
        metadata,
        '{screen,resolution}',
        '"3840x2160"'
    )
WHERE id = 1;

--Add new metadata:

UPDATE products
SET metadata =
    metadata || '{
        "warranty": "3 years"
    }'::jsonb
WHERE id = 1;

--Remove metadata key:

UPDATE products
SET metadata =
    metadata - 'warranty'
WHERE id = 1;

-- JSONB object construction
SELECT jsonb_build_object(
    'product',
    name,
    'price',
    price,
    'brand',
    metadata ->> 'brand'
)
FROM products
LIMIT 10;