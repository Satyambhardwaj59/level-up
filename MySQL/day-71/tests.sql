USE ecommerce_day71;

-- =========================================================
-- DAY 71 — COMPLETE TEST SUITE
-- E-Commerce Database Logic Engine
-- =========================================================


-- =========================================================
-- 1. DATABASE / TABLE CHECK
-- =========================================================

SELECT DATABASE() AS current_database;

SHOW TABLES;


-- =========================================================
-- 2. STORED FUNCTIONS TESTS
-- =========================================================

-- 2.1 Calculate Discount
SELECT
    CalculateDiscount(3000) AS discount_3000,
    CalculateDiscount(7000) AS discount_7000,
    CalculateDiscount(15000) AS discount_15000;


-- Expected:
-- 3000  -> 0
-- 7000  -> 350
-- 15000 -> 1500


-- 2.2 Calculate Tax
SELECT
    CalculateTax(1000) AS tax_1000,
    CalculateTax(5000) AS tax_5000,
    CalculateTax(10000) AS tax_10000;


-- Expected with 18% GST:
-- 1000  -> 180
-- 5000  -> 900
-- 10000 -> 1800


-- 2.3 Calculate Final Price
SELECT
    CalculateFinalPrice(3000) AS final_3000,
    CalculateFinalPrice(7000) AS final_7000,
    CalculateFinalPrice(15000) AS final_15000;


-- 2.4 Customer Tier
SELECT
    GetCustomerTier(5000) AS bronze_customer,
    GetCustomerTier(25000) AS silver_customer,
    GetCustomerTier(75000) AS gold_customer,
    GetCustomerTier(150000) AS platinum_customer;


-- =========================================================
-- 3. CUSTOMER ORDERS PROCEDURE
-- =========================================================

-- Test customer orders
CALL GetCustomerOrders(1);

CALL GetCustomerOrders(2);

CALL GetCustomerOrders(3);


-- =========================================================
-- 4. CUSTOMER SPENDING PROCEDURE
-- =========================================================

CALL GetCustomerSpending(1);

CALL GetCustomerSpending(2);

CALL GetCustomerSpending(3);


-- =========================================================
-- 5. PRODUCT INVENTORY PROCEDURE
-- =========================================================

-- Product 1
CALL GetProductInventory(1);

-- Product 2
CALL GetProductInventory(2);

-- Product 3
CALL GetProductInventory(3);


-- =========================================================
-- 6. CREATE ORDER — SUCCESS TEST
-- =========================================================

-- Check inventory before order

SELECT
    p.id,
    p.name,
    i.stock
FROM products p
JOIN inventory i
    ON i.product_id = p.id
WHERE p.id = 1;


-- Create order

CALL CreateOrder(
    1,      -- user_id
    1,      -- product_id
    2       -- quantity
);


-- Check inventory after order

SELECT
    p.id,
    p.name,
    i.stock
FROM products p
JOIN inventory i
    ON i.product_id = p.id
WHERE p.id = 1;


-- Check newly created order

SELECT *
FROM orders
ORDER BY id DESC
LIMIT 1;


-- Check order items

SELECT *
FROM order_items
ORDER BY id DESC
LIMIT 5;


-- Check payment

SELECT *
FROM payments
ORDER BY id DESC
LIMIT 1;


-- =========================================================
-- 7. CREATE ORDER — INVALID USER TEST
-- =========================================================

-- This should FAIL.

CALL CreateOrder(
    99999,
    1,
    1
);


-- =========================================================
-- 8. CREATE ORDER — INVALID QUANTITY TEST
-- =========================================================

-- Quantity = 0
-- This should FAIL.

CALL CreateOrder(
    1,
    1,
    0
);


-- Negative quantity
-- This should FAIL.

CALL CreateOrder(
    1,
    1,
    -5
);


-- =========================================================
-- 9. CREATE ORDER — INVALID PRODUCT TEST
-- =========================================================

-- This should FAIL.

CALL CreateOrder(
    1,
    99999,
    1
);


-- =========================================================
-- 10. CREATE ORDER — INSUFFICIENT STOCK TEST
-- =========================================================

-- First check current stock

SELECT
    product_id,
    stock
FROM inventory
WHERE product_id = 1;


-- Try buying a very large quantity.
-- This should FAIL if stock is insufficient.

CALL CreateOrder(
    1,
    1,
    999999
);


-- Verify stock was NOT changed

SELECT
    product_id,
    stock
FROM inventory
WHERE product_id = 1;


-- =========================================================
-- 11. INVENTORY TRIGGER TEST
-- =========================================================

-- Check inventory logs before update

SELECT *
FROM inventory_logs
ORDER BY id DESC;


-- Perform inventory update

UPDATE inventory
SET stock = stock - 3
WHERE product_id = 2;


-- Trigger should automatically create a log.

SELECT *
FROM inventory_logs
ORDER BY id DESC
LIMIT 5;


-- =========================================================
-- 12. INVENTORY TRIGGER — STOCK INCREASE TEST
-- =========================================================

UPDATE inventory
SET stock = stock + 10
WHERE product_id = 2;


-- Check log

SELECT *
FROM inventory_logs
ORDER BY id DESC
LIMIT 5;


-- =========================================================
-- 13. ORDER STATUS AUDIT TRIGGER
-- =========================================================

-- Find an order

SELECT
    id,
    user_id,
    status
FROM orders
ORDER BY id
LIMIT 5;


-- Update order status

UPDATE orders
SET status = 'processing'
WHERE id = 1;


-- Check audit log

SELECT *
FROM order_audit_logs
ORDER BY id DESC
LIMIT 10;


-- =========================================================
-- 14. ORDER STATUS — MULTIPLE CHANGES
-- =========================================================

UPDATE orders
SET status = 'shipped'
WHERE id = 1;


UPDATE orders
SET status = 'delivered'
WHERE id = 1;


-- Every status change should be logged.

SELECT *
FROM order_audit_logs
WHERE order_id = 1
ORDER BY id;


-- =========================================================
-- 15. PRODUCT PRICE VALIDATION TRIGGER
-- =========================================================

-- ---------------------------------------------------------
-- Valid product
-- ---------------------------------------------------------

INSERT INTO products
(
    name,
    description,
    price,
    discount_price,
    category_id,
    brand
)
VALUES
(
    'Test Product Valid',
    'Valid product for trigger testing',
    10000,
    9000,
    1,
    'TestBrand'
);


-- Check inserted product

SELECT *
FROM products
WHERE name = 'Test Product Valid';


-- =========================================================
-- 16. PRODUCT PRICE — NEGATIVE PRICE TEST
-- =========================================================

-- This should FAIL.

INSERT INTO products
(
    name,
    description,
    price,
    discount_price,
    category_id,
    brand
)
VALUES
(
    'Invalid Negative Price',
    'Should fail',
    -100,
    50,
    1,
    'TestBrand'
);


-- =========================================================
-- 17. PRODUCT PRICE — NEGATIVE DISCOUNT PRICE
-- =========================================================

-- This should FAIL.

INSERT INTO products
(
    name,
    description,
    price,
    discount_price,
    category_id,
    brand
)
VALUES
(
    'Invalid Negative Discount',
    'Should fail',
    1000,
    -100,
    1,
    'TestBrand'
);


-- =========================================================
-- 18. PRODUCT PRICE — DISCOUNT GREATER THAN PRICE
-- =========================================================

-- This should FAIL.

INSERT INTO products
(
    name,
    description,
    price,
    discount_price,
    category_id,
    brand
)
VALUES
(
    'Invalid Discount Greater Price',
    'Should fail',
    1000,
    1500,
    1,
    'TestBrand'
);


-- =========================================================
-- 19. PRODUCT PRICE UPDATE VALIDATION
-- =========================================================

-- Find a product

SELECT
    id,
    name,
    price,
    discount_price
FROM products
LIMIT 10;


-- Valid update

UPDATE products
SET
    price = 20000,
    discount_price = 18000
WHERE id = 1;


-- Verify

SELECT
    id,
    name,
    price,
    discount_price
FROM products
WHERE id = 1;


-- =========================================================
-- 20. INVALID PRODUCT PRICE UPDATE
-- =========================================================

-- This should FAIL.

UPDATE products
SET price = -500
WHERE id = 1;


-- =========================================================
-- 21. INVALID DISCOUNT UPDATE
-- =========================================================

-- This should FAIL.

UPDATE products
SET discount_price = 999999
WHERE id = 1;


-- =========================================================
-- 22. CANCEL ORDER — SUCCESS TEST
-- =========================================================

-- Check order before cancellation

SELECT
    id,
    user_id,
    status,
    total_amount,
    payment_status
FROM orders
WHERE id = 2;


-- Check inventory before cancellation

SELECT
    oi.product_id,
    oi.quantity,
    i.stock
FROM order_items oi
JOIN inventory i
    ON i.product_id = oi.product_id
WHERE oi.order_id = 2;


-- Cancel order

CALL CancelOrder(2);


-- Check order after cancellation

SELECT
    id,
    user_id,
    status,
    total_amount,
    payment_status
FROM orders
WHERE id = 2;


-- Check inventory after cancellation

SELECT
    oi.product_id,
    oi.quantity,
    i.stock
FROM order_items oi
JOIN inventory i
    ON i.product_id = oi.product_id
WHERE oi.order_id = 2;


-- =========================================================
-- 23. CANCEL ALREADY CANCELLED ORDER
-- =========================================================

-- This should FAIL because order is already cancelled.

CALL CancelOrder(2);


-- =========================================================
-- 24. CANCEL NON-EXISTING ORDER
-- =========================================================

-- This should FAIL.

CALL CancelOrder(99999);


-- =========================================================
-- 25. CANCEL DELIVERED ORDER
-- =========================================================

-- Find a delivered order

SELECT
    id,
    status
FROM orders
WHERE status = 'delivered'
LIMIT 5;


-- Try cancellation.
-- This should FAIL.

CALL CancelOrder(1);


-- =========================================================
-- 26. CUSTOMER SUMMARY VIEW
-- =========================================================

SELECT *
FROM customer_summary
ORDER BY total_spending DESC;


-- Top customers

SELECT *
FROM customer_summary
ORDER BY total_spending DESC
LIMIT 5;


-- =========================================================
-- 27. PRODUCT PERFORMANCE VIEW
-- =========================================================

SELECT *
FROM product_performance
ORDER BY revenue DESC;


-- Top 5 products

SELECT *
FROM product_performance
ORDER BY revenue DESC
LIMIT 5;


-- =========================================================
-- 28. CATEGORY PERFORMANCE VIEW
-- =========================================================

SELECT *
FROM category_performance
ORDER BY revenue DESC;


-- Top categories

SELECT *
FROM category_performance
ORDER BY revenue DESC
LIMIT 5;


-- =========================================================
-- 29. ORDER SUMMARY VIEW
-- =========================================================

SELECT *
FROM order_summary
ORDER BY order_id DESC;


-- =========================================================
-- 30. VERIFY INVENTORY LOGS
-- =========================================================

SELECT
    id,
    product_id,
    old_stock,
    new_stock,
    difference,
    changed_at
FROM inventory_logs
ORDER BY changed_at DESC;


-- =========================================================
-- 31. VERIFY ORDER AUDIT LOGS
-- =========================================================

SELECT
    id,
    order_id,
    old_status,
    new_status,
    changed_at
FROM order_audit_logs
ORDER BY changed_at DESC;


-- =========================================================
-- 32. VERIFY PAYMENTS
-- =========================================================

SELECT
    id,
    order_id,
    user_id,
    amount,
    method,
    status,
    transaction_id,
    created_at
FROM payments
ORDER BY id DESC;


-- =========================================================
-- 33. VERIFY CURRENT INVENTORY
-- =========================================================

SELECT
    p.id AS product_id,
    p.name AS product,
    i.stock
FROM products p
JOIN inventory i
    ON i.product_id = p.id
ORDER BY i.stock ASC;


-- =========================================================
-- 34. LOW STOCK PRODUCTS
-- =========================================================

SELECT
    p.id,
    p.name,
    i.stock
FROM products p
JOIN inventory i
    ON i.product_id = p.id
WHERE i.stock <= 5
ORDER BY i.stock ASC;


-- =========================================================
-- 35. ORDER STATUS DISTRIBUTION
-- =========================================================

SELECT
    status,
    COUNT(*) AS total_orders
FROM orders
GROUP BY status
ORDER BY total_orders DESC;


-- =========================================================
-- 36. PAYMENT STATUS DISTRIBUTION
-- =========================================================

SELECT
    payment_status,
    COUNT(*) AS total_payments
FROM orders
GROUP BY payment_status
ORDER BY total_payments DESC;


-- =========================================================
-- 37. TOTAL REVENUE
-- =========================================================

SELECT
    COALESCE(SUM(total_amount), 0) AS total_revenue
FROM orders
WHERE status <> 'cancelled';


-- =========================================================
-- 38. TOTAL ORDERS
-- =========================================================

SELECT
    COUNT(*) AS total_orders
FROM orders
WHERE status <> 'cancelled';


-- =========================================================
-- 39. TOTAL PRODUCTS SOLD
-- =========================================================

SELECT
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold
FROM order_items oi
JOIN orders o
    ON o.id = oi.order_id
WHERE o.status <> 'cancelled';


-- =========================================================
-- 40. FINAL SYSTEM CHECK
-- =========================================================

SELECT 'USERS' AS table_name, COUNT(*) AS total_rows
FROM users

UNION ALL

SELECT 'CATEGORIES', COUNT(*)
FROM categories

UNION ALL

SELECT 'PRODUCTS', COUNT(*)
FROM products

UNION ALL

SELECT 'ORDERS', COUNT(*)
FROM orders

UNION ALL

SELECT 'ORDER ITEMS', COUNT(*)
FROM order_items

UNION ALL

SELECT 'PAYMENTS', COUNT(*)
FROM payments

UNION ALL

SELECT 'INVENTORY', COUNT(*)
FROM inventory

UNION ALL

SELECT 'INVENTORY LOGS', COUNT(*)
FROM inventory_logs

UNION ALL

SELECT 'ORDER AUDIT LOGS', COUNT(*)
FROM order_audit_logs;


-- =========================================================
-- 41. VERIFY PROCEDURES
-- =========================================================

SHOW PROCEDURE STATUS
WHERE Db = 'ecommerce_day71';


-- =========================================================
-- 42. VERIFY FUNCTIONS
-- =========================================================

SHOW FUNCTION STATUS
WHERE Db = 'ecommerce_day71';


-- =========================================================
-- 43. VERIFY TRIGGERS
-- =========================================================

SHOW TRIGGERS
FROM ecommerce_day71;


-- =========================================================
-- 44. VERIFY VIEWS
-- =========================================================

SHOW FULL TABLES
FROM ecommerce_day71
WHERE Table_type = 'VIEW';


-- =========================================================
-- 45. FINAL REPORT
-- =========================================================

SELECT
    'DAY 71 DATABASE LOGIC ENGINE TEST COMPLETED' AS result;