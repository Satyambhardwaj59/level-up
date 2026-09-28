-- ==========================================
-- TOP CUSTOMERS
-- ==========================================

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS orders,
    COALESCE(SUM(o.total_amount), 0) AS spending
FROM users u
LEFT JOIN orders o
    ON o.user_id = u.id
GROUP BY u.id
ORDER BY spending DESC
LIMIT 20;


-- ==========================================
-- TOP PRODUCTS
-- ==========================================

SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.price) AS revenue
FROM products p
JOIN order_items oi
    ON oi.product_id = p.id
JOIN orders o
    ON o.id = oi.order_id
WHERE o.status <> 'cancelled'
GROUP BY p.id
ORDER BY revenue DESC
LIMIT 20;


-- ==========================================
-- REVENUE BY STATUS
-- ==========================================

SELECT
    status,
    COUNT(*) AS order_count,
    SUM(total_amount) AS revenue
FROM orders
GROUP BY status
ORDER BY revenue DESC;


-- ==========================================
-- DAILY REVENUE
-- ==========================================

SELECT
    DATE(created_at) AS order_date,
    COUNT(*) AS orders,
    SUM(total_amount) AS revenue
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;


-- ==========================================
-- CATEGORY PERFORMANCE
-- ==========================================

SELECT
    c.name AS category,

    COUNT(DISTINCT o.id) AS orders,

    SUM(oi.quantity) AS units,

    SUM(oi.quantity * oi.price) AS revenue

FROM categories c

JOIN products p
    ON p.category_id = c.id

JOIN order_items oi
    ON oi.product_id = p.id

JOIN orders o
    ON o.id = oi.order_id

WHERE o.status <> 'cancelled'

GROUP BY c.id

ORDER BY revenue DESC;