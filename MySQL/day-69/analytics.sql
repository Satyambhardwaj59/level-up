-- Challenge 1 — Total users

SELECT COUNT(*) AS total_users
FROM users;

-- Challenge 2 — Total orders
SELECT COUNT(*) AS total_orders
FROM orders;

-- Challenge 3 — Total revenue
SELECT SUM(quantity * price) AS total_revenue
FROM order_items;

--Challenge 4 — Average order value
SELECT AVG(order_total) AS average_order_value
FROM (
    SELECT
        order_id,
        SUM(quantity * price) AS order_total
    FROM order_items
    GROUP BY order_id
) AS orders;

-- Challenge 5 — Highest-value order
SELECT
    order_id,
    SUM(quantity * price) AS order_value
FROM order_items
GROUP BY order_id
ORDER BY order_value DESC
LIMIT 1;

-- Challenge 6 — Revenue per customer
SELECT
    u.id,
    u.name,
    SUM(oi.quantity * oi.price) AS revenue
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY u.id, u.name
ORDER BY revenue DESC;

-- Challenge 7 — Orders per customer
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_orders DESC;

-- Challenge 8 — Revenue per category
SELECT
    c.name AS category,
    SUM(oi.quantity * oi.price) AS revenue
FROM categories c
JOIN products p
    ON c.id = p.category_id
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY c.id, c.name
ORDER BY revenue DESC;

-- Challenge 9 — Revenue per product
SELECT
    p.id,
    p.name,
    SUM(oi.quantity * oi.price) AS revenue
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY revenue DESC;

-- Challenge 10 — Quantity sold per product
SELECT
    p.name,
    SUM(oi.quantity) AS total_quantity_sold
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_quantity_sold DESC;

-- Challenge 11 — Customers spending more than ₹50,000
SELECT
    u.id,
    u.name,
    SUM(oi.quantity * oi.price) AS total_spending
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY u.id, u.name
HAVING total_spending > 50000;
-- Challenge 12 — Customers with more than 5 orders
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
JOIN orders o
    ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;

-- Challenge 13 — Products selling more than 1,000 units
SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS units_sold
FROM products p
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY p.id, p.name
HAVING SUM(oi.quantity) > 1000;

-- Challenge 14 — Categories generating more than ₹1 lakh
SELECT
    c.name,
    SUM(oi.quantity * oi.price) AS revenue
FROM categories c
JOIN products p
    ON c.id = p.category_id
JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY c.id, c.name
HAVING SUM(oi.quantity * oi.price) > 100000;

-- Challenge 15 — Customers with no orders
SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE o.id IS NULL;

-- Challenge 16 — Products with no sales
SELECT
    p.id,
    p.name
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
WHERE oi.id IS NULL;

--Challenge 17 — Products priced above average
SELECT
    id,
    name,
    price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
)
ORDER BY price DESC;

-- Challenge 18 — Customers whose spending is above average
WITH customer_spending AS (
    SELECT
        u.id,
        u.name,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS spending
    FROM users u
    LEFT JOIN orders o
        ON u.id = o.user_id
    LEFT JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY u.id, u.name
)
SELECT *
FROM customer_spending
WHERE spending > (
    SELECT AVG(spending)
    FROM customer_spending
)
ORDER BY spending DESC;


-- Challenge 19
WITH order_totals AS (
    SELECT
        o.id AS order_id,
        o.user_id,
        o.order_date,
        SUM(oi.quantity * oi.price) AS order_total
    FROM orders o
    JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY
        o.id,
        o.user_id,
        o.order_date
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
    r.order_date,
    r.order_total
FROM ranked_orders r
JOIN users u
    ON r.user_id = u.id
WHERE r.rn = 1;

-- Challenge 20
WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY order_date DESC, id DESC
        ) AS rn
    FROM orders o
)
SELECT
    u.name,
    r.id AS order_id,
    r.order_date
FROM ranked_orders r
JOIN users u
    ON r.user_id = u.id
WHERE r.rn = 1;

-- Challenge 21 — Rank customers by spending
WITH customer_spending AS (
    SELECT
        u.id,
        u.name,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS spending
    FROM users u
    LEFT JOIN orders o
        ON u.id = o.user_id
    LEFT JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY u.id, u.name
)
SELECT
    name,
    spending,
    RANK() OVER (
        ORDER BY spending DESC
    ) AS spending_rank
FROM customer_spending
ORDER BY spending_rank;

-- Challenge 22 — Rank products inside each category
WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        c.name AS category,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS revenue
    FROM products p
    JOIN categories c
        ON p.category_id = c.id
    LEFT JOIN order_items oi
        ON p.id = oi.product_id
    GROUP BY
        p.id,
        p.name,
        c.name
)
SELECT
    name,
    category,
    revenue,
    RANK() OVER (
        PARTITION BY category
        ORDER BY revenue DESC
    ) AS category_rank
FROM product_revenue
ORDER BY category, category_rank;

-- Challenge 23
WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        c.name AS category,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS revenue
    FROM products p
    JOIN categories c
        ON p.category_id = c.id
    LEFT JOIN order_items oi
        ON p.id = oi.product_id
    GROUP BY
        p.id,
        p.name,
        c.name
),
ranked_products AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY revenue DESC
        ) AS rn
    FROM product_revenue
)
SELECT
    category,
    name,
    revenue
FROM ranked_products
WHERE rn <= 3
ORDER BY category, revenue DESC;

--Challenge 24
WITH daily_revenue AS (
    SELECT
        o.order_date,
        SUM(oi.quantity * oi.price) AS daily_revenue
    FROM orders o
    JOIN order_items oi
        ON o.id = oi.order_id
    GROUP BY o.order_date
)
SELECT
    order_date,
    daily_revenue,
    SUM(daily_revenue) OVER (
        ORDER BY order_date
    ) AS running_revenue
FROM daily_revenue
ORDER BY order_date;

-- Challenge 25
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
)
SELECT
    name,
    revenue,
    ROUND(
        revenue * 100.0 /
        NULLIF(SUM(revenue) OVER (), 0),
        2
    ) AS revenue_percentage
FROM customer_revenue
ORDER BY revenue DESC;