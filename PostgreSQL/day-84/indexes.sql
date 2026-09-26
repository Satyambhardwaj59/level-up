-- JSONB GIN index
CREATE INDEX idx_products_metadata_gin
ON products
USING GIN(metadata);

-- Array GIN index
CREATE INDEX idx_products_tags_gin
ON products
USING GIN(tags);

-- Regions GIN index
CREATE INDEX idx_products_regions_gin
ON products
USING GIN(regions);

-- Analyze JSONB query
-- Before index:

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

-- After index:
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE metadata @> '{"brand": "Lenovo"}';

-- Look for:
Bitmap Index Scan

-- or:
Bitmap Heap Scan

-- Analyze array query
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE tags @> ARRAY['laptop'];

-- Array overlap
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE regions && ARRAY['IN', 'US'];

-- List indexes
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'products';