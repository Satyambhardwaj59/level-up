-- ============================================
-- DAY 68 - SEED DATA
-- ============================================

USE ecommerce_analytics;

-- ============================================
-- USERS
-- ============================================

INSERT INTO users (name, email, phone) VALUES
('Rahul Sharma', 'rahul@example.com', '9876543201'),
('Amit Kumar', 'amit@example.com', '9876543202'),
('Priya Singh', 'priya@example.com', '9876543203'),
('Neha Verma', 'neha@example.com', '9876543204'),
('Rohit Gupta', 'rohit@example.com', '9876543205'),
('Anjali Singh', 'anjali@example.com', '9876543206'),
('Vikash Kumar', 'vikash@example.com', '9876543207'),
('Sneha Roy', 'sneha@example.com', '9876543208'),
('Arjun Mehta', 'arjun@example.com', '9876543209'),
('Pooja Sharma', 'pooja@example.com', '9876543210'),
('Karan Malhotra', 'karan@example.com', '9876543211'),
('Simran Kaur', 'simran@example.com', '9876543212'),
('Manish Yadav', 'manish@example.com', '9876543213'),
('Riya Das', 'riya@example.com', '9876543214'),
('Aditya Singh', 'aditya@example.com', '9876543215'),
('Nisha Patel', 'nisha@example.com', '9876543216'),
('Saurabh Jain', 'saurabh@example.com', '9876543217'),
('Kavita Sharma', 'kavita@example.com', '9876543218'),
('Deepak Verma', 'deepak@example.com', '9876543219'),
('Meena Kumari', 'meena@example.com', '9876543220');

-- ============================================
-- CATEGORIES
-- ============================================

INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Mobiles', 'Smartphones and mobile accessories'),
('Laptops', 'Laptops and computing devices'),
('Fashion', 'Clothing and fashion products'),
('Home Appliances', 'Appliances for home'),
('Books', 'Books and educational material'),
('Gaming', 'Gaming consoles and accessories'),
('Sports', 'Sports equipment'),
('Beauty', 'Beauty and personal care'),
('Furniture', 'Home and office furniture');

-- ============================================
-- PRODUCTS
-- ============================================
INSERT INTO products
(name, category_id, price, stock, brand)
VALUES
('Sony Headphones', 1, 12999.00, 100, 'Sony'),
('JBL Speaker', 1, 8999.00, 80, 'JBL'),
('Apple AirPods Pro', 1, 24999.00, 50, 'Apple'),
('Logitech Keyboard', 1, 5999.00, 120, 'Logitech'),
('iPhone 16', 2, 79999.00, 30, 'Apple'),
('Samsung Galaxy S25', 2, 74999.00, 40, 'Samsung'),
('OnePlus 13', 2, 64999.00, 35, 'OnePlus'),
('Google Pixel 9', 2, 69999.00, 25, 'Google'),
('MacBook Pro M4', 3, 189999.00, 15, 'Apple'),
('Dell XPS 15', 3, 159999.00, 20, 'Dell'),
('HP Spectre x360', 3, 139999.00, 25, 'HP'),
('Lenovo ThinkPad X1', 3, 149999.00, 30, 'Lenovo'),
('Nike Air Max', 4, 12999.00, 100, 'Nike'),
('Adidas Running Shoes', 4, 9999.00, 100, 'Adidas'),
('Levis Jeans', 4, 4999.00, 150, 'Levis'),
('Puma T-Shirt', 4, 2999.00, 200, 'Puma'),
('LG Washing Machine', 5, 54999.00, 20, 'LG'),
('Samsung Refrigerator', 5, 69999.00, 15, 'Samsung'),
('Philips Air Fryer', 5, 11999.00, 50, 'Philips'),
('Clean Code', 6, 999.00, 200, 'Robert Martin'),
('Design Patterns', 6, 1499.00, 150, 'Gang of Four'),
('System Design Interview', 6, 1299.00, 200, 'Alex Xu'),
('PlayStation 5', 7, 54999.00, 25, 'Sony'),
('Xbox Series X', 7, 52999.00, 20, 'Microsoft'),
('Gaming Mouse', 7, 4999.00, 100, 'Razer'),
('Cricket Bat', 8, 7999.00, 50, 'SG'),
('Football', 8, 1999.00, 100, 'Nivia'),
('Running Shoes Pro', 8, 8999.00, 80, 'Asics'),
('Face Serum', 9, 1499.00, 100, 'Minimalist'),
('Hair Dryer', 9, 2999.00, 60, 'Philips'),
('Office Chair', 10, 14999.00, 40, 'GreenSoul'),
('Study Table', 10, 10999.00, 30, 'Wakefit');


-- ============================================
-- ORDERS
-- ============================================

INSERT INTO orders
(id, user_id, status, order_date)
VALUES
(1, 1, 'completed', '2026-08-01 10:15:00'),
(2, 2, 'completed', '2026-08-02 11:30:00'),
(3, 3, 'processing', '2026-08-03 12:45:00'),
(4, 4, 'completed', '2026-08-04 14:00:00'),
(5, 5, 'cancelled', '2026-08-05 15:15:00'),
(6, 6, 'completed', '2026-08-06 16:30:00'),
(7, 7, 'completed', '2026-08-07 17:45:00'),
(8, 8, 'pending', '2026-08-08 09:00:00'),
(9, 9, 'completed', '2026-08-09 10:15:00'),
(10, 10, 'completed', '2026-08-10 11:30:00'),
(11, 11, 'processing', '2026-08-11 12:45:00'),
(12, 12, 'completed', '2026-08-12 14:00:00'),
(13, 13, 'completed', '2026-08-13 15:15:00'),
(14, 14, 'completed', '2026-08-14 16:30:00'),
(15, 15, 'cancelled', '2026-08-15 17:45:00'),
(16, 16, 'completed', '2026-08-16 09:00:00'),
(17, 17, 'pending', '2026-08-17 10:15:00'),
(18, 18, 'completed', '2026-08-18 11:30:00'),
(19, 19, 'completed', '2026-08-19 12:45:00'),
(20, 20, 'processing', '2026-08-20 14:00:00');


-- ============================================
-- ORDER ITEMS
-- ============================================

INSERT INTO order_items
(order_id, product_id, quantity, price)
VALUES
(1, 5, 1, 79999),
(1, 1, 2, 12999),
(2, 9, 1, 189999),
(2, 20, 2, 999),
(3, 6, 1, 74999),
(3, 3, 1, 24999),
(4, 23, 1, 54999),
(4, 25, 1, 4999),
(5, 10, 1, 159999),
(6, 5, 1, 79999),
(6, 7, 1, 64999),
(7, 9, 1, 189999),
(7, 4, 2, 5999),
(8, 6, 1, 74999),
(8, 13, 2, 12999),
(9, 23, 1, 54999),
(10, 1, 2, 12999),
(10, 14, 2, 9999),
(11, 8, 1, 69999),
(11, 15, 3, 4999),
(12, 17, 1, 54999),
(13, 5, 1, 79999),
(14, 18, 1, 69999),
(14, 19, 2, 11999),
(15, 24, 1, 52999),
(15, 25, 2, 4999),
(16, 31, 1, 14999),
(16, 32, 1, 10999),
(17, 27, 2, 1999),
(17, 28, 1, 8999),
(18, 9, 1, 189999),
(19, 21, 2, 1499),
(19, 22, 2, 1299),
(20, 30, 1, 2999),
(20, 29, 2, 1499);

-- ============================================
-- VERIFY DATA
-- ============================================

SELECT COUNT(*) AS total_users
FROM users;

SELECT COUNT(*) AS total_categories
FROM categories;

SELECT COUNT(*) AS total_products
FROM products;

SELECT COUNT(*) AS total_orders
FROM orders;

SELECT COUNT(*) AS total_order_items
FROM order_items;