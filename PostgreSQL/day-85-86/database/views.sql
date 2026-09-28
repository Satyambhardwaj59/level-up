-- ==========================================
-- PRODUCT SUMMARY
-- ==========================================

CREATE OR REPLACE VIEW product_summary AS
SELECT
    p.id,
    p.name,
    p.sku,
    p.price,
    c.name AS category,
    p.tags,
    p.regions,
    p.metadata,
    p.is_active,
    i.quantity AS stock,
    get_stock_status(i.quantity) AS stock_status
FROM products p
JOIN categories c
    ON c.id = p.category_id
LEFT JOIN inventory i
    ON i.product_id = p.id;


-- ==========================================
-- ORDER SUMMARY
-- ==========================================

CREATE OR REPLACE VIEW order_summary AS
SELECT
    o.id,
    o.user_id,
    u.name AS customer_name,
    u.email,
    o.status,
    o.total_amount,
    COUNT(oi.id) AS item_count,
    o.created_at
FROM orders o
JOIN users u
    ON u.id = o.user_id
LEFT JOIN order_items oi
    ON oi.order_id = o.id
GROUP BY
    o.id,
    u.id;


-- ==========================================
-- CUSTOMER SPENDING
-- ==========================================

CREATE OR REPLACE VIEW customer_spending AS
SELECT
    u.id AS user_id,
    u.name,
    u.email,

    COUNT(o.id) AS total_orders,

    COALESCE(
        SUM(o.total_amount),
        0
    ) AS total_spending

FROM users u
LEFT JOIN orders o
    ON o.user_id = u.id
GROUP BY
    u.id;