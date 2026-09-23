
-- ============================================
-- DAY 81 — PRODUCT ANALYTICS
-- ============================================

-- 1. Product rank within category
SELECT
    c.name AS category,
    p.name AS product,
    p.price,
    RANK() OVER (
        PARTITION BY c.id
        ORDER BY p.price DESC
    ) AS product_rank
FROM products p
JOIN categories c
    ON c.id = p.category_id
ORDER BY c.name, product_rank;


-- 2. Top 3 products per category
WITH ranked_products AS (
    SELECT
        c.name AS category,
        p.name AS product,
        p.price,
        RANK() OVER (
            PARTITION BY c.id
            ORDER BY p.price DESC
        ) AS rank
    FROM products p
    JOIN categories c
        ON c.id = p.category_id
)
SELECT
    category,
    product,
    price,
    rank
FROM ranked_products
WHERE rank <= 3
ORDER BY category, rank;


-- 3. Average product price by category
SELECT
    c.name AS category,
    ROUND(AVG(p.price), 2) AS average_price
FROM products p
JOIN categories c
    ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY category;


-- 4. Difference from category average
SELECT
    c.name AS category,
    p.name AS product,
    p.price,
    ROUND(
        p.price - AVG(p.price) OVER (
            PARTITION BY p.category_id
        ),
        2
    ) AS difference_from_category_average
FROM products p
JOIN categories c
    ON c.id = p.category_id
ORDER BY category, difference_from_category_average DESC;


-- 5. Most expensive product per category
WITH ranked_products AS (
    SELECT
        c.name AS category,
        p.name AS product,
        p.price,
        ROW_NUMBER() OVER (
            PARTITION BY p.category_id
            ORDER BY p.price DESC
        ) AS row_num
    FROM products p
    JOIN categories c
        ON c.id = p.category_id
)
SELECT
    category,
    product,
    price
FROM ranked_products
WHERE row_num = 1;


-- 6. Cheapest product per category
WITH ranked_products AS (
    SELECT
        c.name AS category,
        p.name AS product,
        p.price,
        ROW_NUMBER() OVER (
            PARTITION BY p.category_id
            ORDER BY p.price ASC
        ) AS row_num
    FROM products p
    JOIN categories c
        ON c.id = p.category_id
)
SELECT
    category,
    product,
    price
FROM ranked_products
WHERE row_num = 1;


-- 7. Product revenue rank
WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        SUM(oi.quantity * oi.price) AS revenue
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY p.id, p.name
)
SELECT
    product_id,
    product,
    revenue,
    RANK() OVER (
        ORDER BY revenue DESC
    ) AS revenue_rank
FROM product_revenue
ORDER BY revenue_rank;


-- 8. Product contribution to category revenue
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
)
SELECT
    c.name AS category,
    pr.product,
    pr.revenue,
    ROUND(
        pr.revenue * 100.0 /
        SUM(pr.revenue) OVER (
            PARTITION BY pr.category_id
        ),
        2
    ) AS category_revenue_percentage
FROM product_revenue pr
JOIN categories c
    ON c.id = pr.category_id
ORDER BY category, pr.revenue DESC;


-- 9. Running product sales
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
)
SELECT
    product_id,
    product,
    total_sales,
    SUM(total_sales) OVER (
        ORDER BY total_sales DESC
    ) AS running_sales
FROM product_sales
ORDER BY total_sales DESC;


-- 10. Product sales compared with previous product
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
sales_comparison AS (
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
FROM sales_comparison
ORDER BY total_sales DESC;


-- 11. Product revenue rank within category
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
)
SELECT
    c.name AS category,
    pr.product,
    pr.revenue,
    RANK() OVER (
        PARTITION BY pr.category_id
        ORDER BY pr.revenue DESC
    ) AS category_revenue_rank
FROM product_revenue pr
JOIN categories c
    ON c.id = pr.category_id
ORDER BY category, category_revenue_rank;


-- 12. Final Challenge — Top 3 Products Per Category
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
