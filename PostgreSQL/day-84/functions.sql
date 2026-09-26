
-- Function 1 — Discount Calculator
CREATE OR REPLACE FUNCTION calculate_discount(
    product_price NUMERIC,
    discount_percent NUMERIC
)
RETURNS NUMERIC
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN

    IF product_price < 0 THEN
        RAISE EXCEPTION
            'Product price cannot be negative';
    END IF;

    IF discount_percent < 0
       OR discount_percent > 100 THEN

        RAISE EXCEPTION
            'Discount must be between 0 and 100';

    END IF;

    RETURN ROUND(
        product_price
        - (product_price * discount_percent / 100),
        2
    );

END;
$$;

-- Test:
SELECT calculate_discount(
    10000,
    10
);

-- Expected: 9000.00

-- Function 2 — Order Total Calculator
CREATE OR REPLACE FUNCTION calculate_order_total(
    p_order_id BIGINT
)
RETURNS NUMERIC
LANGUAGE sql
STABLE
AS $$
    SELECT
        COALESCE(
            SUM(quantity * price),
            0
        )
    FROM order_items
    WHERE order_id = p_order_id;
$$;

-- Test:
SELECT calculate_order_total(1);


-- Function 3 — Stock Status

CREATE OR REPLACE FUNCTION get_stock_status(
    product_metadata JSONB
)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
    stock_value INTEGER;
BEGIN

    stock_value :=
        COALESCE(
            (product_metadata ->> 'stock')::INTEGER,
            0
        );

    IF stock_value <= 0 THEN
        RETURN 'OUT_OF_STOCK';

    ELSIF stock_value <= 10 THEN
        RETURN 'LOW_STOCK';

    ELSE
        RETURN 'IN_STOCK';

    END IF;

END;
$$;

-- Test:

SELECT
    name,
    get_stock_status(
        metadata || '{"stock": 25}'::jsonb
    ) AS stock_status
FROM products
LIMIT 10;