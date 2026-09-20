-- =========================================================
-- DAY 78
-- RELATIONSHIP TESTS
-- =========================================================


-- =========================================================
-- 1. USERS → ADDRESSES
-- =========================================================

SELECT
    u.id AS user_id,
    u.name,
    a.id AS address_id,
    a.city,
    a.state,
    a.is_default
FROM users u
LEFT JOIN addresses a
    ON a.user_id = u.id
ORDER BY u.id;


-- =========================================================
-- 2. PRODUCTS → CATEGORIES
-- =========================================================

SELECT
    p.id,
    p.name AS product,
    p.sku,
    c.name AS category,
    p.price,
    p.stock
FROM products p
JOIN categories c
    ON p.category_id = c.id
ORDER BY c.name, p.name;


-- =========================================================
-- 3. PRODUCT → VARIANTS
-- =========================================================

SELECT
    p.name AS product,
    pv.sku AS variant_sku,
    pv.size,
    pv.color,
    pv.price,
    pv.stock
FROM products p
JOIN product_variants pv
    ON pv.product_id = p.id
ORDER BY p.name, pv.size, pv.color;


-- =========================================================
-- 4. USER → ORDERS
-- =========================================================

SELECT
    u.name,
    o.id AS order_id,
    o.status,
    o.total_amount
FROM users u
JOIN orders o
    ON o.user_id = u.id
ORDER BY u.name;


-- =========================================================
-- 5. ORDER → ORDER ITEMS
-- =========================================================

SELECT
    o.id AS order_id,
    oi.id AS order_item_id,
    oi.product_id,
    oi.quantity,
    oi.unit_price,
    oi.subtotal
FROM orders o
JOIN order_items oi
    ON oi.order_id = o.id
ORDER BY o.id;


-- =========================================================
-- 6. ORDER ITEMS → PRODUCTS
-- =========================================================

SELECT
    oi.order_id,
    p.name AS product,
    oi.quantity,
    oi.unit_price,
    oi.subtotal
FROM order_items oi
JOIN products p
    ON p.id = oi.product_id
ORDER BY oi.order_id;


-- =========================================================
-- 7. COMPLETE ORDER RELATIONSHIP
-- =========================================================

SELECT
    o.id AS order_id,
    u.name AS customer,
    p.name AS product,
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    o.status
FROM orders o
JOIN users u
    ON u.id = o.user_id
JOIN order_items oi
    ON oi.order_id = o.id
JOIN products p
    ON p.id = oi.product_id
ORDER BY o.id;


-- =========================================================
-- 8. ORDER → PAYMENT
-- =========================================================

SELECT
    o.id AS order_id,
    o.total_amount,
    p.payment_method,
    p.payment_status,
    p.transaction_id,
    p.amount
FROM orders o
LEFT JOIN payments p
    ON p.order_id = o.id
ORDER BY o.id;


-- =========================================================
-- 9. CUSTOMERS WITH MULTIPLE ADDRESSES
-- =========================================================

SELECT
    u.id,
    u.name,
    COUNT(a.id) AS address_count
FROM users u
JOIN addresses a
    ON a.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(a.id) > 1;


-- =========================================================
-- 10. PRODUCTS WITH VARIANTS
-- =========================================================

SELECT
    p.name,
    COUNT(pv.id) AS variant_count
FROM products p
LEFT JOIN product_variants pv
    ON pv.product_id = p.id
GROUP BY p.id, p.name
ORDER BY variant_count DESC;


-- =========================================================
-- 11. USERS AND TOTAL ORDERS
-- =========================================================

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o
    ON o.user_id = u.id
GROUP BY u.id, u.name
ORDER BY total_orders DESC;


-- =========================================================
-- 12. ORDER ITEM TOTAL VALIDATION
-- =========================================================

SELECT
    oi.id,
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    (oi.quantity * oi.unit_price) AS calculated_subtotal
FROM order_items oi
WHERE oi.subtotal <> (oi.quantity * oi.unit_price);


-- =========================================================
-- 13. ORDER TOTAL VALIDATION
-- =========================================================

SELECT
    o.id,
    o.subtotal,
    o.tax,
    o.shipping_fee,
    o.discount,
    o.total_amount,

    (
        o.subtotal
        + o.tax
        + o.shipping_fee
        - o.discount
    ) AS calculated_total

FROM orders o
WHERE o.total_amount <>
(
    o.subtotal
    + o.tax
    + o.shipping_fee
    - o.discount
);


-- =========================================================
-- 14. PAYMENT AMOUNT VS ORDER TOTAL
-- =========================================================

SELECT
    o.id AS order_id,
    o.total_amount,
    p.amount AS payment_amount,
    p.payment_status
FROM orders o
JOIN payments p
    ON p.order_id = o.id
WHERE p.amount <> o.total_amount;


-- =========================================================
-- 15. DEFAULT ADDRESSES
-- =========================================================

SELECT
    u.name,
    a.address_line,
    a.city,
    a.state,
    a.postal_code
FROM users u
JOIN addresses a
    ON a.user_id = u.id
WHERE a.is_default = TRUE;