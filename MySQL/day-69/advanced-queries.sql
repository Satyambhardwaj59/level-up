-- Second-highest spending customer
WITH customer_revenue AS (
    SELECT
        u.id,
        u.name,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS revenue
    FROM users u
    LEFT JOIN orders o
        ON u.id = o.user_id
    LEFT JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY u.id, u.name
),
ranked AS (
    SELECT
        *,
        DENSE_RANK() OVER (
            ORDER BY revenue DESC
        ) AS rnk
    FROM customer_revenue
)
SELECT *
FROM ranked
WHERE rnk = 2;

-- Top-selling product
SELECT
    p.name,
    SUM(oi.quantity) AS units_sold
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY units_sold DESC
LIMIT 1;


-- 3. Revenue by month
SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity * oi.price) AS revenue
FROM orders o
JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY month;

-- 4. Average spending per customer
WITH customer_revenue AS (
    SELECT
        u.id,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS revenue
    FROM users u
    LEFT JOIN orders o
        ON u.id = o.user_id
    LEFT JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY u.id
)
SELECT AVG(revenue) AS average_customer_spending
FROM customer_revenue;

-- Customers who purchased a laptop
SELECT DISTINCT
    u.id,
    u.name
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
JOIN products p
    ON oi.product_id = p.id
JOIN categories c
    ON p.category_id = c.id
WHERE c.name = 'Laptops';



