
-- =========================================================
-- DAY 79 — PRODUCTION E-COMMERCE QUERY ENGINE
-- relationships.sql
-- =========================================================
--
-- Relationship Types Covered:
--
-- 1. One-to-One
-- 2. One-to-Many
-- 3. Many-to-Many
-- 4. Self Relationship
-- 5. Foreign Key Relationships
-- 6. Relationship Analysis
-- 7. Production E-Commerce Relationships
--
-- =========================================================


-- =========================================================
-- 1. ONE-TO-ONE RELATIONSHIP
-- =========================================================
--
-- Example:
-- One order can have one payment.
-- One payment belongs to one order.
--
-- The payments table uses:
--
-- order_id INT UNIQUE
--
-- This UNIQUE constraint prevents multiple payments
-- from being associated with the same order.
-- =========================================================

-- View orders and their payments

SELECT
    o.id AS order_id,
    o.total_amount,
    o.status,
    p.id AS payment_id,
    p.payment_method,
    p.payment_status
FROM orders o
LEFT JOIN payments p
    ON o.id = p.order_id;


-- Find orders that have exactly one payment

SELECT
    o.id AS order_id,
    p.id AS payment_id,
    p.payment_status
FROM orders o
INNER JOIN payments p
    ON o.id = p.order_id;


-- Find orders without payments

SELECT
    o.id AS order_id,
    o.total_amount,
    o.status
FROM orders o
LEFT JOIN payments p
    ON o.id = p.order_id
WHERE p.id IS NULL;


-- Find successful payments

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
-- 2. ONE-TO-MANY RELATIONSHIP
-- =========================================================
--
-- One user can have many orders.
--
-- users
--   |
--   └── orders
--
-- orders.user_id -> users.id
-- =========================================================


-- Users and their orders

SELECT
    u.id AS user_id,
    u.name,
    o.id AS order_id,
    o.total_amount,
    o.status
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
ORDER BY u.id;


-- Count orders for every user

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
ORDER BY total_orders DESC;


-- Users with more than one order

SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_orders
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
HAVING COUNT(o.id) > 1;


-- Users without orders

SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE o.id IS NULL;


-- =========================================================
-- 3. USER → ADDRESS RELATIONSHIP
-- =========================================================
--
-- One user can have multiple addresses.
--
-- users
--   |
--   └── addresses
--
-- addresses.user_id -> users.id
-- =========================================================


-- Users and their addresses

SELECT
    u.id AS user_id,
    u.name,
    a.id AS address_id,
    a.address_line,
    a.city,
    a.state,
    a.pincode
FROM users u
LEFT JOIN addresses a
    ON u.id = a.user_id
ORDER BY u.id;


-- Count addresses for every user

SELECT
    u.id,
    u.name,
    COUNT(a.id) AS address_count
FROM users u
LEFT JOIN addresses a
    ON u.id = a.user_id
GROUP BY
    u.id,
    u.name
ORDER BY address_count DESC;


-- Users with multiple addresses

SELECT
    u.id,
    u.name,
    COUNT(a.id) AS address_count
FROM users u
INNER JOIN addresses a
    ON u.id = a.user_id
GROUP BY
    u.id,
    u.name
HAVING COUNT(a.id) > 1;


-- Users without addresses

SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN addresses a
    ON u.id = a.user_id
WHERE a.id IS NULL;


-- =========================================================
-- 4. CATEGORY → PRODUCT RELATIONSHIP
-- =========================================================
--
-- One category can have many products.
--
-- categories
--      |
--      └── products
--
-- products.category_id -> categories.id
-- =========================================================


-- Categories with their products

SELECT
    c.id AS category_id,
    c.name AS category,
    p.id AS product_id,
    p.name AS product,
    p.base_price
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
ORDER BY c.id;


-- Count products in every category

SELECT
    c.id,
    c.name,
    COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
GROUP BY
    c.id,
    c.name
ORDER BY product_count DESC;


-- Categories without products

SELECT
    c.id,
    c.name
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id
WHERE p.id IS NULL;


-- Products without a category
--
-- Normally prevented by NOT NULL + FK,
-- but useful for relationship testing.

SELECT
    p.id,
    p.name,
    p.category_id
FROM products p
LEFT JOIN categories c
    ON p.category_id = c.id
WHERE c.id IS NULL;


-- =========================================================
-- 5. PRODUCT → PRODUCT VARIANT RELATIONSHIP
-- =========================================================
--
-- One product can have many variants.
--
-- products
--     |
--     └── product_variants
--
-- product_variants.product_id -> products.id
-- =========================================================


-- Products with their variants

SELECT
    p.id AS product_id,
    p.name AS product,
    pv.id AS variant_id,
    pv.sku,
    pv.variant_name,
    pv.price,
    pv.stock
FROM products p
LEFT JOIN product_variants pv
    ON p.id = pv.product_id
ORDER BY p.id;


-- Count variants for each product

SELECT
    p.id,
    p.name,
    COUNT(pv.id) AS variant_count
FROM products p
LEFT JOIN product_variants pv
    ON p.id = pv.product_id
GROUP BY
    p.id,
    p.name
ORDER BY variant_count DESC;


-- Products without variants

SELECT
    p.id,
    p.name
FROM products p
LEFT JOIN product_variants pv
    ON p.id = pv.product_id
WHERE pv.id IS NULL;


-- Products with more than one variant

SELECT
    p.id,
    p.name,
    COUNT(pv.id) AS variant_count
FROM products p
INNER JOIN product_variants pv
    ON p.id = pv.product_id
GROUP BY
    p.id,
    p.name
HAVING COUNT(pv.id) > 1;


-- =========================================================
-- 6. ORDER → ORDER ITEMS RELATIONSHIP
-- =========================================================
--
-- One order can contain many order items.
--
-- orders
--    |
--    └── order_items
--
-- order_items.order_id -> orders.id
-- =========================================================


-- Orders with their items

SELECT
    o.id AS order_id,
    o.total_amount,
    oi.id AS order_item_id,
    oi.product_id,
    oi.quantity,
    oi.price
FROM orders o
LEFT JOIN order_items oi
    ON o.id = oi.order_id
ORDER BY o.id;


-- Count items in every order

SELECT
    o.id AS order_id,
    COUNT(oi.id) AS item_count
FROM orders o
LEFT JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY o.id
ORDER BY item_count DESC;


-- Orders containing more than one item row

SELECT
    o.id AS order_id,
    COUNT(oi.id) AS item_count
FROM orders o
INNER JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY o.id
HAVING COUNT(oi.id) > 1;


-- =========================================================
-- 7. PRODUCT → ORDER ITEM RELATIONSHIP
-- =========================================================
--
-- One product can appear in many order_items.
--
-- products
--     |
--     └── order_items
-- =========================================================


-- Products and their order history

SELECT
    p.id,
    p.name,
    oi.order_id,
    oi.quantity,
    oi.price
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
ORDER BY p.id;


-- Count how many orders contain each product

SELECT
    p.id,
    p.name,
    COUNT(DISTINCT oi.order_id) AS order_count
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
GROUP BY
    p.id,
    p.name
ORDER BY order_count DESC;


-- Products never purchased

SELECT
    p.id,
    p.name
FROM products p
LEFT JOIN order_items oi
    ON p.id = oi.product_id
WHERE oi.id IS NULL;


-- =========================================================
-- 8. MANY-TO-MANY RELATIONSHIP
-- =========================================================
--
-- Product <-> Category
--
-- If products can belong to multiple categories,
-- we need a junction table.
--
-- products
--      |
--      |
-- product_categories
--      |
--      |
-- categories
--
-- =========================================================


-- Create junction table

CREATE TABLE IF NOT EXISTS product_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (product_id, category_id),

    CONSTRAINT fk_product_categories_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);


-- Insert sample many-to-many relationships

INSERT INTO product_categories
(product_id, category_id)
VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 5),
(7, 4),
(7, 5),
(8, 4),
(8, 5)
ON CONFLICT DO NOTHING;


-- Products with multiple categories

SELECT
    p.id,
    p.name AS product,
    c.name AS category
FROM products p
INNER JOIN product_categories pc
    ON p.id = pc.product_id
INNER JOIN categories c
    ON pc.category_id = c.id
ORDER BY p.id;


-- Count categories per product

SELECT
    p.id,
    p.name,
    COUNT(pc.category_id) AS category_count
FROM products p
LEFT JOIN product_categories pc
    ON p.id = pc.product_id
GROUP BY
    p.id,
    p.name
ORDER BY category_count DESC;


-- Products belonging to more than one category

SELECT
    p.id,
    p.name,
    COUNT(pc.category_id) AS category_count
FROM products p
INNER JOIN product_categories pc
    ON p.id = pc.product_id
GROUP BY
    p.id,
    p.name
HAVING COUNT(pc.category_id) > 1;


-- =========================================================
-- 9. STUDENT → COURSE MANY-TO-MANY RELATIONSHIP
-- =========================================================
--
-- students <-> courses
--
-- students
--     |
--     └── student_courses
--              |
--              └── courses
--
-- =========================================================


-- Create students table

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


-- Create courses table

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


-- Create junction table

CREATE TABLE IF NOT EXISTS student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,

    PRIMARY KEY (student_id, course_id),

    CONSTRAINT fk_student_courses_student
        FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student_courses_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);


-- Insert students

INSERT INTO students (name)
VALUES
('Satyam'),
('Rahul'),
('Priya'),
('Aman')
ON CONFLICT DO NOTHING;


-- Insert courses

INSERT INTO courses (name)
VALUES
('PostgreSQL'),
('JavaScript'),
('React'),
('Node.js')
ON CONFLICT DO NOTHING;


-- Connect students with courses

INSERT INTO student_courses
(student_id, course_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(3, 2),
(3, 3),
(4, 1),
(4, 3)
ON CONFLICT DO NOTHING;


-- Students with their courses

SELECT
    s.id AS student_id,
    s.name AS student,
    c.id AS course_id,
    c.name AS course
FROM students s
INNER JOIN student_courses sc
    ON s.id = sc.student_id
INNER JOIN courses c
    ON sc.course_id = c.id
ORDER BY s.id;


-- Courses with enrolled students

SELECT
    c.id AS course_id,
    c.name AS course,
    s.id AS student_id,
    s.name AS student
FROM courses c
INNER JOIN student_courses sc
    ON c.id = sc.course_id
INNER JOIN students s
    ON sc.student_id = s.id
ORDER BY c.id;


-- Count courses per student

SELECT
    s.id,
    s.name,
    COUNT(sc.course_id) AS course_count
FROM students s
LEFT JOIN student_courses sc
    ON s.id = sc.student_id
GROUP BY
    s.id,
    s.name
ORDER BY course_count DESC;


-- =========================================================
-- 10. SELF JOIN — EMPLOYEE / MANAGER
-- =========================================================
--
-- An employee can have another employee as manager.
--
-- employees
--     |
--     └── manager_id -> employees.id
--
-- This is a SELF RELATIONSHIP.
-- =========================================================


-- Create employee table

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT,

    CONSTRAINT fk_employee_manager
        FOREIGN KEY (manager_id)
        REFERENCES employees(id)
        ON DELETE SET NULL
);


-- Insert employees

INSERT INTO employees (name, manager_id)
VALUES
('Rahul', NULL),
('Aman', 1),
('Priya', 1),
('Neha', 2)
ON CONFLICT DO NOTHING;


-- Employee + Manager

SELECT
    e.id AS employee_id,
    e.name AS employee,
    m.id AS manager_id,
    m.name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.id
ORDER BY e.id;


-- Employees without managers

SELECT
    e.id,
    e.name
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.id
WHERE e.manager_id IS NULL;


-- Managers and number of employees reporting to them

SELECT
    m.id AS manager_id,
    m.name AS manager,
    COUNT(e.id) AS employee_count
FROM employees m
LEFT JOIN employees e
    ON m.id = e.manager_id
GROUP BY
    m.id,
    m.name
ORDER BY employee_count DESC;


-- =========================================================
-- 11. USER → ORDER → ORDER ITEM → PRODUCT
-- =========================================================
--
-- Complete relationship chain.
-- =========================================================


SELECT
    u.id AS user_id,
    u.name AS customer,
    o.id AS order_id,
    oi.id AS order_item_id,
    p.id AS product_id,
    p.name AS product,
    oi.quantity,
    oi.price
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
ORDER BY o.id;


-- =========================================================
-- 12. USER → ORDER → PRODUCT → CATEGORY
-- =========================================================


SELECT
    u.name AS customer,
    o.id AS order_id,
    p.name AS product,
    c.name AS category,
    oi.quantity,
    oi.price
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
INNER JOIN products p
    ON oi.product_id = p.id
INNER JOIN categories c
    ON p.category_id = c.id;


-- =========================================================
-- 13. USER → ORDER → PAYMENT
-- =========================================================


SELECT
    u.name AS customer,
    o.id AS order_id,
    o.total_amount,
    o.status AS order_status,
    p.payment_method,
    p.payment_status
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
LEFT JOIN payments p
    ON o.id = p.order_id;


-- =========================================================
-- 14. COMPLETE E-COMMERCE RELATIONSHIP
-- =========================================================
--
-- users
--   ↓
-- orders
--   ↓
-- order_items
--   ↓
-- products
--   ↓
-- categories
--
-- orders
--   ↓
-- payments
--
-- =========================================================


SELECT
    u.id AS customer_id,
    u.name AS customer,
    u.email,

    o.id AS order_id,
    o.status AS order_status,
    o.created_at AS order_date,
    o.total_amount AS order_total,

    oi.id AS order_item_id,
    oi.quantity,
    oi.price AS item_price,

    p.id AS product_id,
    p.name AS product,

    c.id AS category_id,
    c.name AS category,

    pay.id AS payment_id,
    pay.payment_method,
    pay.payment_status,
    pay.transaction_id

FROM users u

INNER JOIN orders o
    ON u.id = o.user_id

INNER JOIN order_items oi
    ON o.id = oi.order_id

INNER JOIN products p
    ON oi.product_id = p.id

INNER JOIN categories c
    ON p.category_id = c.id

LEFT JOIN payments pay
    ON o.id = pay.order_id

ORDER BY o.created_at DESC;


-- =========================================================
-- 15. RELATIONSHIP VALIDATION QUERIES
-- =========================================================

-- Find orphan order items

SELECT
    oi.id,
    oi.order_id,
    oi.product_id
FROM order_items oi
LEFT JOIN orders o
    ON oi.order_id = o.id
LEFT JOIN products p
    ON oi.product_id = p.id
WHERE o.id IS NULL
   OR p.id IS NULL;


-- Find orphan addresses

SELECT
    a.id,
    a.user_id
FROM addresses a
LEFT JOIN users u
    ON a.user_id = u.id
WHERE u.id IS NULL;


-- Find orphan products

SELECT
    p.id,
    p.category_id
FROM products p
LEFT JOIN categories c
    ON p.category_id = c.id
WHERE c.id IS NULL;


-- Find orphan product variants

SELECT
    pv.id,
    pv.product_id
FROM product_variants pv
LEFT JOIN products p
    ON pv.product_id = p.id
WHERE p.id IS NULL;


-- Find orphan payments

SELECT
    pay.id,
    pay.order_id
FROM payments pay
LEFT JOIN orders o
    ON pay.order_id = o.id
WHERE o.id IS NULL;


-- =========================================================
-- 16. RELATIONSHIP STATISTICS
-- =========================================================


-- Users → Orders

SELECT
    COUNT(DISTINCT u.id) AS total_users,
    COUNT(DISTINCT o.id) AS total_orders
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id;


-- Categories → Products

SELECT
    COUNT(DISTINCT c.id) AS total_categories,
    COUNT(DISTINCT p.id) AS total_products
FROM categories c
LEFT JOIN products p
    ON c.id = p.category_id;


-- Orders → Order Items

SELECT
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(oi.id) AS total_order_items
FROM orders o
LEFT JOIN order_items oi
    ON o.id = oi.order_id;


-- Orders → Payments

SELECT
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT p.id) AS paid_orders
FROM orders o
LEFT JOIN payments p
    ON o.id = p.order_id;


-- =========================================================
-- 17. CUSTOMERS WHO PURCHASED FROM MULTIPLE CATEGORIES
-- =========================================================


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


-- =========================================================
-- 18. CUSTOMERS WHO PURCHASED MULTIPLE PRODUCTS
-- =========================================================


SELECT
    u.id,
    u.name,
    COUNT(DISTINCT oi.product_id) AS unique_products
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id
INNER JOIN order_items oi
    ON o.id = oi.order_id
GROUP BY
    u.id,
    u.name
HAVING COUNT(DISTINCT oi.product_id) > 1;


-- =========================================================
-- 19. USERS WITH ORDERS AND ADDRESSES
-- =========================================================


SELECT
    u.id,
    u.name,
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT a.id) AS total_addresses
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
LEFT JOIN addresses a
    ON u.id = a.user_id
GROUP BY
    u.id,
    u.name
ORDER BY u.id;


-- =========================================================
-- 20. FULL RELATIONSHIP REPORT
-- =========================================================


SELECT
    u.id AS user_id,
    u.name AS customer,
    u.email,

    COUNT(DISTINCT a.id) AS addresses,

    COUNT(DISTINCT o.id) AS orders,

    COUNT(DISTINCT oi.id) AS order_items,

    COUNT(DISTINCT oi.product_id) AS unique_products,

    COUNT(DISTINCT p.category_id) AS categories_purchased,

    COALESCE(SUM(oi.quantity), 0) AS total_quantity,

    COALESCE(SUM(o.total_amount), 0) AS total_order_value

FROM users u

LEFT JOIN addresses a
    ON u.id = a.user_id

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

ORDER BY
    total_order_value DESC;


-- =========================================================
-- END OF relationships.sql
-- =========================================================

