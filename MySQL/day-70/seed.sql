USE ecommerce_transactions;

-- ============================================
-- USERS
-- ============================================

INSERT INTO users (name, email)
VALUES
('Rahul Sharma', 'rahul@example.com'),
('Amit Kumar', 'amit@example.com'),
('Priya Singh', 'priya@example.com'),
('Neha Verma', 'neha@example.com'),
('Rohit Gupta', 'rohit@example.com');


-- ============================================
-- PRODUCTS
-- ============================================

INSERT INTO products (name, price)
VALUES
('MacBook Pro M4', 189999.00),
('iPhone 16', 79999.00),
('Samsung Galaxy S25', 74999.00),
('Sony Headphones', 12999.00),
('Gaming Mouse', 4999.00),
('Mechanical Keyboard', 6999.00);


-- ============================================
-- INVENTORY
-- ============================================

INSERT INTO inventory (product_id, stock)
VALUES
(1, 10),
(2, 20),
(3, 15),
(4, 50),
(5, 100),
(6, 75);


-- ============================================
-- PRODUCT USED FOR CONCURRENCY TEST
-- stock = 1
-- ============================================

INSERT INTO products (name, price)
VALUES
('Concurrency Test Product', 1000.00);

INSERT INTO inventory (product_id, stock)
VALUES
(LAST_INSERT_ID(), 1);


-- ============================================
-- VERIFY
-- ============================================

SELECT
    p.id,
    p.name,
    p.price,
    i.stock
FROM products p
JOIN inventory i
    ON p.id = i.product_id
ORDER BY p.id;