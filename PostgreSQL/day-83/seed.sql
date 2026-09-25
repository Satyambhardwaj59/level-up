
-- USERS
INSERT INTO users (name, email)
SELECT
    'User ' || gs,
    'user' || gs || '@example.com'
FROM generate_series(1, 1000) AS gs;

-- PRODUCTS
INSERT INTO products (name, price)
SELECT
    'Product ' || gs,
    ROUND((100 + RANDOM() * 9900)::numeric, 2)
FROM generate_series(1, 100) AS gs;

-- INVENTORY
INSERT INTO inventory (product_id, quantity)
SELECT
    id,
    CASE
        WHEN id = 1 THEN 5
        WHEN id = 2 THEN 10
        WHEN id = 3 THEN 100
        ELSE FLOOR(RANDOM() * 500 + 50)::INTEGER
    END
FROM products;

-- CHECK DATA
SELECT COUNT(*) AS users
FROM users;

SELECT COUNT(*) AS products
FROM products;

SELECT COUNT(*) AS inventory_rows
FROM inventory;

-- Product 1 is our concurrency test product
SELECT *
FROM products
WHERE id = 1;

SELECT *
FROM inventory
WHERE product_id = 1;