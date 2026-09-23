
-- ============================================
-- DAY 81 — CUSTOMER ANALYTICS
-- ============================================

-- 1. Customer spending rank
SELECT
    u.id AS customer_id,
    u.name AS customer,
    SUM(o.total_amount) AS total_spending,
    RANK() OVER (
        ORDER BY SUM(o.total_amount) DESC
    ) AS spending_rank
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name;


-- 2. Customer order count
SELECT
    u.id AS customer_id,
    u.name AS customer,
    COUNT(o.id) AS order_count
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY order_count DESC;


-- 3. Customer average order value
SELECT
    u.id AS customer_id,
    u.name AS customer,
    ROUND(AVG(o.total_amount), 2) AS average_order_value
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY average_order_value DESC;


-- 4. Running customer revenue
SELECT
    u.id AS customer_id,
    u.name AS customer,
    o.id AS order_id,
    o.created_at,
    o.total_amount,
    SUM(o.total_amount) OVER (
        PARTITION BY u.id
        ORDER BY o.created_at
    ) AS running_revenue
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
ORDER BY u.id, o.created_at;


-- 5. Previous order amount
SELECT
    user_id,
    id AS order_id,
    created_at,
    total_amount,
    LAG(total_amount) OVER (
        PARTITION BY user_id
        ORDER BY created_at
    ) AS previous_order_amount
FROM orders
WHERE status = 'completed';


-- 6. Next order amount
SELECT
    user_id,
    id AS order_id,
    created_at,
    total_amount,
    LEAD(total_amount) OVER (
        PARTITION BY user_id
        ORDER BY created_at
    ) AS next_order_amount
FROM orders
WHERE status = 'completed';


-- 7. Highest-value order per customer
WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY total_amount DESC
        ) AS row_num
    FROM orders o
    WHERE status = 'completed'
)
SELECT
    user_id,
    id AS order_id,
    total_amount,
    created_at
FROM ranked_orders
WHERE row_num = 1;


-- 8. First order per customer
WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at
        ) AS row_num
    FROM orders o
    WHERE status = 'completed'
)
SELECT
    user_id,
    id AS order_id,
    total_amount,
    created_at AS first_order
FROM ranked_orders
WHERE row_num = 1;


-- 9. Latest order per customer
WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at DESC
        ) AS row_num
    FROM orders o
    WHERE status = 'completed'
)
SELECT
    user_id,
    id AS order_id,
    total_amount,
    created_at AS latest_order
FROM ranked_orders
WHERE row_num = 1;


-- 10. Customer percentage of total revenue
WITH customer_revenue AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,
        SUM(o.total_amount) AS revenue
    FROM users u
    JOIN orders o
        ON o.user_id = u.id
    WHERE o.status = 'completed'
    GROUP BY u.id, u.name
)
SELECT
    customer_id,
    customer,
    revenue,
    ROUND(
        revenue * 100.0 / SUM(revenue) OVER (),
        2
    ) AS revenue_percentage
FROM customer_revenue
ORDER BY revenue DESC;


-- 11. Customer leaderboard
SELECT
    u.id AS customer_id,
    u.name AS customer,
    COUNT(o.id) AS orders,
    SUM(o.total_amount) AS total_spending,
    ROUND(AVG(o.total_amount), 2) AS average_order_value,

    RANK() OVER (
        ORDER BY SUM(o.total_amount) DESC
    ) AS spending_rank,

    RANK() OVER (
        ORDER BY COUNT(o.id) DESC
    ) AS order_count_rank,

    RANK() OVER (
        ORDER BY AVG(o.total_amount) DESC
    ) AS average_order_value_rank

FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY spending_rank;


-- 12. Customer retention signal
WITH customer_orders AS (
    SELECT
        user_id,
        created_at,
        MIN(created_at) OVER (
            PARTITION BY user_id
        ) AS first_order,
        MAX(created_at) OVER (
            PARTITION BY user_id
        ) AS latest_order,
        LAG(created_at) OVER (
            PARTITION BY user_id
            ORDER BY created_at
        ) AS previous_order
    FROM orders
    WHERE status = 'completed'
)
SELECT DISTINCT
    user_id,
    first_order,
    previous_order,
    latest_order,
    EXTRACT(
        DAY FROM (latest_order - previous_order)
    ) AS days_since_previous_order
FROM customer_orders
ORDER BY user_id;


-- 13. Customer average order value rank
SELECT
    u.id AS customer_id,
    u.name AS customer,
    ROUND(AVG(o.total_amount), 2) AS average_order_value,
    RANK() OVER (
        ORDER BY AVG(o.total_amount) DESC
    ) AS average_order_value_rank
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name;


-- 14. Customer revenue contribution rank
WITH customer_revenue AS (
    SELECT
        user_id,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY user_id
)
SELECT
    user_id,
    revenue,
    RANK() OVER (
        ORDER BY revenue DESC
    ) AS revenue_rank,
    ROUND(
        revenue * 100.0 / SUM(revenue) OVER (),
        2
    ) AS revenue_percentage
FROM customer_revenue
ORDER BY revenue_rank;


-- 15. Final Challenge — Customer Retention Signal
WITH customer_orders AS (
    SELECT
        user_id,
        created_at,
        MIN(created_at) OVER (
            PARTITION BY user_id
        ) AS first_order,
        MAX(created_at) OVER (
            PARTITION BY user_id
        ) AS latest_order,
        LAG(created_at) OVER (
            PARTITION BY user_id
            ORDER BY created_at
        ) AS previous_order
    FROM orders
    WHERE status = 'completed'
)
SELECT DISTINCT
    user_id AS customer,
    first_order,
    previous_order,
    latest_order,
    EXTRACT(
        DAY FROM (latest_order - previous_order)
    ) AS days_since_previous_order
FROM customer_orders
ORDER BY customer;
