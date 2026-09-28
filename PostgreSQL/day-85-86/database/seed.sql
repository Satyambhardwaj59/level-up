-- ==========================================
-- CATEGORIES
-- ==========================================

INSERT INTO categories (name)
VALUES
    ('Laptops'),
    ('Smartphones'),
    ('Monitors'),
    ('Accessories'),
    ('Gaming');


-- ==========================================
-- USERS
-- ==========================================

INSERT INTO users (name, email)
SELECT
    'User ' || gs,
    'user' || gs || '@example.com'
FROM generate_series(1, 1000) AS gs;


-- ==========================================
-- PRODUCTS
-- ==========================================

INSERT INTO products (
    category_id,
    name,
    sku,
    price,
    tags,
    regions,
    metadata
)
SELECT
    ((gs - 1) % 5) + 1,

    'Product ' || gs,

    'SKU-' || LPAD(gs::TEXT, 6, '0'),

    ROUND(
        (1000 + RANDOM() * 199000)::NUMERIC,
        2
    ),

    CASE
        WHEN gs % 3 = 0
        THEN ARRAY['laptop', 'premium']
        WHEN gs % 3 = 1
        THEN ARRAY['electronics', 'budget']
        ELSE ARRAY['electronics', 'premium']
    END,

    CASE
        WHEN gs % 4 = 0
        THEN ARRAY['IN', 'US', 'EU']
        WHEN gs % 3 = 0
        THEN ARRAY['IN', 'EU']
        ELSE ARRAY['IN']
    END,

    jsonb_build_object(
        'brand',
        CASE
            WHEN gs % 3 = 0 THEN 'Lenovo'
            WHEN gs % 3 = 1 THEN 'Dell'
            ELSE 'HP'
        END,

        'ram',
        CASE
            WHEN gs % 4 = 0 THEN 32
            WHEN gs % 2 = 0 THEN 16
            ELSE 8
        END,

        'storage',
        CASE
            WHEN gs % 3 = 0 THEN '1TB'
            ELSE '512GB'
        END,

        'features',
        jsonb_build_object(
            'wifi', TRUE,
            'bluetooth', TRUE
        )
    )

FROM generate_series(1, 10000) AS gs;


-- ==========================================
-- INVENTORY
-- ==========================================

INSERT INTO inventory (
    product_id,
    quantity
)
SELECT
    id,
    CASE
        WHEN id = 1 THEN 5
        ELSE FLOOR(RANDOM() * 500 + 50)::INTEGER
    END
FROM products;


-- ==========================================
-- ORDERS
-- ==========================================

INSERT INTO orders (
    user_id,
    status,
    total_amount,
    created_at
)
SELECT
    FLOOR(RANDOM() * 1000 + 1)::BIGINT,

    CASE
        WHEN gs % 5 = 0 THEN 'pending'
        WHEN gs % 5 = 1 THEN 'confirmed'
        WHEN gs % 5 = 2 THEN 'processing'
        WHEN gs % 5 = 3 THEN 'shipped'
        ELSE 'delivered'
    END,

    ROUND(
        (500 + RANDOM() * 50000)::NUMERIC,
        2
    ),

    CURRENT_TIMESTAMP -
        (RANDOM() * INTERVAL '365 days')

FROM generate_series(1, 50000) AS gs;


-- ==========================================
-- ORDER ITEMS
-- ==========================================

INSERT INTO order_items (
    order_id,
    product_id,
    quantity,
    price
)
SELECT
    o.id,

    ((o.id + x.n) % 10000) + 1,

    FLOOR(RANDOM() * 4 + 1)::INTEGER,

    ROUND(
        (500 + RANDOM() * 100000)::NUMERIC,
        2
    )

FROM orders o
CROSS JOIN generate_series(1, 2) AS x(n);


-- ==========================================
-- PAYMENTS
-- ==========================================

INSERT INTO payments (
    order_id,
    amount,
    status
)
SELECT
    id,
    total_amount,

    CASE
        WHEN status = 'pending'
            THEN 'pending'
        ELSE 'success'
    END

FROM orders;


-- ==========================================
-- ANALYZE
-- ==========================================

ANALYZE users;
ANALYZE categories;
ANALYZE products;
ANALYZE inventory;
ANALYZE orders;
ANALYZE order_items;
ANALYZE payments;


-- ==========================================
-- COUNTS
-- ==========================================

SELECT 'users' AS table_name, COUNT(*) FROM users
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'inventory', COUNT(*) FROM inventory
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;