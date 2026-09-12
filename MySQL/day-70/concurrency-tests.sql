USE ecommerce_transactions;

-- CHECK CURRENT STOCK

SELECT
    p.id,
    p.name,
    i.stock
FROM products p
JOIN inventory i
    ON p.id = i.product_id
WHERE p.id = 7;

-- ATOMIC PURCHASE TEST

START TRANSACTION;

UPDATE inventory
SET stock = stock - 1
WHERE product_id = 7
  AND stock >= 1;

SELECT ROW_COUNT() AS purchase_success;

COMMIT;

-- RESET CONCURRENCY PRODUCT

UPDATE inventory
SET stock = 1
WHERE product_id = 7;

-- LOCK TEST

START TRANSACTION;

SELECT
    product_id,
    stock
FROM inventory
WHERE product_id = 7
FOR UPDATE;

-- CHECK TRANSACTION STATUS

SELECT
    *
FROM performance_schema.data_locks;