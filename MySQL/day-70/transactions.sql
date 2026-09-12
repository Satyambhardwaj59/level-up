USE ecommerce_transactions;

START TRANSACTION;

-- 1. CHECK USER

SELECT id
FROM users
WHERE id = 1
FOR UPDATE;

-- 2. LOCK INVENTORY
-- Product ID = 1

SELECT
    product_id,
    stock
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- 3. VERIFY STOCK
-- Required quantity:
SET @quantity = 2;

-- 4. DECREASE INVENTORY

UPDATE inventory
SET stock = stock - @quantity
WHERE product_id = 1
  AND stock >= @quantity;


-- Check affected rows

SELECT ROW_COUNT() AS inventory_update_rows;

-- 5. GET PRODUCT PRICE

SELECT price
INTO @product_price
FROM products
WHERE id = 1;

-- 6. CALCULATE TOTAL

SET @total_amount = @product_price * @quantity;

-- 7. CREATE ORDER
INSERT INTO orders (
    user_id,
    status,
    total_amount
)
VALUES (
    1,
    'confirmed',
    @total_amount
);

SET @order_id = LAST_INSERT_ID();

-- 8. CREATE ORDER ITEM

INSERT INTO order_items (
    order_id,
    product_id,
    quantity,
    price
)
VALUES (
    @order_id,
    1,
    @quantity,
    @product_price
);

-- 9. CREATE PAYMENT

INSERT INTO payments (
    order_id,
    amount,
    status,
    transaction_reference
)
VALUES (
    @order_id,
    @total_amount,
    'success',
    CONCAT('TXN-', @order_id)
);

-- 10. COMMIT

COMMIT;

-- VERIFY

SELECT *
FROM orders
WHERE id = @order_id;

SELECT *
FROM order_items
WHERE order_id = @order_id;

SELECT *
FROM payments
WHERE order_id = @order_id;

SELECT *
FROM inventory
WHERE product_id = 1;