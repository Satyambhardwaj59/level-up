-- Read tags
SELECT
    name,
    tags
FROM products;

--ANY
--Find products containing the tag laptop:

SELECT *
FROM products
WHERE 'laptop' = ANY(tags);

--ANY with region
SELECT *
FROM products
WHERE 'IN' = ANY(regions);

--ALL

SELECT *
FROM products
WHERE tags @> ARRAY['laptop', 'premium'];

-- test:
SELECT
    name,
    tags
FROM products
WHERE 'laptop' = ALL(tags);

-- Array containment
SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];
        
-- Multiple tags:
SELECT *
FROM products
WHERE tags @> ARRAY['laptop', 'premium'];

-- Array overlap
SELECT *
FROM products
WHERE regions && ARRAY['IN', 'US'];

-- Exact array equality
SELECT *
FROM products
WHERE regions = ARRAY['IN', 'US'];

-- Array length
SELECT
    name,
    cardinality(tags) AS tag_count
FROM products;

-- Add tag
UPDATE products
SET tags =
    array_append(tags, 'featured')
WHERE id = 1;

-- Remove tag
UPDATE products
SET tags =
    array_remove(tags, 'featured')
WHERE id = 1;

-- Add region
UPDATE products
SET regions =
    array_append(regions, 'CA')
WHERE id = 1;

-- Remove region
UPDATE products
SET regions =
    array_remove(regions, 'CA')
WHERE id = 1;

-- Unnest array
SELECT
    p.id,
    p.name,
    tag
FROM products p
CROSS JOIN LATERAL unnest(p.tags) AS tag
LIMIT 50;

-- Count products by tag
SELECT
    tag,
    COUNT(*) AS product_count
FROM products
CROSS JOIN LATERAL unnest(tags) AS tag
GROUP BY tag
ORDER BY product_count DESC;