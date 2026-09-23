

-- DAY 81 — FINAL PRODUCTION ANALYTICS




-- 1. TOP 3 PRODUCTS PER CATEGORY

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,
        SUM(oi.quantity * oi.price) AS revenue
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY p.id, p.name, p.category_id
),
ranked_products AS (
    SELECT
        c.name AS category,
        pr.product,
        pr.revenue,
        RANK() OVER (
            PARTITION BY pr.category_id
            ORDER BY pr.revenue DESC
        ) AS rank
    FROM product_revenue pr
    JOIN categories c
        ON c.id = pr.category_id
)
SELECT
    category,
    product,
    revenue,
    rank
FROM ranked_products
WHERE rank <= 3
ORDER BY category, rank;

-- 2. CUSTOMER LEADERBOARD
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
    ) AS order_rank,

    RANK() OVER (
        ORDER BY AVG(o.total_amount) DESC
    ) AS average_order_value_rank

FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY spending_rank;

-- 3. REVENUE GROWTH
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', created_at)::date AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
),
revenue_comparison AS (
    SELECT
        month,
        revenue,
        LAG(revenue) OVER (
            ORDER BY month
        ) AS previous_month_revenue
    FROM monthly_revenue
)
SELECT
    month,
    revenue,
    previous_month_revenue,
    revenue - previous_month_revenue AS growth_amount,
    ROUND(
        (
            (revenue - previous_month_revenue)
            / NULLIF(previous_month_revenue, 0)
        ) * 100,
        2
    ) AS growth_percentage
FROM revenue_comparison
ORDER BY month;



-- 4. RUNNING REVENUE


WITH daily_revenue AS (
    SELECT
        created_at::date AS date,
        SUM(total_amount) AS daily_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY created_at::date
)
SELECT
    date,
    daily_revenue,
    SUM(daily_revenue) OVER (
        ORDER BY date
    ) AS running_revenue
FROM daily_revenue
ORDER BY date;



-- 5. CUSTOMER RETENTION SIGNAL


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



-- 6. DAILY REVENUE DASHBOARD


WITH daily_revenue AS (
    SELECT
        created_at::date AS date,
        SUM(total_amount) AS daily_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY created_at::date
),
analytics AS (
    SELECT
        date,
        daily_revenue,

        LAG(daily_revenue) OVER (
            ORDER BY date
        ) AS previous_day_revenue,

        SUM(daily_revenue) OVER (
            ORDER BY date
        ) AS running_revenue,

        AVG(daily_revenue) OVER (
            ORDER BY date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS moving_average_7_days

    FROM daily_revenue
)
SELECT
    date,
    daily_revenue,
    previous_day_revenue,
    daily_revenue - previous_day_revenue AS growth_amount,

    ROUND(
        (
            (daily_revenue - previous_day_revenue)
            / NULLIF(previous_day_revenue, 0)
        ) * 100,
        2
    ) AS growth_percentage,

    ROUND(moving_average_7_days, 2) AS moving_average_7_days,
    running_revenue

FROM analytics
ORDER BY date;



-- 7. PRODUCT PERFORMANCE DASHBOARD


WITH product_sales AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.quantity * oi.price) AS revenue
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY p.id, p.name, p.category_id
)
SELECT
    c.name AS category,
    ps.product,
    ps.units_sold,
    ps.revenue,

    RANK() OVER (
        PARTITION BY ps.category_id
        ORDER BY ps.revenue DESC
    ) AS category_rank,

    ROUND(
        ps.revenue * 100.0 /
        SUM(ps.revenue) OVER (
            PARTITION BY ps.category_id
        ),
        2
    ) AS category_revenue_percentage,

    SUM(ps.revenue) OVER (
        ORDER BY ps.revenue DESC
    ) AS running_product_revenue

FROM product_sales ps
JOIN categories c
    ON c.id = ps.category_id
ORDER BY ps.revenue DESC;



-- 8. CUSTOMER REVENUE ANALYTICS


WITH customer_revenue AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,
        COUNT(o.id) AS order_count,
        SUM(o.total_amount) AS total_revenue,
        AVG(o.total_amount) AS average_order_value
    FROM users u
    JOIN orders o
        ON o.user_id = u.id
    WHERE o.status = 'completed'
    GROUP BY u.id, u.name
)
SELECT
    customer_id,
    customer,
    order_count,
    ROUND(total_revenue, 2) AS total_revenue,
    ROUND(average_order_value, 2) AS average_order_value,

    RANK() OVER (
        ORDER BY total_revenue DESC
    ) AS revenue_rank,

    ROUND(
        total_revenue * 100.0 /
        SUM(total_revenue) OVER (),
        2
    ) AS revenue_percentage

FROM customer_revenue
ORDER BY revenue_rank;



-- 9. MONTHLY REVENUE RANKING


WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', created_at)::date AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
    month,
    revenue,
    RANK() OVER (
        ORDER BY revenue DESC
    ) AS monthly_rank,

    SUM(revenue) OVER (
        ORDER BY month
    ) AS cumulative_revenue

FROM monthly_revenue
ORDER BY month;



-- 10. BEST & WORST SALES DAY


WITH daily_revenue AS (
    SELECT
        created_at::date AS date,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY created_at::date
),
ranked_days AS (
    SELECT
        date,
        revenue,

        RANK() OVER (
            ORDER BY revenue DESC
        ) AS best_day_rank,

        RANK() OVER (
            ORDER BY revenue ASC
        ) AS worst_day_rank

    FROM daily_revenue
)
SELECT
    date,
    revenue,
    best_day_rank,
    worst_day_rank
FROM ranked_days
WHERE best_day_rank = 1
   OR worst_day_rank = 1
ORDER BY date;
