
-- =========================================================
-- DAY 79 — PRODUCTION E-COMMERCE QUERY ENGINE
-- joins.sql
-- =========================================================

-- =========================================================
-- BASIC JOINs

-- 1. Users with their orders
SELECT
    u.id,
    u.name,
    o.id AS order_id,
    o.total_amount,
    o.status
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id;


-- 2. Products with their categories
SELECT
    p.id,
    p.name AS product,
    c.name AS category
FROM products p
INNER JOIN categories c
    ON p.category_id = c.id;


-- 3. Orders with their users
SELECT
    o.id AS order_id,
    u.name,
    u.email,
    o.total_amount,
    o.status
FROM orders o
INNER JOIN users u
    ON o.user_id = u.id;


-- 4. Order items with products
SELECT
    oi.order_id,
    p.name AS product,
    oi.quantity,
    oi.price
FROM order_items oi
INNER JOIN products p
    ON oi.product_id = p.id;


-- 5. Products with categories
SELECT
    p.id,
    p.name AS product_name,
    c.name AS category_name,
    p.base_price
FROM products p
INNER JOIN categories c
    ON p.category_id = c.id;

-- MULTIPLE JOINs

-- 6. Complete order details
-- Customer + Order + Product + Quantity + Price

SELECT
    o.id AS order_id,
    u.name AS customer,
    p.name AS product,
    oi.quantity,
    oi.price
FROM orders o
INNER JOIN users u
    ON o.user_id = u.id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id;


-- 7. Customer + Order + Product

SELECT
    u.name AS customer,
    o.id AS order_id,
    p.name AS product
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id;


-- 8. Customer + Order + Category

SELECT
    u.name AS customer,
    o.id AS order_id,
    c.name AS category
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
INNER JOIN categories c
    ON p.category_id = c.id;


-- 9. Customer + Order + Payment

SELECT
    u.name AS customer,
    o.id AS order_id,
    o.total_amount,
    pay.payment_method,
    pay.payment_status
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
LEFT JOIN payments pay
    ON o.id = pay.order_id;


-- 10. Complete checkout history

SELECT
    u.name AS customer,
    u.email,
    o.id AS order_id,
    o.status AS order_status,
    o.created_at,
    p.name AS product,
    oi.quantity,
    oi.price,
    pay.payment_method,
    pay.payment_status
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
LEFT JOIN payments pay
    ON o.id = pay.order_id;

-- LEFT JOIN

-- 11. Users without orders

SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE o.id IS NULL;


-- 12. Products never ordered

SELECT
    p.id,
    p.name
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
WHERE oi.id IS NULL;


-- 13. Categories without products

SELECT
    c.id,
    c.name
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
WHERE p.id IS NULL;


-- 14. Orders without payments

SELECT
    o.id AS order_id,
    o.user_id,
    o.total_amount,
    o.status
FROM orders o
LEFT JOIN payments pay
    ON o.id = pay.order_id
WHERE pay.id IS NULL;


-- 15. Users without addresses

SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN addresses a
    ON u.id = a.user_id
WHERE a.id IS NULL;

-- FILTERING WITH JOINs
-- 16. Completed orders

SELECT
    o.id AS order_id,
    u.name AS customer,
    o.total_amount
FROM orders o
INNER JOIN users u
    ON o.user_id = u.id
WHERE o.status = 'completed';


-- 17. Orders above ₹5,000

SELECT
    o.id AS order_id,
    u.name AS customer,
    o.total_amount
FROM orders o
INNER JOIN users u
    ON o.user_id = u.id
WHERE o.total_amount > 5000;


-- 18. Products from a specific category
-- Change 'Electronics' to any category

SELECT
    p.id,
    p.name AS product,
    p.base_price,
    c.name AS category
FROM products p
INNER JOIN categories c
    ON p.category_id = c.id
WHERE c.name = 'Electronics';


-- 19. Customers who purchased a specific product
-- Change 'Laptop' to any product

SELECT DISTINCT
    u.id,
    u.name,
    u.email
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
WHERE p.name = 'Laptop';


-- 20. Customers with more than one order

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS order_count
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
HAVING COUNT(o.id) > 1;


-- =========================================================
-- BONUS JOIN PRACTICE
-- =========================================================

-- Bonus 1. User + Address + Orders

SELECT
    u.name AS customer,
    a.city,
    a.state,
    o.id AS order_id,
    o.total_amount
FROM users u
LEFT JOIN addresses a
    ON u.id = a.user_id
LEFT JOIN orders o
    ON u.id = o.user_id;


-- Bonus 2. Order + Product + Category

SELECT
    o.id AS order_id,
    p.name AS product,
    c.name AS category,
    oi.quantity,
    oi.price
FROM orders o
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
INNER JOIN categories c
    ON p.category_id = c.id;


-- Bonus 3. Full order report

SELECT
    u.id AS customer_id,
    u.name AS customer,
    u.email,
    o.id AS order_id,
    o.status AS order_status,
    o.created_at AS order_date,
    p.name AS product,
    c.name AS category,
    oi.quantity,
    oi.price AS product_price,
    o.total_amount AS order_total,
    pay.payment_method,
    pay.payment_status
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
INNER JOIN categories c
    ON p.category_id = c.id
LEFT JOIN payments pay
    ON o.id = pay.order_id
ORDER BY o.created_at DESC;

