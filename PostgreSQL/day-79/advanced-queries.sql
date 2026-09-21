
-- =========================================================
-- DAY 79 — PRODUCTION E-COMMERCE QUERY ENGINE
-- advanced-queries.sql
-- =========================================================
--
-- Advanced PostgreSQL Queries
--
-- Topics:
-- 1. EXISTS
-- 2. NOT EXISTS
-- 3. Correlated Subqueries
-- 4. Subqueries
-- 5. Aggregation
-- 6. HAVING
-- 7. Multiple Conditions
-- 8. CTEs
-- 9. Window Functions
-- 10. Ranking
-- 11. Running Totals
-- 12. Production E-Commerce Reports
--
-- =========================================================


-- =========================================================
-- 1. EXISTS
-- =========================================================

-- 1. Users who have at least one order

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


-- 2. Users who have completed orders

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
      AND o.status = 'completed'
);


-- 3. Users who have at least one order above ₹5,000

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
      AND o.total_amount > 5000
);


-- 4. Products that have been purchased

SELECT
    p.id,
    p.name
FROM products p
WHERE EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);


-- 5. Categories that contain at least one product

SELECT
    c.id,
    c.name
FROM categories c
WHERE EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);


-- =========================================================
-- 2. NOT EXISTS
-- =========================================================

-- 6. Users without orders

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


-- 7. Products never purchased

SELECT
    p.id,
    p.name
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);


-- 8. Categories without products

SELECT
    c.id,
    c.name
FROM categories c
WHERE NOT EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);


-- 9. Orders without payments

SELECT
    o.id,
    o.user_id,
    o.total_amount,
    o.status
FROM orders o
WHERE NOT EXISTS (
    SELECT 1
    FROM payments p
    WHERE p.order_id = o.id
);


-- 10. Users without addresses

SELECT
    u.id,
    u.name
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM addresses a
    WHERE a.user_id = u.id
);


-- =========================================================
-- 3. CORRELATED SUBQUERIES
-- =========================================================

-- 11. Users whose order count is greater than 1

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(*)
    FROM orders o
    WHERE o.user_id = u.id
) > 1;


-- 12. Users whose total spending is greater than ₹10,000

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COALESCE(SUM(o.total_amount), 0)
    FROM orders o
    WHERE o.user_id = u.id
) > 10000;


-- 13. Products purchased more than once

SELECT
    p.id,
    p.name
FROM products p
WHERE (
    SELECT COALESCE(SUM(oi.quantity), 0)
    FROM order_items oi
    WHERE oi.product_id = p.id
) > 1;


-- =========================================================
-- 4. SUBQUERIES
-- =========================================================

-- 14. Orders above average order value

SELECT
    id,
    user_id,
    total_amount
FROM orders
WHERE total_amount > (
    SELECT AVG(total_amount)
    FROM orders
);


-- 15. Products above average product price

SELECT
    id,
    name,
    base_price
FROM products
WHERE base_price > (
    SELECT AVG(base_price)
    FROM products
);


-- 16. Most expensive product

SELECT
    id,
    name,
    base_price
FROM products
WHERE base_price = (
    SELECT MAX(base_price)
    FROM products
);


-- 17. Cheapest product

SELECT
    id,
    name,
    base_price
FROM products
WHERE base_price = (
    SELECT MIN(base_price)
    FROM products
);


-- =========================================================
-- 5. AGGREGATION + HAVING
-- =========================================================

-- 18. Customers with more than one order

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


-- 19. Customers who purchased more than 5 products

SELECT
    u.id,
    u.name,
    SUM(oi.quantity) AS total_products
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY
    u.id,
    u.name
HAVING SUM(oi.quantity) > 5;


-- 20. Customers who purchased products from multiple categories

SELECT
    u.id,
    u.name,
    COUNT(DISTINCT p.category_id) AS category_count
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
GROUP BY
    u.id,
    u.name
HAVING COUNT(DISTINCT p.category_id) > 1;


-- 21. Categories with more than 2 products

SELECT
    c.id,
    c.name,
    COUNT(p.id) AS product_count
FROM categories c
INNER JOIN products p
    ON c.id = p.category_id
GROUP BY
    c.id,
    c.name
HAVING COUNT(p.id) > 2;


-- 22. Products ordered more than twice

SELECT
    p.id,
    p.name,
    COUNT(oi.id) AS order_item_count
FROM products p
INNER JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY
    p.id,
    p.name
HAVING COUNT(oi.id) > 2;


-- =========================================================
-- 6. MULTIPLE CONDITIONS
-- =========================================================

-- 23. Customers with at least 2 orders
-- AND spending more than ₹5,000

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders,
    SUM(o.total_amount) AS total_spending
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
HAVING COUNT(o.id) >= 2
   AND SUM(o.total_amount) > 5000;


-- 24. Customers with:
-- at least 2 orders
-- and products from at least 2 categories

SELECT
    u.id,
    u.name,
    COUNT(DISTINCT o.id) AS order_count,
    COUNT(DISTINCT p.category_id) AS category_count
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
GROUP BY
    u.id,
    u.name
HAVING COUNT(DISTINCT o.id) >= 2
   AND COUNT(DISTINCT p.category_id) >= 2;


-- =========================================================
-- 7. PRODUCTS AND CUSTOMER RELATIONSHIPS
-- =========================================================

-- 25. Products purchased by more than one customer

SELECT
    p.id,
    p.name,
    COUNT(DISTINCT o.user_id) AS customer_count
FROM products p
INNER JOIN order_items oi
    ON p.id = oi.product_id
INNER JOIN orders o
    ON oi.order_id = o.id
GROUP BY
    p.id,
    p.name
HAVING COUNT(DISTINCT o.user_id) > 1;


-- 26. Customers who purchased a specific product

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


-- 27. Customers who purchased from Electronics

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
INNER JOIN categories c
    ON p.category_id = c.id
WHERE c.name = 'Electronics';


-- =========================================================
-- 8. REVENUE ANALYSIS
-- =========================================================

-- 28. Total revenue

SELECT
    COALESCE(SUM(total_amount), 0) AS total_revenue
FROM orders
WHERE status = 'completed';


-- 29. Revenue by customer

SELECT
    u.id,
    u.name,
    COALESCE(SUM(o.total_amount), 0) AS total_spending
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
   AND o.status = 'completed'
GROUP BY
    u.id,
    u.name
ORDER BY total_spending DESC;


-- 30. Revenue by category

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
ORDER BY revenue DESC;


-- 31. Revenue by product

SELECT
    p.id,
    p.name,
    SUM(oi.quantity * oi.price) AS revenue
FROM products p
INNER JOIN order_items oi
    ON p.id = oi.product_id
INNER JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY
    p.id,
    p.name
ORDER BY revenue DESC;


-- =========================================================
-- 9. COMMON TABLE EXPRESSIONS (CTEs)
-- =========================================================

-- 32. Customer spending using CTE

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
    cs.total_spending
FROM users u
INNER JOIN customer_spending cs
    ON u.id = cs.user_id
ORDER BY cs.total_spending DESC;


-- 33. Product sales using CTE

WITH product_sales AS (
    SELECT
        product_id,
        SUM(quantity) AS total_quantity
    FROM order_items
    GROUP BY product_id
)

SELECT
    p.id,
    p.name,
    ps.total_quantity
FROM products p
INNER JOIN product_sales ps
    ON p.id = ps.product_id
ORDER BY ps.total_quantity DESC;


-- 34. Category revenue using CTE

WITH category_revenue AS (
    SELECT
        p.category_id,
        SUM(oi.quantity * oi.price) AS revenue
    FROM products p
    INNER JOIN order_items oi
        ON p.id = oi.product_id
    INNER JOIN orders o
        ON oi.order_id = o.id
    WHERE o.status = 'completed'
    GROUP BY p.category_id
)

SELECT
    c.id,
    c.name,
    cr.revenue
FROM categories c
INNER JOIN category_revenue cr
    ON c.id = cr.category_id
ORDER BY cr.revenue DESC;


-- =========================================================
-- 10. WINDOW FUNCTIONS
-- =========================================================

-- 35. Rank customers by spending

SELECT
    u.id,
    u.name,
    SUM(o.total_amount) AS total_spending,
    RANK() OVER (
        ORDER BY SUM(o.total_amount) DESC
    ) AS spending_rank
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY
    u.id,
    u.name;


-- 36. Rank products by revenue

SELECT
    p.id,
    p.name,
    SUM(oi.quantity * oi.price) AS revenue,
    RANK() OVER (
        ORDER BY SUM(oi.quantity * oi.price) DESC
    ) AS revenue_rank
FROM products p
INNER JOIN order_items oi
    ON p.id = oi.product_id
INNER JOIN orders o
    ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY
    p.id,
    p.name;


-- 37. Number products within each category

SELECT
    p.id,
    p.name,
    c.name AS category,
    ROW_NUMBER() OVER (
        PARTITION BY p.category_id
        ORDER BY p.base_price DESC
    ) AS category_position
FROM products p
INNER JOIN categories c
    ON p.category_id = c.id;


-- =========================================================
-- 11. TOP PRODUCT PER CATEGORY
-- =========================================================

-- 38. Most expensive product in every category

WITH ranked_products AS (
    SELECT
        p.id,
        p.name,
        p.category_id,
        p.base_price,
        ROW_NUMBER() OVER (
            PARTITION BY p.category_id
            ORDER BY p.base_price DESC
        ) AS row_num
    FROM products p
)

SELECT
    rp.id,
    rp.name,
    c.name AS category,
    rp.base_price
FROM ranked_products rp
INNER JOIN categories c
    ON rp.category_id = c.id
WHERE rp.row_num = 1;


-- =========================================================
-- 12. RUNNING TOTAL
-- =========================================================

-- 39. Running revenue by order

SELECT
    id AS order_id,
    created_at,
    total_amount,
    SUM(total_amount) OVER (
        ORDER BY created_at
    ) AS running_revenue
FROM orders
WHERE status = 'completed'
ORDER BY created_at;


-- =========================================================
-- 13. CUSTOMER ORDER ANALYTICS
-- =========================================================

-- 40. Customer order number

SELECT
    u.name AS customer,
    o.id AS order_id,
    o.created_at,
    o.total_amount,
    ROW_NUMBER() OVER (
        PARTITION BY u.id
        ORDER BY o.created_at
    ) AS customer_order_number
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
ORDER BY
    u.id,
    o.created_at;


-- 41. First order of every customer

WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at
        ) AS order_number
    FROM orders o
)

SELECT
    u.name,
    ro.id AS order_id,
    ro.created_at,
    ro.total_amount
FROM ranked_orders ro
INNER JOIN users u
    ON ro.user_id = u.id
WHERE ro.order_number = 1;


-- 42. Latest order of every customer

WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at DESC
        ) AS order_number
    FROM orders o
)

SELECT
    u.name,
    ro.id AS order_id,
    ro.created_at,
    ro.total_amount
FROM ranked_orders ro
INNER JOIN users u
    ON ro.user_id = u.id
WHERE ro.order_number = 1;


-- =========================================================
-- 14. AVERAGE ORDER VALUE
-- =========================================================

-- 43. Average order value

SELECT
    AVG(total_amount) AS average_order_value
FROM orders;


-- 44. Average order value per customer

SELECT
    u.id,
    u.name,
    AVG(o.total_amount) AS average_order_value
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
ORDER BY average_order_value DESC;


-- =========================================================
-- 15. HIGH-VALUE CUSTOMERS
-- =========================================================

-- 45. Customers spending more than average customer spending

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
    cs.total_spending
FROM users u
INNER JOIN customer_spending cs
    ON u.id = cs.user_id
WHERE cs.total_spending > (
    SELECT AVG(total_spending)
    FROM customer_spending
)
ORDER BY cs.total_spending DESC;


-- =========================================================
-- 16. PRODUCTS NEVER PURCHASED
-- =========================================================

-- 46. Products that have never been purchased

SELECT
    p.id,
    p.name,
    p.base_price
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);


-- =========================================================
-- 17. CUSTOMERS WHO PURCHASED MORE THAN 5 PRODUCTS
-- =========================================================

-- 47. Customers who purchased more than 5 total units

SELECT
    u.id,
    u.name,
    SUM(oi.quantity) AS total_products
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY
    u.id,
    u.name
HAVING SUM(oi.quantity) > 5;


-- =========================================================
-- 18. CUSTOMERS WITH MULTIPLE CATEGORIES
-- =========================================================

-- 48. Customers who purchased from 2+ categories

SELECT
    u.id,
    u.name,
    COUNT(DISTINCT p.category_id) AS categories_purchased
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
GROUP BY
    u.id,
    u.name
HAVING COUNT(DISTINCT p.category_id) >= 2;


-- =========================================================
-- 19. PAYMENT ANALYSIS
-- =========================================================

-- 49. Orders without successful payment

SELECT
    o.id,
    o.user_id,
    o.total_amount,
    o.status
FROM orders o
LEFT JOIN payments p
    ON o.id = p.order_id
WHERE p.id IS NULL
   OR p.payment_status <> 'success';


-- 50. Successfully paid orders

SELECT
    o.id AS order_id,
    o.total_amount,
    p.payment_method,
    p.payment_status
FROM orders o
INNER JOIN payments p
    ON o.id = p.order_id
WHERE p.payment_status = 'success';


-- =========================================================
-- 20. FINAL PRODUCTION E-COMMERCE REPORT
-- =========================================================
--
-- Customer
-- Total Orders
-- Total Products
-- Total Spending
-- Average Order Value
-- Categories Purchased
-- =========================================================

WITH customer_stats AS (

    SELECT
        u.id AS user_id,
        u.name,
        u.email,

        COUNT(DISTINCT o.id) AS total_orders,

        COALESCE(
            SUM(oi.quantity),
            0
        ) AS total_products,

        COALESCE(
            SUM(o.total_amount),
            0
        ) AS total_spending,

        COALESCE(
            AVG(o.total_amount),
            0
        ) AS average_order_value,

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
        u.name,
        u.email
)

SELECT
    user_id,
    name,
    email,
    total_orders,
    total_products,
    ROUND(total_spending, 2) AS total_spending,
    ROUND(average_order_value, 2) AS average_order_value,
    categories_purchased
FROM customer_stats
ORDER BY total_spending DESC;


-- =========================================================
-- 21. FINAL ADVANCED CHALLENGE
-- =========================================================
--
-- Find customers who:
--
-- 1. Have at least 2 orders
-- 2. Spent more than ₹5,000
-- 3. Purchased from at least 2 categories
-- 4. Have at least one successful payment
--
-- =========================================================

SELECT
    u.id,
    u.name,

    COUNT(DISTINCT o.id) AS total_orders,

    SUM(DISTINCT o.total_amount) AS total_spending,

    COUNT(DISTINCT p.category_id) AS categories_purchased

FROM users u

INNER JOIN orders o
    ON u.id = o.user_id

INNER JOIN order_items oi
    ON o.id = oi.order_id

INNER JOIN products p
    ON oi.product_id = p.id

WHERE EXISTS (
    SELECT 1
    FROM payments pay
    WHERE pay.order_id = o.id
      AND pay.payment_status = 'success'
)

GROUP BY
    u.id,
    u.name

HAVING COUNT(DISTINCT o.id) >= 2
   AND SUM(DISTINCT o.total_amount) > 5000
   AND COUNT(DISTINCT p.category_id) >= 2;


-- =========================================================
-- END OF advanced-queries.sql
-- =========================================================
