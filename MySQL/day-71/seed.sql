USE ecommerce_day71;


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
-- CATEGORIES
-- ============================================

INSERT INTO categories (name)
VALUES
('Electronics'),
('Mobiles'),
('Laptops'),
('Fashion'),
('Home Appliances'),
('Books'),
('Gaming');


-- ============================================
-- PRODUCTS
-- ============================================

INSERT INTO products
(name, category_id, price, discount_price)
VALUES
('Sony Headphones', 1, 12999.00, 11999.00),
('JBL Speaker', 1, 8999.00, 7999.00),
('iPhone 16', 2, 79999.00, 74999.00),
('Samsung Galaxy S25', 2, 74999.00, 69999.00),
('MacBook Pro M4', 3, 189999.00, 179999.00),
('Dell XPS 15', 3, 159999.00, 149999.00),
('Nike Air Max', 4, 12999.00, 10999.00),
('Adidas Running Shoes', 4, 9999.00, 8999.00),
('LG Washing Machine', 5, 54999.00, 49999.00),
('Clean Code', 6, 999.00, 799.00),
('PlayStation 5', 7, 54999.00, 49999.00);


-- ============================================
-- INVENTORY
-- ============================================

INSERT INTO inventory (product_id, stock)
VALUES
(1, 100),
(2, 80),
(3, 30),
(4, 40),
(5, 15),
(6, 20),
(7, 100),
(8, 120),
(9, 25),
(10, 200),
(11, 35);


-- ============================================
-- ORDERS
-- ============================================

INSERT INTO orders
(user_id, status, total)
VALUES
(1, 'delivered', 12999.00),
(1, 'delivered', 79999.00),
(2, 'shipped', 189999.00),
(3, 'confirmed', 10998.00),
(4, 'cancelled', 54999.00),
(5, 'delivered', 54999.00);


-- ============================================
-- ORDER ITEMS
-- ============================================

INSERT INTO order_items
(order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 12999.00),

(2, 3, 1, 79999.00),

(3, 5, 1, 189999.00),

(4, 7, 1, 12999.00),
(4, 8, 1, 9999.00),

(5, 9, 1, 54999.00),

(6, 11, 1, 54999.00);


-- ============================================
-- PAYMENTS
-- ============================================

INSERT INTO payments
(order_id, amount, status)
VALUES
(1, 12999.00, 'success'),
(2, 79999.00, 'success'),
(3, 189999.00, 'success'),
(4, 10998.00, 'success'),
(5, 54999.00, 'refunded'),
(6, 54999.00, 'success');


-- ============================================
-- VERIFY
-- ============================================

SELECT * FROM users;

SELECT * FROM categories;

SELECT * FROM products;

SELECT * FROM inventory;

SELECT * FROM orders;

SELECT * FROM order_items;

SELECT * FROM payments;