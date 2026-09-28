-- ==========================================
-- DISCOUNT
-- ==========================================

CREATE OR REPLACE FUNCTION calculate_discount(
    p_price NUMERIC,
    p_discount NUMERIC
)
RETURNS NUMERIC
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN

    IF p_price < 0 THEN
        RAISE EXCEPTION 'Price cannot be negative';
    END IF;

    IF p_discount < 0 OR p_discount > 100 THEN
        RAISE EXCEPTION
            'Discount must be between 0 and 100';
    END IF;

    RETURN ROUND(
        p_price - (p_price * p_discount / 100),
        2
    );

END;
$$;


-- ==========================================
-- STOCK STATUS
-- ==========================================

CREATE OR REPLACE FUNCTION get_stock_status(
    p_quantity INTEGER
)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN

    IF p_quantity <= 0 THEN
        RETURN 'OUT_OF_STOCK';

    ELSIF p_quantity <= 10 THEN
        RETURN 'LOW_STOCK';

    ELSE
        RETURN 'IN_STOCK';
    END IF;

END;
$$;


-- ==========================================
-- ORDER TOTAL
-- ==========================================

CREATE OR REPLACE FUNCTION calculate_order_total(
    p_order_id BIGINT
)
RETURNS NUMERIC
LANGUAGE SQL
STABLE
AS $$
    SELECT COALESCE(
        SUM(quantity * price),
        0
    )
    FROM order_items
    WHERE order_id = p_order_id;
$$;