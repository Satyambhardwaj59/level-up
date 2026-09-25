
/*


BEGIN
   ↓
SELECT ... FOR UPDATE
   ↓
Check inventory
   ↓
Create order
   ↓
Create order item
   ↓
Decrease inventory
   ↓
Create payment
   ↓
COMMIT


*/




-- PRODUCTION CHECKOUT TRANSACTION
BEGIN;

DO $$
DECLARE
    v_user_id BIGINT := 1;
    v_product_id BIGINT := 1;
    v_requested_quantity INTEGER := 2;

    v_stock INTEGER;
    v_price NUMERIC(12,2);
    v_order_id BIGINT;
    v_total NUMERIC(12,2);
BEGIN

    -- 1. LOCK INVENTORY ROW
    SELECT
        quantity
    INTO v_stock
    FROM inventory
    WHERE product_id = v_product_id
    FOR UPDATE;


    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Inventory row does not exist for product %',
            v_product_id;
    END IF;

    -- 2. CHECK STOCK
    IF v_stock < v_requested_quantity THEN

        RAISE EXCEPTION
            'Insufficient inventory. Product %, Available %, Requested %',
            v_product_id,
            v_stock,
            v_requested_quantity;

    END IF;

    -- 3. GET PRODUCT PRICE
    SELECT price
    INTO v_price
    FROM products
    WHERE id = v_product_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Product % does not exist',
            v_product_id;
    END IF;

    -- 4. CALCULATE TOTAL
    v_total :=
        v_price * v_requested_quantity;

    -- 5. CREATE ORDER
    INSERT INTO orders (
        user_id,
        status,
        total_amount
    )
    VALUES (
        v_user_id,
        'confirmed',
        v_total
    )
    RETURNING id
    INTO v_order_id;

    -- 6. CREATE ORDER ITEM
    INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
    )
    VALUES (
        v_order_id,
        v_product_id,
        v_requested_quantity,
        v_price
    );

    -- 7. DECREASE INVENTORY
    UPDATE inventory
    SET
        quantity = quantity - v_requested_quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE product_id = v_product_id;

    -- 8. CREATE PAYMENT

    INSERT INTO payments (
        order_id,
        amount,
        status
    )
    VALUES (
        v_order_id,
        v_total,
        'success'
    );
    RAISE NOTICE
        'Checkout successful. Order ID: %, Total: %',
        v_order_id,
        v_total;

END $$;

COMMIT;