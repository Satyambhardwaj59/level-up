
/*
===========================================================
1. BASIC CTE
===========================================================
*/


-- 1. Create a CTE containing all completed orders.

WITH completed_orders AS (
    SELECT
        id,
        user_id,
        total_amount,
        created_at
    FROM orders
    WHERE status = 'completed'
)
SELECT *
FROM completed_orders;


-- 2. Calculate total completed-order revenue.

WITH completed_orders AS (
    SELECT
        total_amount
    FROM orders
    WHERE status = 'completed'
)
SELECT
    COALESCE(SUM(total_amount), 0) AS total_revenue
FROM completed_orders;


-- 3. Calculate the average completed order value.

WITH completed_orders AS (
    SELECT
        total_amount
    FROM orders
    WHERE status = 'completed'
)
SELECT
    COALESCE(AVG(total_amount), 0) AS average_order_value
FROM completed_orders;


/*
===========================================================
2. CTE WITH GROUP BY
===========================================================
*/


-- 4. Count orders per customer.

WITH customer_orders AS (
    SELECT
        user_id,
        COUNT(*) AS total_orders
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    COALESCE(co.total_orders, 0) AS total_orders
FROM users u
LEFT JOIN customer_orders co
    ON co.user_id = u.id
ORDER BY total_orders DESC;


-- 5. Calculate customer spending.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    cs.total_spending
FROM users u
JOIN customer_spending cs
    ON cs.user_id = u.id
ORDER BY cs.total_spending DESC;


/*
===========================================================
3. CTE WITH HAVING
===========================================================
*/


-- 6. Find customers with more than 2 orders.

WITH customer_orders AS (
    SELECT
        user_id,
        COUNT(*) AS total_orders
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    co.total_orders
FROM users u
JOIN customer_orders co
    ON co.user_id = u.id
WHERE co.total_orders > 2;


-- 7. Find customers spending more than ₹10,000.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    cs.total_spending
FROM users u
JOIN customer_spending cs
    ON cs.user_id = u.id
WHERE cs.total_spending > 10000;


/*
===========================================================
4. PRODUCT ANALYTICS
===========================================================
*/


-- 8. Calculate total quantity sold for each product.

WITH product_sales AS (
    SELECT
        product_id,
        SUM(quantity) AS total_quantity_sold
    FROM order_items
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    COALESCE(ps.total_quantity_sold, 0) AS total_quantity_sold
FROM products p
LEFT JOIN product_sales ps
    ON ps.product_id = p.id
ORDER BY total_quantity_sold DESC;


-- 9. Calculate revenue for each product.

WITH product_revenue AS (
    SELECT
        product_id,
        SUM(quantity * price) AS revenue
    FROM order_items
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    COALESCE(pr.revenue, 0) AS revenue
FROM products p
LEFT JOIN product_revenue pr
    ON pr.product_id = p.id
ORDER BY revenue DESC;


-- 10. Find the top 5 products by revenue.

WITH product_revenue AS (
    SELECT
        product_id,
        SUM(quantity * price) AS revenue
    FROM order_items
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    pr.revenue
FROM product_revenue pr
JOIN products p
    ON p.id = pr.product_id
ORDER BY pr.revenue DESC
LIMIT 5;


/*
===========================================================
5. CATEGORY ANALYTICS
===========================================================
*/


-- 11. Calculate revenue by category.

WITH category_revenue AS (
    SELECT
        p.category_id,
        SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN products p
        ON p.id = oi.product_id
    GROUP BY p.category_id
)
SELECT
    c.id,
    c.name,
    COALESCE(cr.revenue, 0) AS revenue
FROM categories c
LEFT JOIN category_revenue cr
    ON cr.category_id = c.id
ORDER BY revenue DESC;


-- 12. Find categories generating more than ₹5,000.

WITH category_revenue AS (
    SELECT
        p.category_id,
        SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN products p
        ON p.id = oi.product_id
    GROUP BY p.category_id
)
SELECT
    c.id,
    c.name,
    cr.revenue
FROM category_revenue cr
JOIN categories c
    ON c.id = cr.category_id
WHERE cr.revenue > 5000;


/*
===========================================================
6. MULTIPLE CTEs
===========================================================
*/


-- 13. Build a customer analytics report.

WITH customer_orders AS (
    SELECT
        user_id,
        COUNT(*) AS total_orders
    FROM orders
    GROUP BY user_id
),
customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    COALESCE(co.total_orders, 0) AS total_orders,
    COALESCE(cs.total_spending, 0) AS total_spending
FROM users u
LEFT JOIN customer_orders co
    ON co.user_id = u.id
LEFT JOIN customer_spending cs
    ON cs.user_id = u.id
ORDER BY total_spending DESC;


-- 14. Customer order statistics.

WITH customer_stats AS (
    SELECT
        user_id,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS total_spending,
        AVG(total_amount) AS average_order_value,
        MIN(total_amount) AS smallest_order,
        MAX(total_amount) AS largest_order
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    COALESCE(cs.total_orders, 0) AS total_orders,
    COALESCE(cs.total_spending, 0) AS total_spending,
    COALESCE(cs.average_order_value, 0) AS average_order_value,
    cs.smallest_order,
    cs.largest_order
FROM users u
LEFT JOIN customer_stats cs
    ON cs.user_id = u.id
ORDER BY total_spending DESC;


/*
===========================================================
7. CTE + PAYMENT ANALYTICS
===========================================================
*/


-- 15. Calculate successful payment revenue.

WITH successful_payments AS (
    SELECT
        order_id,
        amount
    FROM payments
    WHERE status = 'success'
)
SELECT
    COALESCE(SUM(amount), 0) AS successful_payment_revenue
FROM successful_payments;


-- 16. Payment statistics by payment method.

WITH payment_stats AS (
    SELECT
        payment_method,
        COUNT(*) AS total_payments,
        SUM(amount) AS total_amount,
        AVG(amount) AS average_amount
    FROM payments
    WHERE status = 'success'
    GROUP BY payment_method
)
SELECT
    payment_method,
    total_payments,
    total_amount,
    average_amount
FROM payment_stats
ORDER BY total_amount DESC;


/*
===========================================================
8. CTE + JOIN ANALYTICS
===========================================================
*/


-- 17. Find the top-spending customer.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
),
ranked_customers AS (
    SELECT
        user_id,
        total_spending,
        RANK() OVER (
            ORDER BY total_spending DESC
        ) AS spending_rank
    FROM customer_spending
)
SELECT
    u.id,
    u.name,
    rc.total_spending,
    rc.spending_rank
FROM ranked_customers rc
JOIN users u
    ON u.id = rc.user_id
WHERE rc.spending_rank = 1;


-- 18. Rank products by revenue.

WITH product_revenue AS (
    SELECT
        product_id,
        SUM(quantity * price) AS revenue
    FROM order_items
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    pr.revenue,
    RANK() OVER (
        ORDER BY pr.revenue DESC
    ) AS revenue_rank
FROM product_revenue pr
JOIN products p
    ON p.id = pr.product_id;


/*
===========================================================
9. CTE + WINDOW FUNCTIONS
===========================================================
*/


-- 19. Rank customers by total spending.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    cs.total_spending,
    RANK() OVER (
        ORDER BY cs.total_spending DESC
    ) AS spending_rank
FROM customer_spending cs
JOIN users u
    ON u.id = cs.user_id;


-- 20. Rank products inside each category.

WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        p.category_id,
        COALESCE(
            SUM(oi.quantity * oi.price),
            0
        ) AS revenue
    FROM products p
    LEFT JOIN order_items oi
        ON oi.product_id = p.id
    GROUP BY
        p.id,
        p.name,
        p.category_id
)
SELECT
    pr.*,
    RANK() OVER (
        PARTITION BY category_id
        ORDER BY revenue DESC
    ) AS category_rank
FROM product_revenue pr;


/*
===========================================================
10. TOP PRODUCTS PER CATEGORY
===========================================================
*/


-- 21. Find the top 3 products in every category.

WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        p.category_id,
        COALESCE(
            SUM(oi.quantity * oi.price),
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
    rp.name,
    c.name AS category_name,
    rp.revenue,
    rp.product_rank
FROM ranked_products rp
JOIN categories c
    ON c.id = rp.category_id
WHERE rp.product_rank <= 3
ORDER BY
    c.name,
    rp.product_rank;


/*
===========================================================
11. CUSTOMER PRODUCT ANALYTICS
===========================================================
*/


-- 22. Count unique products purchased by each customer.

WITH customer_products AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT oi.product_id) AS unique_products
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    GROUP BY o.user_id
)
SELECT
    u.id,
    u.name,
    COALESCE(cp.unique_products, 0) AS unique_products
FROM users u
LEFT JOIN customer_products cp
    ON cp.user_id = u.id
ORDER BY unique_products DESC;


-- 23. Count categories purchased by each customer.

WITH customer_categories AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT p.category_id) AS categories_purchased
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    JOIN products p
        ON p.id = oi.product_id
    GROUP BY o.user_id
)
SELECT
    u.id,
    u.name,
    COALESCE(cc.categories_purchased, 0) AS categories_purchased
FROM users u
LEFT JOIN customer_categories cc
    ON cc.user_id = u.id
ORDER BY categories_purchased DESC;


/*
===========================================================
12. MONTHLY SALES ANALYTICS
===========================================================
*/


-- 24. Calculate monthly revenue.

WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
    month,
    revenue
FROM monthly_sales
ORDER BY month;


-- 25. Calculate monthly order count.

WITH monthly_orders AS (
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS total_orders
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
    month,
    total_orders
FROM monthly_orders
ORDER BY month;


/*
===========================================================
13. MONTH-OVER-MONTH ANALYTICS
===========================================================
*/


-- 26. Calculate monthly revenue growth.

WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
),
monthly_growth AS (
    SELECT
        month,
        revenue,
        LAG(revenue) OVER (
            ORDER BY month
        ) AS previous_month_revenue
    FROM monthly_sales
)
SELECT
    month,
    revenue,
    previous_month_revenue,
    revenue - previous_month_revenue AS revenue_change,
    CASE
        WHEN previous_month_revenue IS NULL
            THEN NULL
        WHEN previous_month_revenue = 0
            THEN NULL
        ELSE ROUND(
            (
                (revenue - previous_month_revenue)
                / previous_month_revenue
            ) * 100,
            2
        )
    END AS growth_percentage
FROM monthly_growth
ORDER BY month;


/*
===========================================================
14. RUNNING REVENUE
===========================================================
*/


-- 27. Calculate cumulative revenue over time.

WITH daily_sales AS (
    SELECT
        created_at::date AS sale_date,
        SUM(total_amount) AS daily_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY created_at::date
)
SELECT
    sale_date,
    daily_revenue,
    SUM(daily_revenue) OVER (
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING
        AND CURRENT ROW
    ) AS cumulative_revenue
FROM daily_sales
ORDER BY sale_date;


/*
===========================================================
15. AVERAGE ORDER VALUE
===========================================================
*/


-- 28. Calculate monthly AOV.

WITH monthly_orders AS (
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS total_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
    month,
    total_orders,
    total_revenue,
    ROUND(
        total_revenue / NULLIF(total_orders, 0),
        2
    ) AS average_order_value
FROM monthly_orders
ORDER BY month;


/*
===========================================================
16. CUSTOMER SEGMENTATION
===========================================================
*/


-- 29. Segment customers according to total spending.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    cs.total_spending,
    CASE
        WHEN cs.total_spending >= 50000
            THEN 'VIP'
        WHEN cs.total_spending >= 20000
            THEN 'High Value'
        WHEN cs.total_spending >= 10000
            THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_segment
FROM customer_spending cs
JOIN users u
    ON u.id = cs.user_id
ORDER BY cs.total_spending DESC;


/*
===========================================================
17. CUSTOMER RANKING
===========================================================
*/


-- 30. Rank customers by revenue contribution.

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending
    FROM orders
    WHERE status = 'completed'
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    cs.total_spending,
    ROUND(
        (
            cs.total_spending
            / NULLIF(SUM(cs.total_spending) OVER (), 0)
        ) * 100,
        2
    ) AS revenue_percentage,
    RANK() OVER (
        ORDER BY cs.total_spending DESC
    ) AS customer_rank
FROM customer_spending cs
JOIN users u
    ON u.id = cs.user_id
ORDER BY customer_rank;


/*
===========================================================
18. PRODUCT SALES CONTRIBUTION
===========================================================
*/


-- 31. Calculate each product's percentage contribution
-- to total revenue.

WITH product_revenue AS (
    SELECT
        product_id,
        SUM(quantity * price) AS revenue
    FROM order_items
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    pr.revenue,
    ROUND(
        (
            pr.revenue
            / NULLIF(SUM(pr.revenue) OVER (), 0)
        ) * 100,
        2
    ) AS revenue_percentage
FROM product_revenue pr
JOIN products p
    ON p.id = pr.product_id
ORDER BY pr.revenue DESC;


/*
===========================================================
19. LOW STOCK ANALYTICS
===========================================================
*/


-- 32. Find low-stock product variants.

WITH stock_summary AS (
    SELECT
        product_id,
        SUM(stock) AS total_stock,
        MIN(stock) AS minimum_variant_stock
    FROM product_variants
    GROUP BY product_id
)
SELECT
    p.id,
    p.name,
    ss.total_stock,
    ss.minimum_variant_stock
FROM stock_summary ss
JOIN products p
    ON p.id = ss.product_id
WHERE ss.total_stock < 20
ORDER BY ss.total_stock;


/*
===========================================================
20. MULTI-CTE PRODUCTION REPORT
===========================================================
*/


-- 33. Create a complete product performance report.

WITH product_sales AS (
    SELECT
        product_id,
        SUM(quantity) AS units_sold,
        SUM(quantity * price) AS revenue
    FROM order_items
    GROUP BY product_id
),
product_stock AS (
    SELECT
        product_id,
        SUM(stock) AS total_stock
    FROM product_variants
    GROUP BY product_id
),
product_ranking AS (
    SELECT
        product_id,
        units_sold,
        revenue,
        RANK() OVER (
            ORDER BY revenue DESC
        ) AS revenue_rank
    FROM product_sales
)
SELECT
    p.id,
    p.name,
    COALESCE(pr.units_sold, 0) AS units_sold,
    COALESCE(pr.revenue, 0) AS revenue,
    COALESCE(ps.total_stock, 0) AS total_stock,
    pr.revenue_rank
FROM products p
LEFT JOIN product_ranking pr
    ON pr.product_id = p.id
LEFT JOIN product_stock ps
    ON ps.product_id = p.id
ORDER BY revenue_rank;


/*
===========================================================
21. CUSTOMER 360 REPORT
===========================================================
*/


-- 34. Build a Customer 360 analytics report.

WITH order_stats AS (
    SELECT
        user_id,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS total_spending,
        AVG(total_amount) AS average_order_value,
        MAX(created_at) AS latest_order_date
    FROM orders
    GROUP BY user_id
),
product_stats AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT oi.product_id) AS unique_products
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    GROUP BY o.user_id
),
category_stats AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT p.category_id) AS categories_purchased
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    JOIN products p
        ON p.id = oi.product_id
    GROUP BY o.user_id
),
payment_stats AS (
    SELECT
        o.user_id,
        COUNT(p.id) FILTER (
            WHERE p.status = 'success'
        ) AS successful_payments
    FROM orders o
    LEFT JOIN payments p
        ON p.order_id = o.id
    GROUP BY o.user_id
)
SELECT
    u.id,
    u.name,
    u.email,

    COALESCE(os.total_orders, 0) AS total_orders,

    COALESCE(os.total_spending, 0) AS total_spending,

    COALESCE(
        os.average_order_value,
        0
    ) AS average_order_value,

    os.latest_order_date,

    COALESCE(
        ps.unique_products,
        0
    ) AS unique_products,

    COALESCE(
        cs.categories_purchased,
        0
    ) AS categories_purchased,

    COALESCE(
        pay.successful_payments,
        0
    ) AS successful_payments

FROM users u

LEFT JOIN order_stats os
    ON os.user_id = u.id

LEFT JOIN product_stats ps
    ON ps.user_id = u.id

LEFT JOIN category_stats cs
    ON cs.user_id = u.id

LEFT JOIN payment_stats pay
    ON pay.user_id = u.id

ORDER BY total_spending DESC;


/*
===========================================================
22. RECURSIVE CTE
===========================================================

This challenge demonstrates recursive CTE syntax.

It can be useful for:
- Category trees
- Product hierarchies
- Referral systems
- Organization structures
- Nested relationships

The following example assumes a self-referencing
category structure with:

categories.id
categories.name
categories.parent_id

If your current schema does not have parent_id,
treat this as a practice extension.
===========================================================
*/


-- 35. Generate a category hierarchy.

WITH RECURSIVE category_tree AS (

    SELECT
        id,
        name,
        parent_id,
        0 AS level,
        name::TEXT AS path
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    SELECT
        c.id,
        c.name,
        c.parent_id,
        ct.level + 1,
        ct.path || ' > ' || c.name
    FROM categories c
    JOIN category_tree ct
        ON c.parent_id = ct.id
)

SELECT
    id,
    name,
    parent_id,
    level,
    path
FROM category_tree
ORDER BY path;


/*
===========================================================
23. RECURSIVE NUMBER GENERATOR
===========================================================
*/


-- 36. Generate numbers from 1 to 10.

WITH RECURSIVE numbers AS (

    SELECT 1 AS number

    UNION ALL

    SELECT number + 1
    FROM numbers
    WHERE number < 10
)

SELECT number
FROM numbers;


/*
===========================================================
24. FINAL CHALLENGE
===========================================================

Build a Production E-Commerce Analytics Dashboard
using CTEs.

Return:

Customer:
- user_id
- customer_name
- email

Orders:
- total_orders
- completed_orders
- cancelled_orders
- average_order_value
- latest_order_date

Revenue:
- total_spending
- successful_payment_amount

Products:
- unique_products
- categories_purchased

Ranking:
- customer_rank
- revenue_percentage

Customer Segment:
- VIP
- High Value
- Medium Value
- Low Value

Requirements:

1. Use multiple CTEs.
2. Use LEFT JOIN.
3. Use GROUP BY.
4. Use COUNT(DISTINCT).
5. Use COALESCE.
6. Use FILTER where appropriate.
7. Use window functions.
8. Include customers with zero orders.
9. Rank customers by completed-order revenue.
10. Calculate each customer's percentage of total revenue.

===========================================================
*/


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

        AVG(total_amount) AS average_order_value,

        SUM(total_amount) FILTER (
            WHERE status = 'completed'
        ) AS total_spending,

        MAX(created_at) AS latest_order_date

    FROM orders
    GROUP BY user_id
),

customer_products AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT oi.product_id) AS unique_products
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    GROUP BY o.user_id
),

customer_categories AS (
    SELECT
        o.user_id,
        COUNT(DISTINCT p.category_id) AS categories_purchased
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    JOIN products p
        ON p.id = oi.product_id
    GROUP BY o.user_id
),

successful_payments AS (
    SELECT
        o.user_id,
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
),

ranked_customers AS (
    SELECT
        user_id,
        COALESCE(total_spending, 0) AS total_spending,

        RANK() OVER (
            ORDER BY COALESCE(
                total_spending,
                0
            ) DESC
        ) AS customer_rank,

        ROUND(
            (
                COALESCE(total_spending, 0)
                /
                NULLIF(
                    SUM(
                        COALESCE(
                            total_spending,
                            0
                        )
                    ) OVER (),
                    0
                )
            ) * 100,
            2
        ) AS revenue_percentage

    FROM customer_orders
)

SELECT
    u.id AS user_id,
    u.name AS customer_name,
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
        co.average_order_value,
        0
    ) AS average_order_value,

    COALESCE(
        co.total_spending,
        0
    ) AS total_spending,

    co.latest_order_date,

    COALESCE(
        cp.unique_products,
        0
    ) AS unique_products,

    COALESCE(
        cc.categories_purchased,
        0
    ) AS categories_purchased,

    COALESCE(
        sp.successful_payment_amount,
        0
    ) AS successful_payment_amount,

    COALESCE(
        rc.customer_rank,
        0
    ) AS customer_rank,

    COALESCE(
        rc.revenue_percentage,
        0
    ) AS revenue_percentage,

    CASE
        WHEN COALESCE(co.total_spending, 0) >= 50000
            THEN 'VIP'

        WHEN COALESCE(co.total_spending, 0) >= 20000
            THEN 'High Value'

        WHEN COALESCE(co.total_spending, 0) >= 10000
            THEN 'Medium Value'

        ELSE 'Low Value'
    END AS customer_segment

FROM users u

LEFT JOIN customer_orders co
    ON co.user_id = u.id

LEFT JOIN customer_products cp
    ON cp.user_id = u.id

LEFT JOIN customer_categories cc
    ON cc.user_id = u.id

LEFT JOIN successful_payments sp
    ON sp.user_id = u.id

LEFT JOIN ranked_customers rc
    ON rc.user_id = u.id

ORDER BY
    total_spending DESC;


/*
===========================================================
END OF PART 3 — CTE CHALLENGES
===========================================================
*/

