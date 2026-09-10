USE ecommerce_analytics;
-- BASIC JOINS

-- 1. Get all users with their orders
SELECT
    u.id,
    u.name,
    u.email,
    o.id AS order_id,
    o.status,
    o.order_date
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
ORDER BY u.id, o.order_date;

-- 2. Get all users including users without orders
SELECT
    u.id,
    u.name,
    u.email,
    o.id AS order_id,
    o.status
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
ORDER BY u.id;

-- 3. Get all orders with customer names
SELECT
    o.id AS order_id,
    u.name AS customer,
    u.email,
    o.status,
    o.order_date
FROM orders o
JOIN users u
    ON o.user_id = u.id
ORDER BY o.order_date;

-- 4. Get all products with category names
SELECT
    p.id,
    p.name AS product,
    p.price,
    c.name AS category
FROM products p
JOIN categories c
    ON p.category_id = c.id
ORDER BY c.name, p.price DESC;


-- 5. Get all categories and their products
SELECT
    c.id,
    c.name AS category,
    p.name AS product,
    p.price
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
ORDER BY c.name;


-- 6. Customers who have placed at least one order
SELECT DISTINCT
    u.id,
    u.name,
    u.email
FROM users u
JOIN orders o
    ON u.id = o.user_id;

-- 7. Customers who have never ordered
SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE o.id IS NULL;

-- 8. Products that have never been ordered
SELECT
    p.id,
    p.name,
    p.price
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
WHERE oi.id IS NULL;


-- 9. Completed orders with customer information
SELECT
    o.id AS order_id,
    u.name,
    u.email,
    o.order_date
FROM orders o
JOIN users u
    ON o.user_id = u.id
WHERE o.status = 'completed';

-- 10. Cancelled orders with customer information
SELECT
    o.id AS order_id,
    u.name,
    u.email,
    o.order_date
FROM orders o
JOIN users u
    ON o.user_id = u.id
WHERE o.status = 'cancelled';

-- 11. Calculate total spending per customer
SELECT
    u.id,
    u.name,
    COALESCE(
        SUM(
            CASE
                WHEN o.status = 'completed'
                THEN oi.quantity * oi.price
                ELSE 0
            END
        ),
        0
    ) AS total_spending
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
LEFT JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY u.id, u.name
ORDER BY total_spending DESC;

-- 12. Top 10 customers by spending
SELECT
    u.id,
    u.name,
    SUM(oi.quantity * oi.price) AS total_spending
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spending DESC
LIMIT 10;


-- 13. Total quantity sold per product

SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS quantity_sold
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name
ORDER BY quantity_sold DESC;


-- 14. Top 10 best-selling products

SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS quantity_sold
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name
ORDER BY quantity_sold DESC
LIMIT 10;


-- 15. Revenue per category

SELECT
    c.id,
    c.name AS category,
    SUM(oi.quantity * oi.price) AS revenue
FROM categories c
JOIN products p
    ON c.id = p.category_id
JOIN order_items oi
    ON p.id = oi.product_id
JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY c.id, c.name
ORDER BY revenue DESC;


-- 16. Categories generating more than ₹1,00,000

SELECT
    c.id,
    c.name AS category,
    SUM(oi.quantity * oi.price) AS revenue
FROM categories c
JOIN products p
    ON c.id = p.category_id
JOIN order_items oi
    ON p.id = oi.product_id
JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY c.id, c.name
HAVING revenue > 100000
ORDER BY revenue DESC;


-- 17. Each customer's latest order

SELECT
    u.id,
    u.name,
    MAX(o.order_date) AS latest_order
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY latest_order DESC;


-- 18. Customers with more than 5 orders

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
JOIN orders o
    ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY total_orders DESC;


-- 19. Products purchased by a specific user
-- Example: Rahul

SELECT DISTINCT
    p.id,
    p.name,
    p.price
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
JOIN products p
    ON oi.product_id = p.id
WHERE u.email = 'rahul@example.com'
  AND o.status = 'completed';


-- 20. Users who purchased Electronics products

SELECT DISTINCT
    u.id,
    u.name,
    u.email
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
JOIN products p
    ON oi.product_id = p.id
JOIN categories c
    ON p.category_id = c.id
WHERE c.name = 'Electronics'
  AND o.status = 'completed';



-- ADVANCED


-- 21. Most expensive order for every customer

WITH order_totals AS (
    SELECT
        o.id AS order_id,
        o.user_id,
        SUM(oi.quantity * oi.price) AS order_total
    FROM orders o
    JOIN order_items oi
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY o.id, o.user_id
),
ranked_orders AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY order_total DESC
        ) AS rn
    FROM order_totals
)
SELECT
    u.name,
    r.order_id,
    r.order_total
FROM ranked_orders r
JOIN users u
    ON r.user_id = u.id
WHERE r.rn = 1;


-- 22. Customers whose spending is greater than
-- average customer spending

WITH customer_spending AS (
    SELECT
        u.id,
        u.name,
        COALESCE(
            SUM(
                CASE
                    WHEN o.status = 'completed'
                    THEN oi.quantity * oi.price
                    ELSE 0
                END
            ),
            0
        ) AS total_spending
    FROM users u
    LEFT JOIN orders o
        ON u.id = o.user_id
    LEFT JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY u.id, u.name
)
SELECT
    id,
    name,
    total_spending
FROM customer_spending
WHERE total_spending >
(
    SELECT AVG(total_spending)
    FROM customer_spending
)
ORDER BY total_spending DESC;


-- 23. Best-selling product in every category

WITH product_sales AS (
    SELECT
        p.id,
        p.name,
        p.category_id,
        SUM(oi.quantity) AS quantity_sold
    FROM products p
    JOIN order_items oi
        ON p.id = oi.product_id
    JOIN orders o
        ON oi.order_id = o.id
    WHERE o.status = 'completed'
    GROUP BY p.id, p.name, p.category_id
),
ranked_products AS (
    SELECT
        *,
        RANK() OVER (
            PARTITION BY category_id
            ORDER BY quantity_sold DESC
        ) AS ranking
    FROM product_sales
)
SELECT
    c.name AS category,
    rp.name AS product,
    rp.quantity_sold
FROM ranked_products rp
JOIN categories c
    ON rp.category_id = c.id
WHERE rp.ranking = 1;


-- 24. Categories with zero sales

SELECT
    c.id,
    c.name
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
LEFT JOIN order_items oi
    ON p.id = oi.product_id
LEFT JOIN orders o
    ON oi.order_id = o.id
   AND o.status = 'completed'
GROUP BY c.id, c.name
HAVING COUNT(o.id) = 0;


-- 25. Customers who bought at least 3 different products

SELECT
    u.id,
    u.name,
    COUNT(DISTINCT oi.product_id) AS different_products
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
HAVING COUNT(DISTINCT oi.product_id) >= 3
ORDER BY different_products DESC;


-- 26. Customers who purchased products
-- from more than 2 categories

SELECT
    u.id,
    u.name,
    COUNT(DISTINCT p.category_id) AS category_count
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
JOIN products p
    ON oi.product_id = p.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
HAVING COUNT(DISTINCT p.category_id) > 2
ORDER BY category_count DESC;


-- 27. Month with highest revenue

SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity * oi.price) AS revenue
FROM orders o
JOIN order_items oi
    ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY revenue DESC
LIMIT 1;


-- 28. Top 5 products by revenue

SELECT
    p.id,
    p.name,
    SUM(oi.quantity * oi.price) AS revenue
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 5;


-- 29. Customers who ordered in both January and February

SELECT
    u.id,
    u.name
FROM users u
JOIN orders o
    ON u.id = o.user_id
WHERE o.status = 'completed'
  AND MONTH(o.order_date) IN (1, 2)
GROUP BY u.id, u.name
HAVING COUNT(DISTINCT MONTH(o.order_date)) = 2;


-- 30. Complete customer report

WITH customer_stats AS (

    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COUNT(DISTINCT
            CASE
                WHEN o.status = 'completed'
                THEN o.id
            END
        ) AS total_orders,

        COALESCE(
            SUM(
                CASE
                    WHEN o.status = 'completed'
                    THEN oi.quantity
                    ELSE 0
                END
            ),
            0
        ) AS total_items,

        COALESCE(
            SUM(
                CASE
                    WHEN o.status = 'completed'
                    THEN oi.quantity * oi.price
                    ELSE 0
                END
            ),
            0
        ) AS total_spending,

        MAX(
            CASE
                WHEN o.status = 'completed'
                THEN o.order_date
            END
        ) AS last_order_date

    FROM users u

    LEFT JOIN orders o
        ON u.id = o.user_id

    LEFT JOIN order_items oi
        ON o.id = oi.order_id

    GROUP BY u.id, u.name
),

category_stats AS (

    SELECT
        u.id AS customer_id,
        c.name AS category,
        COUNT(*) AS purchase_count

    FROM users u

    JOIN orders o
        ON u.id = o.user_id

    JOIN order_items oi
        ON o.id = oi.order_id

    JOIN products p
        ON oi.product_id = p.id

    JOIN categories c
        ON p.category_id = c.id

    WHERE o.status = 'completed'

    GROUP BY
        u.id,
        c.id,
        c.name
),

favorite_categories AS (

    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY purchase_count DESC, category
        ) AS rn
    FROM category_stats
)

SELECT
    cs.customer,
    cs.total_orders,
    cs.total_items,
    cs.total_spending,

    ROUND(
        cs.total_spending /
        NULLIF(cs.total_orders, 0),
        2
    ) AS average_order_value,

    cs.last_order_date,

    fc.category AS favorite_category

FROM customer_stats cs

LEFT JOIN favorite_categories fc
    ON cs.customer_id = fc.customer_id
   AND fc.rn = 1

ORDER BY cs.total_spending DESC;