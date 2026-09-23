
-- ============================================
-- DAY 81 — RUNNING TOTALS & TIME-SERIES
-- ============================================

-- 1. Running customer revenue
SELECT
    o.user_id,
    o.created_at::date AS order_date,
    o.total_amount,
    SUM(o.total_amount) OVER (
        PARTITION BY o.user_id
        ORDER BY o.created_at
    ) AS running_revenue
FROM orders o
WHERE o.status = 'completed'
ORDER BY o.user_id, o.created_at;


-- 2. Previous order amount using LAG()
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


-- 3. Next order amount using LEAD()
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


-- 4. Daily revenue
SELECT
    created_at::date AS date,
    SUM(total_amount) AS daily_revenue
FROM orders
WHERE status = 'completed'
GROUP BY created_at::date
ORDER BY date;


-- 5. Running revenue
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


-- 6. 7-day moving average
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
    ROUND(
        AVG(daily_revenue) OVER (
            ORDER BY date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS moving_average_7_days
FROM daily_revenue
ORDER BY date;


-- 7. Previous day's revenue
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
    LAG(daily_revenue) OVER (
        ORDER BY date
    ) AS previous_day_revenue
FROM daily_revenue
ORDER BY date;


-- 8. Revenue growth
WITH daily_revenue AS (
    SELECT
        created_at::date AS date,
        SUM(total_amount) AS daily_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY created_at::date
),
revenue_comparison AS (
    SELECT
        date,
        daily_revenue,
        LAG(daily_revenue) OVER (
            ORDER BY date
        ) AS previous_day_revenue
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
    ) AS growth_percentage
FROM revenue_comparison
ORDER BY date;


-- 9. Monthly revenue ranking
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
    ) AS revenue_rank
FROM monthly_revenue
ORDER BY month;


-- 10. Best sales day
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
    daily_revenue
FROM daily_revenue
ORDER BY daily_revenue DESC
LIMIT 1;


-- 11. Worst sales day
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
    daily_revenue
FROM daily_revenue
ORDER BY daily_revenue ASC
LIMIT 1;


-- 12. Cumulative monthly revenue
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
    SUM(revenue) OVER (
        ORDER BY month
    ) AS cumulative_revenue
FROM monthly_revenue
ORDER BY month;


-- 13. Month-over-month revenue change
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', created_at)::date AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
),
monthly_comparison AS (
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
    revenue - previous_month_revenue AS change_amount,
    ROUND(
        (
            (revenue - previous_month_revenue)
            / NULLIF(previous_month_revenue, 0)
        ) * 100,
        2
    ) AS change_percentage
FROM monthly_comparison
ORDER BY month;


-- 14. Running product sales
WITH product_sales AS (
    SELECT
        oi.product_id,
        SUM(oi.quantity) AS total_quantity
    FROM order_items oi
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY oi.product_id
)
SELECT
    product_id,
    total_quantity,
    SUM(total_quantity) OVER (
        ORDER BY total_quantity DESC
    ) AS running_product_sales
FROM product_sales
ORDER BY total_quantity DESC;


-- 15. Product sales compared with previous product
WITH product_sales AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        SUM(oi.quantity) AS total_sales
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY p.id, p.name
),
comparison AS (
    SELECT
        product_id,
        product,
        total_sales,
        LAG(total_sales) OVER (
            ORDER BY total_sales DESC
        ) AS previous_product_sales
    FROM product_sales
)
SELECT
    product_id,
    product,
    total_sales,
    previous_product_sales,
    total_sales - previous_product_sales AS sales_difference
FROM comparison
ORDER BY total_sales DESC;

