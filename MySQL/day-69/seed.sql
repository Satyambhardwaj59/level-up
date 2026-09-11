USE ecommerce_analytics;

-- =========================
-- USERS
-- =========================

INSERT INTO users (name, email, city, created_at) VALUES
('Rahul Sharma', 'rahul@gmail.com', 'Delhi', '2025-01-10'),
('Amit Kumar', 'amit@gmail.com', 'Patna', '2025-01-15'),
('Priya Singh', 'priya@gmail.com', 'Mumbai', '2025-02-01'),
('Neha Verma', 'neha@gmail.com', 'Bangalore', '2025-02-10'),
('Rohit Gupta', 'rohit@gmail.com', 'Kolkata', '2025-02-20'),
('Ankit Raj', 'ankit@gmail.com', 'Patna', '2025-03-01'),
('Sneha Das', 'sneha@gmail.com', 'Kolkata', '2025-03-10'),
('Vikas Yadav', 'vikas@gmail.com', 'Lucknow', '2025-03-15'),
('Pooja Singh', 'pooja@gmail.com', 'Jaipur', '2025-04-01'),
('Karan Mehta', 'karan@gmail.com', 'Ahmedabad', '2025-04-10'),
('Arjun Patel', 'arjun@gmail.com', 'Surat', '2025-04-15'),
('Simran Kaur', 'simran@gmail.com', 'Chandigarh', '2025-05-01'),
('Deepak Singh', 'deepak@gmail.com', 'Ranchi', '2025-05-10'),
('Nisha Sharma', 'nisha@gmail.com', 'Delhi', '2025-05-20'),
('Manish Kumar', 'manish@gmail.com', 'Patna', '2025-06-01');

-- =========================
-- CATEGORIES
-- =========================

INSERT INTO categories (name) VALUES
('Electronics'),
('Mobiles'),
('Laptops'),
('Accessories'),
('Gaming');

-- =========================
-- PRODUCTS
-- =========================

INSERT INTO products
(name, category_id, price, stock)
VALUES
('Wireless Mouse', 4, 1200, 5000),
('Mechanical Keyboard', 4, 4500, 3000),
('Gaming Headset', 5, 6500, 2500),
('iPhone 15', 2, 70000, 500),
('Samsung Galaxy S24', 2, 65000, 700),
('OnePlus 12', 2, 55000, 800),
('MacBook Air M2', 3, 100000, 300),
('Dell Inspiron', 3, 75000, 500),
('HP Pavilion', 3, 65000, 600),
('Gaming Laptop', 5, 120000, 200),
('Monitor 24 Inch', 1, 15000, 1000),
('Monitor 27 Inch', 1, 25000, 800),
('Webcam HD', 1, 5000, 2000),
('USB-C Hub', 4, 3000, 4000),
('Gaming Mouse', 5, 3500, 5000),
('Tablet', 1, 30000, 700),
('Smart Watch', 1, 10000, 1500),
('Bluetooth Speaker', 1, 8000, 1800),
('Old Keyboard', 4, 1000, 1000),
('Unused Camera', 1, 45000, 200);




INSERT INTO orders (user_id, order_date, status) VALUES
(1, '2025-06-01', 'completed'),
(1, '2025-06-05', 'completed'),
(1, '2025-06-10', 'completed'),
(1, '2025-06-15', 'completed'),
(1, '2025-06-20', 'completed'),
(1, '2025-06-25', 'completed'),

(2, '2025-06-02', 'completed'),
(2, '2025-06-08', 'completed'),
(2, '2025-06-18', 'completed'),

(3, '2025-06-03', 'completed'),
(3, '2025-06-12', 'completed'),

(4, '2025-06-04', 'completed'),
(4, '2025-06-20', 'completed'),

(5, '2025-06-05', 'completed'),

(6, '2025-06-07', 'completed'),
(6, '2025-06-17', 'completed'),
(6, '2025-06-27', 'completed'),

(7, '2025-06-09', 'completed'),

(8, '2025-06-11', 'completed'),
(8, '2025-06-21', 'completed'),

(9, '2025-06-13', 'completed'),

(10, '2025-06-14', 'completed'),
(10, '2025-06-24', 'completed'),

(11, '2025-06-16', 'completed'),

(12, '2025-06-19', 'completed'),

(13, '2025-06-22', 'completed'),

(14, '2025-06-23', 'completed');



INSERT INTO order_items
(order_id, product_id, quantity, price)
VALUES

(1, 4, 1, 70000),
(1, 1, 2, 1200),
(2, 7, 1, 100000),
(3, 11, 2, 15000),
(4, 10, 1, 120000),
(5, 12, 1, 25000),
(6, 3, 2, 6500),
(7, 5, 1, 65000),
(8, 8, 1, 75000),
(9, 15, 3, 3500),
(10, 4, 1, 70000),
(11, 16, 2, 30000),
(12, 7, 1, 100000),
(13, 17, 2, 10000),
(14, 6, 1, 55000),
(15, 10, 1, 120000),
(16, 11, 2, 15000),
(17, 3, 2, 6500),
(18, 18, 2, 8000),
(19, 9, 1, 65000),
(20, 13, 3, 5000),
(21, 8, 1, 75000),
(22, 7, 1, 100000),
(23, 2, 2, 4500),
(24, 12, 2, 25000),
(25, 5, 1, 65000),
(26, 14, 2, 3000),
(27, 16, 1, 30000);