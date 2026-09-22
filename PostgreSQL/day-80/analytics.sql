
/*
===========================================================
DAY 80 — PRODUCTION E-COMMERCE ANALYTICS ENGINE
PART 4 — PRODUCTION ANALYTICS
===========================================================

Tables:
users
addresses
categories
products
product_variants
orders
order_items
payments

Goal:
Build production-style analytics queries that could power:

- Admin dashboards
- E-commerce reports
- Customer analytics
- Product analytics
- Revenue dashboards
- Payment reports
- Inventory reports
- Business intelligence systems
===========================================================
*/


/*
===========================================================
1. EXECUTIVE BUSINESS OVERVIEW
===========================================================
*/
-- 1. Overall business KPI dashboard.

SELECT
    (SELECT COUNT(*) FROM users) AS total_users,

    (SELECT COUNT(*) FROM orders) AS total_orders,

    (SELECT COUNT(*) FROM products) AS total_products,

    (
        SELECT COALESCE(SUM(total_amount), 0)
        FROM orders
        WHERE status = 'completed'
    ) AS total_revenue,

    (
        SELECT COALESCE(AVG(total_amount), 0)
        FROM orders
        WHERE status = 'completed'
    ) AS average_order_value,

    (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'completed'
    ) AS completed_orders,

    (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'cancelled'
    ) AS cancelled_orders,

    (
        SELECT COALESCE(SUM(amount), 0)
        FROM payments
        WHERE status = 'success'
    ) AS successful_payment_amount;


/*
===========================================================
2. ORDER STATUS ANALYTICS
===========================================================
*/


-- 2. Order status distribution.

SELECT
    status,
    COUNT(*) AS total_orders,
    ROUND(
        (
            COUNT(*)::NUMERIC
            /
            NULLIF(
                SUM(COUNT(*)) OVER (),
                0
            )
        ) * 100,
        2
    ) AS percentage
FROM orders
GROUP BY status
ORDER BY total_orders DESC;


-- 3. Completed vs cancelled orders.

SELECT
    COUNT(*) FILTER (
        WHERE status = 'completed'
    ) AS completed_orders,

    COUNT(*) FILTER (
        WHERE status = 'cancelled'
    ) AS cancelled_orders,

    COUNT(*) FILTER (
        WHERE status = 'pending'
    ) AS pending_orders,

    COUNT(*) AS total_orders
FROM orders;


/*
===========================================================
3. REVENUE ANALYTICS
===========================================================
*/


-- 4. Total completed revenue.

SELECT
    COALESCE(
        SUM(total_amount),
        0
    ) AS total_revenue
FROM orders
WHERE status = 'completed';


-- 5. Revenue by order status.

SELECT
    status,
    COUNT(*) AS order_count,
    COALESCE(
        SUM(total_amount),
        0
    ) AS revenue
FROM orders
GROUP BY status
ORDER BY revenue DESC;


-- 6. Average order value.

SELECT
    ROUND(
        AVG(total_amount),
        2
    ) AS average_order_value
FROM orders
WHERE status = 'completed';


/*
===========================================================
4. MONTHLY REVENUE
===========================================================
*/


-- 7. Monthly revenue report.

SELECT
    DATE_TRUNC(
        'month',
        created_at
    ) AS month,

    COUNT(*) AS total_orders,

    COALESCE(
        SUM(total_amount),
        0
    ) AS revenue,

    ROUND(
        AVG(total_amount),
        2
    ) AS average_order_value

FROM orders

WHERE status = 'completed'

GROUP BY DATE_TRUNC(
    'month',
    created_at
)

ORDER BY month;


/*
===========================================================
5. MONTH-OVER-MONTH GROWTH
===========================================================
*/


-- 8. Monthly revenue growth.

WITH monthly_revenue AS (

    SELECT
        DATE_TRUNC(
            'month',
            created_at
        ) AS month,

        SUM(total_amount) AS revenue

    FROM orders

    WHERE status = 'completed'

    GROUP BY DATE_TRUNC(
        'month',
        created_at
    )
),

growth AS (

    SELECT
        month,
        revenue,

        LAG(revenue) OVER (
            ORDER BY month
        ) AS previous_revenue

    FROM monthly_revenue
)

SELECT
    month,
    revenue,
    previous_revenue,

    revenue - previous_revenue
        AS revenue_change,

    CASE
        WHEN previous_revenue IS NULL
            THEN NULL

        WHEN previous_revenue = 0
            THEN NULL

        ELSE ROUND(
            (
                (
                    revenue
                    - previous_revenue
                )
                /
                previous_revenue
            ) * 100,
            2
        )
    END AS growth_percentage

FROM growth

ORDER BY month;


/*
===========================================================
6. RUNNING REVENUE
===========================================================
*/


-- 9. Cumulative revenue.

WITH daily_revenue AS (

    SELECT
        created_at::date AS sale_date,

        SUM(total_amount) AS revenue

    FROM orders

    WHERE status = 'completed'

    GROUP BY created_at::date
)

SELECT
    sale_date,
    revenue,

    SUM(revenue) OVER (
        ORDER BY sale_date
        ROWS BETWEEN
            UNBOUNDED PRECEDING
            AND CURRENT ROW
    ) AS cumulative_revenue

FROM daily_revenue

ORDER BY sale_date;


/*
===========================================================
7. CUSTOMER ANALYTICS
===========================================================
*/


-- 10. Customer lifetime value.

SELECT
    u.id AS user_id,
    u.name,

    COUNT(o.id) AS total_orders,

    COALESCE(
        SUM(o.total_amount),
        0
    ) AS lifetime_value

FROM users u

LEFT JOIN orders o
    ON o.user_id = u.id
    AND o.status = 'completed'

GROUP BY
    u.id,
    u.name

ORDER BY lifetime_value DESC;


/*
===========================================================
8. TOP CUSTOMERS
===========================================================
*/


-- 11. Top 10 customers by revenue.

SELECT
    u.id,
    u.name,
    u.email,

    COUNT(o.id) AS total_orders,

    SUM(o.total_amount) AS total_spending

FROM users u

JOIN orders o
    ON o.user_id = u.id

WHERE o.status = 'completed'

GROUP BY
    u.id,
    u.name,
    u.email

ORDER BY total_spending DESC

LIMIT 10;


/*
===========================================================
9. CUSTOMER RANKING
===========================================================
*/


-- 12. Rank customers by spending.

WITH customer_revenue AS (

    SELECT
        u.id,
        u.name,

        SUM(o.total_amount)
            AS total_spending

    FROM users u

    JOIN orders o
        ON o.user_id = u.id

    WHERE o.status = 'completed'

    GROUP BY
        u.id,
        u.name
)

SELECT
    id,
    name,
    total_spending,

    RANK() OVER (
        ORDER BY total_spending DESC
    ) AS customer_rank

FROM customer_revenue

ORDER BY customer_rank;


/*
===========================================================
10. CUSTOMER SEGMENTATION
===========================================================
*/


-- 13. Segment customers based on spending.

WITH customer_revenue AS (

    SELECT
        u.id,
        u.name,

        COALESCE(
            SUM(o.total_amount),
            0
        ) AS total_spending

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id
        AND o.status = 'completed'

    GROUP BY
        u.id,
        u.name
)

SELECT
    id,
    name,
    total_spending,

    CASE
        WHEN total_spending >= 50000
            THEN 'VIP'

        WHEN total_spending >= 20000
            THEN 'High Value'

        WHEN total_spending >= 10000
            THEN 'Medium Value'

        ELSE 'Low Value'
    END AS customer_segment

FROM customer_revenue

ORDER BY total_spending DESC;


/*
===========================================================
11. CUSTOMER ORDER FREQUENCY
===========================================================
*/


-- 14. Customer order frequency.

SELECT
    u.id,
    u.name,

    COUNT(o.id) AS total_orders,

    MIN(o.created_at) AS first_order_date,

    MAX(o.created_at) AS latest_order_date,

    MAX(o.created_at)::date
        - MIN(o.created_at)::date
        AS customer_lifetime_days

FROM users u

LEFT JOIN orders o
    ON o.user_id = u.id

GROUP BY
    u.id,
    u.name

ORDER BY total_orders DESC;


/*
===========================================================
12. PRODUCT ANALYTICS
===========================================================
*/


-- 15. Product performance report.

SELECT
    p.id,
    p.name,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS units_sold,

    COALESCE(
        SUM(
            oi.quantity * oi.price
        ),
        0
    ) AS revenue

FROM products p

LEFT JOIN order_items oi
    ON oi.product_id = p.id

GROUP BY
    p.id,
    p.name

ORDER BY revenue DESC;


/*
===========================================================
13. TOP PRODUCTS
===========================================================
*/


-- 16. Top 10 products by revenue.

SELECT
    p.id,
    p.name,

    SUM(
        oi.quantity * oi.price
    ) AS revenue,

    SUM(
        oi.quantity
    ) AS units_sold

FROM products p

JOIN order_items oi
    ON oi.product_id = p.id

GROUP BY
    p.id,
    p.name

ORDER BY revenue DESC

LIMIT 10;


/*
===========================================================
14. PRODUCT RANKING
===========================================================
*/


-- 17. Rank products by revenue.

WITH product_revenue AS (

    SELECT
        p.id,
        p.name,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name
)

SELECT
    id,
    name,
    revenue,

    RANK() OVER (
        ORDER BY revenue DESC
    ) AS revenue_rank

FROM product_revenue

ORDER BY revenue_rank;


/*
===========================================================
15. CATEGORY PERFORMANCE
===========================================================
*/


-- 18. Category revenue report.

SELECT
    c.id,
    c.name,

    COUNT(
        DISTINCT p.id
    ) AS total_products,

    COALESCE(
        SUM(
            oi.quantity
            * oi.price
        ),
        0
    ) AS revenue,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS units_sold

FROM categories c

LEFT JOIN products p
    ON p.category_id = c.id

LEFT JOIN order_items oi
    ON oi.product_id = p.id

GROUP BY
    c.id,
    c.name

ORDER BY revenue DESC;


/*
===========================================================
16. TOP PRODUCT PER CATEGORY
===========================================================
*/


-- 19. Find the highest-revenue product
-- from every category.

WITH product_revenue AS (

    SELECT
        p.id,
        p.name,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
),

ranked_products AS (

    SELECT
        *,

        ROW_NUMBER() OVER (
            PARTITION BY category_id
            ORDER BY revenue DESC
        ) AS product_rank

    FROM product_revenue
)

SELECT
    rp.id,
    rp.name AS product_name,
    c.name AS category_name,
    rp.revenue

FROM ranked_products rp

JOIN categories c
    ON c.id = rp.category_id

WHERE rp.product_rank = 1

ORDER BY rp.revenue DESC;


/*
===========================================================
17. PAYMENT ANALYTICS
===========================================================
*/


-- 20. Payment method performance.

SELECT
    payment_method,

    COUNT(*) AS total_payments,

    COUNT(*) FILTER (
        WHERE status = 'success'
    ) AS successful_payments,

    COUNT(*) FILTER (
        WHERE status = 'failed'
    ) AS failed_payments,

    COALESCE(
        SUM(amount) FILTER (
            WHERE status = 'success'
        ),
        0
    ) AS successful_amount

FROM payments

GROUP BY payment_method

ORDER BY successful_amount DESC;


/*
===========================================================
18. PAYMENT SUCCESS RATE
===========================================================
*/


-- 21. Calculate payment success rate.

SELECT
    COUNT(*) AS total_payments,

    COUNT(*) FILTER (
        WHERE status = 'success'
    ) AS successful_payments,

    ROUND(
        (
            COUNT(*) FILTER (
                WHERE status = 'success'
            )::NUMERIC
            /
            NULLIF(
                COUNT(*),
                0
            )
        ) * 100,
        2
    ) AS success_rate

FROM payments;


/*
===========================================================
19. INVENTORY ANALYTICS
===========================================================
*/


-- 22. Product inventory report.

SELECT
    p.id,
    p.name,

    COALESCE(
        SUM(pv.stock),
        0
    ) AS total_stock,

    MIN(pv.stock)
        AS minimum_variant_stock,

    MAX(pv.stock)
        AS maximum_variant_stock

FROM products p

LEFT JOIN product_variants pv
    ON pv.product_id = p.id

GROUP BY
    p.id,
    p.name

ORDER BY total_stock ASC;


/*
===========================================================
20. LOW STOCK PRODUCTS
===========================================================
*/


-- 23. Identify low-stock products.

SELECT
    p.id,
    p.name,

    COALESCE(
        SUM(pv.stock),
        0
    ) AS total_stock

FROM products p

LEFT JOIN product_variants pv
    ON pv.product_id = p.id

GROUP BY
    p.id,
    p.name

HAVING COALESCE(
    SUM(pv.stock),
    0
) < 20

ORDER BY total_stock ASC;


/*
===========================================================
21. OUT-OF-STOCK PRODUCTS
===========================================================
*/


-- 24. Identify completely out-of-stock products.

SELECT
    p.id,
    p.name

FROM products p

LEFT JOIN product_variants pv
    ON pv.product_id = p.id

GROUP BY
    p.id,
    p.name

HAVING COALESCE(
    SUM(pv.stock),
    0
) = 0;


/*
===========================================================
22. SALES BY CATEGORY PERCENTAGE
===========================================================
*/


-- 25. Calculate each category's percentage
-- contribution to total revenue.

WITH category_revenue AS (

    SELECT
        c.id,
        c.name,

        COALESCE(
            SUM(
                oi.quantity
                * oi.price
            ),
            0
        ) AS revenue

    FROM categories c

    LEFT JOIN products p
        ON p.category_id = c.id

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        c.id,
        c.name
)

SELECT
    id,
    name,
    revenue,

    ROUND(
        (
            revenue
            /
            NULLIF(
                SUM(revenue) OVER (),
                0
            )
        ) * 100,
        2
    ) AS revenue_percentage

FROM category_revenue

ORDER BY revenue DESC;


/*
===========================================================
23. CUSTOMER RETENTION
===========================================================
*/


-- 26. Customers with multiple orders.

SELECT
    u.id,
    u.name,

    COUNT(o.id) AS total_orders

FROM users u

JOIN orders o
    ON o.user_id = u.id

GROUP BY
    u.id,
    u.name

HAVING COUNT(o.id) > 1

ORDER BY total_orders DESC;


/*
===========================================================
24. REPEAT CUSTOMER RATE
===========================================================
*/


-- 27. Calculate repeat customer rate.

WITH customer_orders AS (

    SELECT
        user_id,
        COUNT(*) AS total_orders

    FROM orders

    GROUP BY user_id
)

SELECT
    COUNT(*) AS total_customers,

    COUNT(*) FILTER (
        WHERE total_orders > 1
    ) AS repeat_customers,

    ROUND(
        (
            COUNT(*) FILTER (
                WHERE total_orders > 1
            )::NUMERIC
            /
            NULLIF(
                COUNT(*),
                0
            )
        ) * 100,
        2
    ) AS repeat_customer_rate

FROM customer_orders;


/*
===========================================================
25. NEW CUSTOMERS BY MONTH
===========================================================
*/


-- 28. Find new customers by first order month.

WITH first_orders AS (

    SELECT
        user_id,
        MIN(created_at) AS first_order_date

    FROM orders

    GROUP BY user_id
)

SELECT
    DATE_TRUNC(
        'month',
        first_order_date
    ) AS month,

    COUNT(*) AS new_customers

FROM first_orders

GROUP BY DATE_TRUNC(
    'month',
    first_order_date
)

ORDER BY month;


/*
===========================================================
26. CUSTOMER PURCHASE DIVERSITY
===========================================================
*/


-- 29. Find customers purchasing from the
-- highest number of categories.

SELECT
    u.id,
    u.name,

    COUNT(
        DISTINCT p.category_id
    ) AS categories_purchased

FROM users u

JOIN orders o
    ON o.user_id = u.id

JOIN order_items oi
    ON oi.order_id = o.id

JOIN products p
    ON p.id = oi.product_id

GROUP BY
    u.id,
    u.name

ORDER BY categories_purchased DESC;


/*
===========================================================
27. AVERAGE ITEMS PER ORDER
===========================================================
*/


-- 30. Calculate average number of items per order.

WITH order_items_count AS (

    SELECT
        order_id,

        SUM(quantity)
            AS total_items

    FROM order_items

    GROUP BY order_id
)

SELECT
    ROUND(
        AVG(total_items),
        2
    ) AS average_items_per_order

FROM order_items_count;


/*
===========================================================
28. DAILY SALES DASHBOARD
===========================================================
*/


-- 31. Daily sales analytics.

SELECT
    created_at::date AS sale_date,

    COUNT(*) AS total_orders,

    SUM(total_amount) AS revenue,

    ROUND(
        AVG(total_amount),
        2
    ) AS average_order_value

FROM orders

WHERE status = 'completed'

GROUP BY created_at::date

ORDER BY sale_date;


/*
===========================================================
29. BEST SALES DAY
===========================================================
*/


-- 32. Find the highest-revenue sales day.

SELECT
    created_at::date AS sale_date,

    SUM(total_amount) AS revenue

FROM orders

WHERE status = 'completed'

GROUP BY created_at::date

ORDER BY revenue DESC

LIMIT 1;


/*
===========================================================
30. BEST SALES MONTH
===========================================================
*/


-- 33. Find the highest-revenue month.

SELECT
    DATE_TRUNC(
        'month',
        created_at
    ) AS month,

    SUM(total_amount) AS revenue

FROM orders

WHERE status = 'completed'

GROUP BY DATE_TRUNC(
    'month',
    created_at
)

ORDER BY revenue DESC

LIMIT 1;


/*
===========================================================
31. CUSTOMER 360 ANALYTICS
===========================================================
*/


-- 34. Complete customer analytics dashboard.

WITH customer_orders AS (

    SELECT
        user_id,

        COUNT(*) AS total_orders,

        COUNT(*) FILTER (
            WHERE status = 'completed'
        ) AS completed_orders,

        COUNT(*) FILTER (
            WHERE status = 'cancelled'
        ) AS cancelled_orders,

        SUM(total_amount) FILTER (
            WHERE status = 'completed'
        ) AS total_spending,

        AVG(total_amount) AS average_order_value,

        MIN(created_at) AS first_order_date,

        MAX(created_at) AS latest_order_date

    FROM orders

    GROUP BY user_id
),

customer_products AS (

    SELECT
        o.user_id,

        COUNT(
            DISTINCT oi.product_id
        ) AS unique_products,

        COUNT(
            DISTINCT p.category_id
        ) AS categories_purchased

    FROM orders o

    JOIN order_items oi
        ON oi.order_id = o.id

    JOIN products p
        ON p.id = oi.product_id

    GROUP BY o.user_id
),

customer_payments AS (

    SELECT
        o.user_id,

        COUNT(*) FILTER (
            WHERE p.status = 'success'
        ) AS successful_payments,

        COALESCE(
            SUM(p.amount) FILTER (
                WHERE p.status = 'success'
            ),
            0
        ) AS successful_payment_amount

    FROM orders o

    LEFT JOIN payments p
        ON p.order_id = o.id

    GROUP BY o.user_id
)

SELECT
    u.id AS user_id,
    u.name,
    u.email,

    COALESCE(
        co.total_orders,
        0
    ) AS total_orders,

    COALESCE(
        co.completed_orders,
        0
    ) AS completed_orders,

    COALESCE(
        co.cancelled_orders,
        0
    ) AS cancelled_orders,

    COALESCE(
        co.total_spending,
        0
    ) AS total_spending,

    COALESCE(
        co.average_order_value,
        0
    ) AS average_order_value,

    co.first_order_date,

    co.latest_order_date,

    COALESCE(
        cp.unique_products,
        0
    ) AS unique_products,

    COALESCE(
        cp.categories_purchased,
        0
    ) AS categories_purchased,

    COALESCE(
        cpay.successful_payments,
        0
    ) AS successful_payments,

    COALESCE(
        cpay.successful_payment_amount,
        0
    ) AS successful_payment_amount

FROM users u

LEFT JOIN customer_orders co
    ON co.user_id = u.id

LEFT JOIN customer_products cp
    ON cp.user_id = u.id

LEFT JOIN customer_payments cpay
    ON cpay.user_id = u.id

ORDER BY total_spending DESC;


/*
===========================================================
32. EXECUTIVE DASHBOARD
===========================================================
*/


-- 35. Final production dashboard query.

WITH
business_metrics AS (

    SELECT
        COUNT(*) AS total_orders,

        COUNT(*) FILTER (
            WHERE status = 'completed'
        ) AS completed_orders,

        COUNT(*) FILTER (
            WHERE status = 'cancelled'
        ) AS cancelled_orders,

        COALESCE(
            SUM(total_amount) FILTER (
                WHERE status = 'completed'
            ),
            0
        ) AS total_revenue,

        COALESCE(
            AVG(total_amount) FILTER (
                WHERE status = 'completed'
            ),
            0
        ) AS average_order_value

    FROM orders
),

customer_metrics AS (

    SELECT
        COUNT(DISTINCT user_id)
            AS active_customers,

        COUNT(DISTINCT user_id) FILTER (
            WHERE total_orders > 1
        ) AS repeat_customers

    FROM (
        SELECT
            user_id,
            COUNT(*) AS total_orders

        FROM orders

        GROUP BY user_id
    ) customer_stats
),

product_metrics AS (

    SELECT
        COUNT(*) AS total_products,

        COUNT(*) FILTER (
            WHERE total_stock = 0
        ) AS out_of_stock_products,

        COUNT(*) FILTER (
            WHERE total_stock < 20
        ) AS low_stock_products

    FROM (
        SELECT
            p.id,

            COALESCE(
                SUM(pv.stock),
                0
            ) AS total_stock

        FROM products p

        LEFT JOIN product_variants pv
            ON pv.product_id = p.id

        GROUP BY p.id
    ) inventory
)

SELECT
    bm.total_orders,
    bm.completed_orders,
    bm.cancelled_orders,

    bm.total_revenue,
    bm.average_order_value,

    cm.active_customers,
    cm.repeat_customers,

    pm.total_products,
    pm.out_of_stock_products,
    pm.low_stock_products

FROM business_metrics bm

CROSS JOIN customer_metrics cm

CROSS JOIN product_metrics pm;


/*
===========================================================
33. FINAL PRODUCTION CHALLENGE
===========================================================

Build a complete E-Commerce Business Intelligence Report.

Your final report should contain:

BUSINESS KPIs
----------------
- Total users
- Total orders
- Completed orders
- Cancelled orders
- Total revenue
- Average order value

CUSTOMER KPIs
----------------
- Active customers
- Repeat customers
- Repeat customer rate
- Top customer
- Customer lifetime value

PRODUCT KPIs
----------------
- Total products
- Units sold
- Top-selling product
- Highest-revenue product
- Low-stock products
- Out-of-stock products

CATEGORY KPIs
----------------
- Top category
- Category revenue
- Category revenue percentage

PAYMENT KPIs
----------------
- Successful payments
- Failed payments
- Payment success rate
- Revenue by payment method

TIME-BASED KPIs
----------------
- Daily revenue
- Monthly revenue
- Month-over-month growth
- Cumulative revenue
- Best sales day
- Best sales month

CUSTOMER SEGMENTATION
----------------
- VIP
- High Value
- Medium Value
- Low Value

ADVANCED ANALYTICS
----------------
- Customer ranking
- Product ranking
- Category contribution
- Customer lifetime value
- Repeat customer rate

Requirements:

1. Use CTEs.
2. Use subqueries.
3. Use JOINs.
4. Use aggregate functions.
5. Use window functions.
6. Use CASE.
7. Use FILTER.
8. Use COUNT(DISTINCT).
9. Use COALESCE.
10. Use NULLIF.
11. Use GROUP BY.
12. Use HAVING.
13. Handle zero-order customers.
14. Handle zero-stock products.
15. Avoid division-by-zero errors.
16. Write production-readable SQL.

===========================================================
FINAL DAY 80 GOAL
===========================================================

By completing this file, you should be able to build
analytics queries for a real-world e-commerce backend.

You have now covered:

PostgreSQL
    ↓
Database Design
    ↓
Relationships
    ↓
JOINs
    ↓
Subqueries
    ↓
CTEs
    ↓
Aggregations
    ↓
Window Functions
    ↓
Business Analytics
    ↓
Production Reporting

===========================================================
END OF DAY 80 — PRODUCTION ANALYTICS ENGINE
===========================================================

