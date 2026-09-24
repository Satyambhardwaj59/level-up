-- =========================================================
-- DAY 82
-- LARGE DATASET GENERATOR
-- =========================================================

\timing on


-- =========================================================
-- CATEGORIES
-- =========================================================

INSERT INTO categories
(name, description)
VALUES
('Electronics', 'Electronic devices'),
('Clothing', 'Fashion products'),
('Footwear', 'Shoes and footwear'),
('Home & Kitchen', 'Home and kitchen products'),
('Sports', 'Sports equipment'),
('Books', 'Books and educational material'),
('Beauty', 'Beauty products'),
('Gaming', 'Gaming products'),
('Furniture', 'Furniture products'),
('Accessories', 'Accessories');


-- =========================================================
-- USERS
-- 100,000 ROWS
-- =========================================================

INSERT INTO users
(name, email, phone, created_at)
SELECT
    'User ' || gs,
    'user' || gs || '@example.com',
    '9' || LPAD(gs::text, 9, '0'),

    CURRENT_TIMESTAMP
        - (random() * INTERVAL '730 days')

FROM generate_series(1, 100000) AS gs;


-- =========================================================
-- PRODUCTS
-- 100,000 ROWS
-- =========================================================

INSERT INTO products
(
    category_id,
    name,
    sku,
    price,
    stock,
    is_active,
    created_at
)
SELECT
    ((gs - 1) % 10) + 1,

    'Product ' || gs,

    'SKU-' || LPAD(gs::text, 8, '0'),

    ROUND(
        (100 + random() * 99900)::numeric,
        2
    ),

    FLOOR(random() * 1000)::integer,

    random() > 0.10,

    CURRENT_TIMESTAMP
        - (random() * INTERVAL '730 days')

FROM generate_series(1, 100000) AS gs;


-- =========================================================
-- ORDERS
-- 1,000,000 ROWS
-- =========================================================

INSERT INTO orders
(
    user_id,
    status,
    total_amount,
    created_at
)
SELECT
    1 + FLOOR(random() * 100000)::BIGINT,

    CASE
        WHEN random() < 0.20 THEN 'pending'
        WHEN random() < 0.40 THEN 'confirmed'
        WHEN random() < 0.60 THEN 'processing'
        WHEN random() < 0.80 THEN 'shipped'
        ELSE 'delivered'
    END,

    ROUND(
        (100 + random() * 99900)::numeric,
        2
    ),

    CURRENT_TIMESTAMP
        - (random() * INTERVAL '730 days')

FROM generate_series(1, 1000000) AS gs;


-- =========================================================
-- ORDER ITEMS
-- 2,000,000 ROWS
--
-- Exactly 2 items per generated order.
-- =========================================================

INSERT INTO order_items
(
    order_id,
    product_id,
    quantity,
    price
)
SELECT
    ((gs - 1) / 2) + 1,

    1 + FLOOR(random() * 100000)::BIGINT,

    1 + FLOOR(random() * 5)::INTEGER,

    ROUND(
        (100 + random() * 99900)::numeric,
        2
    )

FROM generate_series(1, 2000000) AS gs;


-- =========================================================
-- PAYMENTS
-- 1,000,000 ROWS
-- =========================================================

INSERT INTO payments
(
    order_id,
    payment_method,
    payment_status,
    transaction_id,
    amount,
    created_at
)
SELECT
    id,

    CASE
        WHEN random() < 0.40 THEN 'upi'
        WHEN random() < 0.70 THEN 'card'
        WHEN random() < 0.85 THEN 'net_banking'
        ELSE 'cod'
    END,

    CASE
        WHEN random() < 0.85 THEN 'paid'
        WHEN random() < 0.95 THEN 'pending'
        ELSE 'failed'
    END,

    'TXN-' || LPAD(id::text, 10, '0'),

    total_amount,

    created_at

FROM orders;


-- =========================================================
-- UPDATE STATISTICS
-- =========================================================

ANALYZE users;
ANALYZE categories;
ANALYZE products;
ANALYZE orders;
ANALYZE order_items;
ANALYZE payments;


-- =========================================================
-- VERIFY COUNTS
-- =========================================================

SELECT 'users' AS table_name, COUNT(*) AS rows
FROM users

UNION ALL

SELECT 'categories', COUNT(*)
FROM categories

UNION ALL

SELECT 'products', COUNT(*)
FROM products

UNION ALL

SELECT 'orders', COUNT(*)
FROM orders

UNION ALL

SELECT 'order_items', COUNT(*)
FROM order_items

UNION ALL

SELECT 'payments', COUNT(*)
FROM payments;