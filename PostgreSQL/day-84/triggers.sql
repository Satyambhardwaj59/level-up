-- Updated timestamp function

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;
$$;

-- Create trigger:

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Test timestamp trigger
SELECT
    id,
    updated_at
FROM products
WHERE id = 1;

-- Then:
UPDATE products
SET price = price + 100
WHERE id = 1;

-- Check:

SELECT
    id,
    price,
    updated_at
FROM products
WHERE id = 1;