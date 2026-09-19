
-- PART 1 — CREATE
-- Insert a new product
INSERT INTO products
(category_id, name, description, price, stock, is_active)
VALUES
(
    1,
    'Google Pixel 9',
    'Google flagship smartphone',
    74999,
    20,
    TRUE
);

-- PART 2 — READ
SELECT *
FROM products;

SELECT *
FROM users;

SELECT *
FROM categories;

SELECT *
FROM orders;

SELECT *
FROM order_items;

-- PART 3 — UPDATE
UPDATE products
SET price = 1499
WHERE id = 7;

-- Update stock
UPDATE products
SET stock = stock + 20
WHERE id = 7;

-- Deactivate product
UPDATE products
SET is_active = FALSE
WHERE id = 30;

-- PART 4 — DELETE

-- This product must not have order_items.
INSERT INTO products
(category_id, name, description, price, stock)
VALUES
(
    1,
    'Temporary Test Product',
    'Product used for DELETE practice',
    999,
    5
);

-- Find the temporary product
SELECT *
FROM products
WHERE name = 'Temporary Test Product';

-- Delete it
DELETE FROM products
WHERE name = 'Temporary Test Product';

-- PART 5 — WHERE
SELECT *
FROM products
WHERE price > 1000;

-- PART 6 — AND
SELECT *
FROM products
WHERE price > 1000
AND stock > 20;

-- PART 7 — OR
SELECT *
FROM products
WHERE price < 500
OR price > 50000;

-- PART 8 — NOT
SELECT *
FROM products
WHERE NOT is_active;

-- PART 9 — IN
SELECT *
FROM products
WHERE category_id IN (1, 3, 5);

-- PART 10 — BETWEEN
SELECT *
FROM products
WHERE price BETWEEN 500 AND 2000;

-- PART 11 — LIKE
SELECT *
FROM products
WHERE name LIKE '%phone%';

-- Case-insensitive PostgreSQL search
SELECT *
FROM products
WHERE name ILIKE '%phone%';

-- PART 12 — IS NULL
SELECT *
FROM users
WHERE phone IS NULL;

-- PART 13 — IS NOT NULL
SELECT *
FROM users
WHERE phone IS NOT NULL;

-- PART 14 — ORDER BY
SELECT *
FROM products
ORDER BY price DESC;

SELECT *
FROM products
ORDER BY price ASC;

-- PART 15 — TOP 5 EXPENSIVE
SELECT
    id,
    name,
    price
FROM products
ORDER BY price DESC
LIMIT 5;

-- PART 16 — TOP 5 CHEAPEST
SELECT
    id,
    name,
    price
FROM products
ORDER BY price ASC
LIMIT 5;

-- PART 17 — USERS ALPHABETICALLY
SELECT *
FROM users
ORDER BY name ASC;

-- PART 18 — PRODUCTS BY STOCK
SELECT *
FROM products
ORDER BY stock DESC;

-- PART 19 — FIRST 10 PRODUCTS
SELECT *
FROM products
ORDER BY id
LIMIT 10;

-- PART 20 — OFFSET
SELECT *
FROM products
ORDER BY id
LIMIT 10
OFFSET 10;

-- PART 21 — DISTINCT CATEGORIES
SELECT DISTINCT category_id
FROM products
ORDER BY category_id;

-- PART 22 — ZERO STOCK
SELECT *
FROM products
WHERE stock = 0;

-- PART 23 — ACTIVE PRODUCTS
SELECT *
FROM products
WHERE is_active = TRUE;

-- PART 24 — INACTIVE PRODUCTS
SELECT *
FROM products
WHERE is_active = FALSE;

-- PART 25 — CATEGORY JOIN
SELECT
    p.id,
    p.name AS product,
    c.name AS category,
    p.price,
    p.stock
FROM products p
JOIN categories c
    ON p.category_id = c.id
ORDER BY c.name, p.name;

-- PART 26 — ORDER + USER
SELECT
    o.id AS order_id,
    u.name AS customer,
    o.status,
    o.total_amount,
    o.created_at
FROM orders o
JOIN users u
    ON o.user_id = u.id
ORDER BY o.created_at DESC;

-- PART 27 — ORDER ITEMS + PRODUCTS
SELECT
    oi.order_id,
    p.name AS product,
    oi.quantity,
    oi.price,
    oi.quantity * oi.price AS item_total
FROM order_items oi
JOIN products p
    ON oi.product_id = p.id
ORDER BY oi.order_id;

-- PART 28 — COMPLETE ORDER DETAILS
SELECT
    o.id AS order_id,
    u.name AS customer,
    p.name AS product,
    oi.quantity,
    oi.price,
    oi.quantity * oi.price AS item_total,
    o.status
FROM orders o
JOIN users u
    ON o.user_id = u.id
JOIN order_items oi
    ON o.id = oi.order_id
JOIN products p
    ON oi.product_id = p.id
ORDER BY o.id;

-- PART 29 — PRODUCTS ABOVE ₹1000
SELECT
    id,
    name,
    price
FROM products
WHERE price > 1000
ORDER BY price DESC;

-- PART 30 — PRODUCTS BELOW ₹500
SELECT
    id,
    name,
    price
FROM products
WHERE price < 500
ORDER BY price ASC;