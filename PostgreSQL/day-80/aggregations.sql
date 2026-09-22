

-- DAY 80 — PRODUCTION E-COMMERCE ANALYTICS ENGINE
-- Part 1 — Aggregation Challenges
-- File: aggregations.sql

--
-- Topics:
-- COUNT
-- SUM
-- AVG
-- MIN
-- MAX
-- GROUP BY
-- HAVING
-- COUNT(DISTINCT)
-- Aggregate Functions + JOINs
--




-- 1. TOTAL USERS
SELECT
    COUNT(*) AS total_users
FROM users;

-- 2. TOTAL ORDERS
SELECT
    COUNT(*) AS total_orders
FROM orders;

-- 3. TOTAL PRODUCTS
SELECT
    COUNT(*) AS total_products
FROM products;

-- 4. TOTAL REVENUE
-- Only completed orders

SELECT
    COALESCE(SUM(total_amount), 0) AS total_revenue
FROM orders
WHERE status = 'completed';

-- 5. AVERAGE ORDER VALUE
SELECT
    ROUND(
        AVG(total_amount),
        2
    ) AS average_order_value
FROM orders;

-- 6. MINIMUM AND MAXIMUM ORDER
SELECT
    MIN(total_amount) AS minimum_order,
    MAX(total_amount) AS maximum_order
FROM orders;

-- 7. ORDERS BY STATUS
SELECT
    status,
    COUNT(*) AS order_count
FROM orders
GROUP BY status
ORDER BY order_count DESC;

-- 8. REVENUE BY ORDER STATUS
SELECT
    status,
    COUNT(*) AS order_count,
    COALESCE(SUM(total_amount), 0) AS total_revenue,
    ROUND(
        AVG(total_amount),
        2
    ) AS average_order_value
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;

-- 9. ORDERS PER CUSTOMER
SELECT
    u.id AS user_id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
ORDER BY total_orders DESC;

-- 10. CUSTOMER SPENDING
-- Completed orders only
SELECT
    u.id AS user_id,
    u.name,
    COALESCE(
        SUM(o.total_amount),
        0
    ) AS total_spending
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
   AND o.status = 'completed'
GROUP BY
    u.id,
    u.name
ORDER BY total_spending DESC;

-- 11. PRODUCT SALES QUANTITY
SELECT
    p.id AS product_id,
    p.name AS product,
    COALESCE(
        SUM(oi.quantity),
        0
    ) AS units_sold
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY
    p.id,
    p.name
ORDER BY units_sold DESC;

-- 12. PRODUCT REVENUE
-- Completed orders only
SELECT
    p.id AS product_id,
    p.name AS product,

    COALESCE(
        SUM(oi.quantity * oi.price),
        0
    ) AS revenue

FROM products p

LEFT JOIN order_items oi
    ON p.id = oi.product_id

LEFT JOIN orders o
    ON oi.order_id = o.id
   AND o.status = 'completed'

GROUP BY
    p.id,
    p.name

ORDER BY revenue DESC;

-- 13. REVENUE BY CATEGORY
SELECT
    c.id AS category_id,
    c.name AS category,

    COALESCE(
        SUM(oi.quantity * oi.price),
        0
    ) AS revenue

FROM categories c

LEFT JOIN products p
    ON c.id = p.category_id

LEFT JOIN order_items oi
    ON p.id = oi.product_id

LEFT JOIN orders o
    ON oi.order_id = o.id
   AND o.status = 'completed'

GROUP BY
    c.id,
    c.name

ORDER BY revenue DESC;

-- 14. CATEGORIES WITH MORE THAN ₹5,000 REVENUE
SELECT
    c.id,
    c.name AS category,

    SUM(oi.quantity * oi.price) AS revenue

FROM categories c

INNER JOIN products p
    ON c.id = p.category_id

INNER JOIN order_items oi
    ON p.id = oi.product_id

INNER JOIN orders o
    ON oi.order_id = o.id

WHERE o.status = 'completed'

GROUP BY
    c.id,
    c.name

HAVING SUM(oi.quantity * oi.price) > 5000

ORDER BY revenue DESC;

-- 15. CUSTOMERS WITH MORE THAN 1 ORDER
SELECT
    u.id,
    u.name,

    COUNT(o.id) AS total_orders

FROM users u

INNER JOIN orders o
    ON u.id = o.user_id

GROUP BY
    u.id,
    u.name

HAVING COUNT(o.id) > 1

ORDER BY total_orders DESC;

-- 16. CUSTOMERS SPENDING MORE THAN ₹10,000
SELECT
    u.id,
    u.name,

    SUM(o.total_amount) AS total_spending

FROM users u

INNER JOIN orders o
    ON u.id = o.user_id

WHERE o.status = 'completed'

GROUP BY
    u.id,
    u.name

HAVING SUM(o.total_amount) > 10000

ORDER BY total_spending DESC;

-- 17. AVERAGE PRODUCT PRICE PER CATEGORY
SELECT
    c.id AS category_id,
    c.name AS category,

    ROUND(
        AVG(p.base_price),
        2
    ) AS average_product_price,

    MIN(p.base_price) AS minimum_price,

    MAX(p.base_price) AS maximum_price,

    COUNT(p.id) AS product_count

FROM categories c

INNER JOIN products p
    ON c.id = p.category_id

GROUP BY
    c.id,
    c.name

ORDER BY average_product_price DESC;

-- 18. PRODUCT VARIANT STOCK STATISTICS
SELECT
    COUNT(*) AS total_variants,

    COALESCE(
        SUM(stock),
        0
    ) AS total_stock,

    ROUND(
        AVG(stock),
        2
    ) AS average_stock,

    MIN(stock) AS minimum_stock,

    MAX(stock) AS maximum_stock

FROM product_variants;

-- 19. PAYMENT METHOD USAGE
SELECT
    payment_method,

    COUNT(*) AS total_transactions,

    COUNT(*) FILTER (
        WHERE payment_status = 'success'
    ) AS successful_transactions,

    COUNT(*) FILTER (
        WHERE payment_status <> 'success'
    ) AS failed_transactions

FROM payments

GROUP BY payment_method

ORDER BY total_transactions DESC;

-- 20. SUCCESSFUL PAYMENT REVENUE
SELECT
    COUNT(p.id) AS successful_payments,

    COALESCE(
        SUM(o.total_amount),
        0
    ) AS successful_payment_revenue,

    ROUND(
        AVG(o.total_amount),
        2
    ) AS average_successful_order_value

FROM payments p

INNER JOIN orders o
    ON p.order_id = o.id

WHERE p.payment_status = 'success';



-- BONUS AGGREGATION CHALLENGES




-- BONUS 1 — UNIQUE PRODUCTS PURCHASED BY EACH CUSTOMER


SELECT
    u.id,
    u.name,

    COUNT(
        DISTINCT oi.product_id
    ) AS unique_products_purchased

FROM users u

LEFT JOIN orders o
    ON u.id = o.user_id

LEFT JOIN order_items oi
    ON o.id = oi.order_id

GROUP BY
    u.id,
    u.name

ORDER BY unique_products_purchased DESC;



-- BONUS 2 — CATEGORIES PURCHASED BY EACH CUSTOMER


SELECT
    u.id,
    u.name,

    COUNT(
        DISTINCT p.category_id
    ) AS categories_purchased

FROM users u

LEFT JOIN orders o
    ON u.id = o.user_id

LEFT JOIN order_items oi
    ON o.id = oi.order_id

LEFT JOIN products p
    ON oi.product_id = p.id

GROUP BY
    u.id,
    u.name

ORDER BY categories_purchased DESC;



-- BONUS 3 — TOTAL QUANTITY SOLD


SELECT
    COALESCE(
        SUM(quantity),
        0
    ) AS total_units_sold
FROM order_items;



-- BONUS 4 — AVERAGE PRODUCT PRICE


SELECT
    ROUND(
        AVG(base_price),
        2
    ) AS average_product_price
FROM products;



-- BONUS 5 — LOW STOCK PRODUCTS


SELECT
    p.id,
    p.name,

    SUM(pv.stock) AS total_stock

FROM products p

INNER JOIN product_variants pv
    ON p.id = pv.product_id

GROUP BY
    p.id,
    p.name

HAVING SUM(pv.stock) < 10

ORDER BY total_stock ASC;



-- BONUS 6 — TOP 5 PRODUCTS BY REVENUE


SELECT
    p.id,
    p.name,

    SUM(
        oi.quantity * oi.price
    ) AS revenue

FROM products p

INNER JOIN order_items oi
    ON p.id = oi.product_id

INNER JOIN orders o
    ON oi.order_id = o.id

WHERE o.status = 'completed'

GROUP BY
    p.id,
    p.name

ORDER BY revenue DESC

LIMIT 5;



-- BONUS 7 — TOP 5 CUSTOMERS BY SPENDING


SELECT
    u.id,
    u.name,

    SUM(o.total_amount) AS total_spending

FROM users u

INNER JOIN orders o
    ON u.id = o.user_id

WHERE o.status = 'completed'

GROUP BY
    u.id,
    u.name

ORDER BY total_spending DESC

LIMIT 5;



-- BONUS 8 — CUSTOMER ORDER STATISTICS


SELECT
    u.id,
    u.name,

    COUNT(o.id) AS total_orders,

    COALESCE(
        SUM(o.total_amount),
        0
    ) AS total_spending,

    ROUND(
        COALESCE(AVG(o.total_amount), 0),
        2
    ) AS average_order_value,

    MIN(o.created_at) AS first_order_date,

    MAX(o.created_at) AS latest_order_date

FROM users u

LEFT JOIN orders o
    ON u.id = o.user_id
   AND o.status = 'completed'

GROUP BY
    u.id,
    u.name

ORDER BY total_spending DESC;



-- BONUS 9 — PRODUCT PERFORMANCE


SELECT
    p.id,
    p.name AS product,

    c.name AS category,

    COUNT(DISTINCT oi.order_id) AS order_count,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS units_sold,

    COALESCE(
        SUM(oi.quantity * oi.price),
        0
    ) AS revenue,

    ROUND(
        COALESCE(
            AVG(oi.price),
            0
        ),
        2
    ) AS average_selling_price

FROM products p

INNER JOIN categories c
    ON p.category_id = c.id

LEFT JOIN order_items oi
    ON p.id = oi.product_id

GROUP BY
    p.id,
    p.name,
    c.name

ORDER BY revenue DESC;



-- BONUS 10 — CATEGORY PERFORMANCE


SELECT
    c.id,
    c.name AS category,

    COUNT(DISTINCT p.id) AS product_count,

    COUNT(DISTINCT oi.order_id) AS order_count,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS units_sold,

    COALESCE(
        SUM(oi.quantity * oi.price),
        0
    ) AS revenue,

    ROUND(
        COALESCE(
            AVG(p.base_price),
            0
        ),
        2
    ) AS average_product_price

FROM categories c

LEFT JOIN products p
    ON c.id = p.category_id

LEFT JOIN order_items oi
    ON p.id = oi.product_id

GROUP BY
    c.id,
    c.name

ORDER BY revenue DESC;



-- FINAL CHALLENGE

--
-- Build a single customer analytics query containing:
--
-- customer
-- total_orders
-- completed_orders
-- total_products
-- unique_products
-- categories_purchased
-- total_spending
-- average_order_value
--
-- Requirements:
--
-- 1. Include customers with zero orders.
-- 2. Only completed orders count toward revenue.
-- 3. Use COUNT(DISTINCT ...) where necessary.
-- 4. Use GROUP BY.
-- 5. Use COALESCE where appropriate.
--
-- DO NOT LOOK AT THE SOLUTION.
-- Build this query yourself.
--




-- END OF aggregations.sql

