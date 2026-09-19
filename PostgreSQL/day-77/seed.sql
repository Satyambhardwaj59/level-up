-- =========================================================
-- USERS - 20
-- =========================================================

INSERT INTO users (name, email, phone)
VALUES
('Rahul Sharma', 'rahul.sharma@example.com', '9876543210'),
('Priya Singh', 'priya.singh@example.com', '9876543211'),
('Amit Kumar', 'amit.kumar@example.com', '9876543212'),
('Neha Verma', 'neha.verma@example.com', '9876543213'),
('Rohit Gupta', 'rohit.gupta@example.com', '9876543214'),
('Anjali Mehta', 'anjali.mehta@example.com', '9876543215'),
('Vikas Yadav', 'vikas.yadav@example.com', '9876543216'),
('Sneha Patel', 'sneha.patel@example.com', '9876543217'),
('Arjun Singh', 'arjun.singh@example.com', '9876543218'),
('Pooja Sharma', 'pooja.sharma@example.com', '9876543219'),
('Karan Malhotra', 'karan.malhotra@example.com', '9876543220'),
('Simran Kaur', 'simran.kaur@example.com', '9876543221'),
('Aditya Raj', 'aditya.raj@example.com', '9876543222'),
('Nisha Kumari', 'nisha.kumari@example.com', '9876543223'),
('Manish Kumar', 'manish.kumar@example.com', '9876543224'),
('Riya Gupta', 'riya.gupta@example.com', '9876543225'),
('Saurabh Singh', 'saurabh.singh@example.com', '9876543226'),
('Kavita Joshi', 'kavita.joshi@example.com', '9876543227'),
('Deepak Verma', 'deepak.verma@example.com', '9876543228'),
('Meena Devi', 'meena.devi@example.com', '9876543229');


-- =========================================================
-- CATEGORIES - 5
-- =========================================================

INSERT INTO categories (name, description)
VALUES
('Electronics', 'Smartphones, laptops and electronic accessories'),
('Clothing', 'Men and women fashion products'),
('Home & Kitchen', 'Home appliances and kitchen products'),
('Books', 'Educational, technical and fiction books'),
('Sports', 'Sports equipment and fitness accessories');


-- =========================================================
-- PRODUCTS - 30
-- =========================================================

INSERT INTO products
(category_id, name, description, price, stock, is_active)
VALUES
(1, 'Samsung Galaxy A55', 'Mid-range Android smartphone', 32999, 25, TRUE),
(1, 'iPhone 15', 'Apple smartphone with advanced camera', 69999, 15, TRUE),
(1, 'OnePlus Nord CE 4', 'Fast performance Android phone', 24999, 30, TRUE),
(1, 'Redmi Note 13', 'Affordable performance smartphone', 15999, 50, TRUE),
(1, 'HP Pavilion 15', '15-inch performance laptop', 64999, 12, TRUE),
(1, 'Dell Inspiron 14', 'Compact business laptop', 58999, 10, TRUE),

(2, 'Classic Cotton T-Shirt', 'Premium cotton casual t-shirt', 799, 100, TRUE),
(2, 'Slim Fit Jeans', 'Modern slim fit denim jeans', 1899, 70, TRUE),
(2, 'Formal Shirt', 'Office wear formal shirt', 1499, 60, TRUE),
(2, 'Winter Hoodie', 'Warm fleece hoodie', 2299, 40, TRUE),
(2, 'Running Shoes', 'Lightweight everyday running shoes', 2999, 35, TRUE),
(2, 'Leather Jacket', 'Premium synthetic leather jacket', 4999, 20, TRUE),

(3, 'Mixer Grinder', '750W kitchen mixer grinder', 3499, 45, TRUE),
(3, 'Air Fryer', 'Digital air fryer for healthy cooking', 5999, 25, TRUE),
(3, 'Electric Kettle', '1.5L stainless steel kettle', 1299, 55, TRUE),
(3, 'Non Stick Cookware Set', '5-piece cookware set', 2799, 30, TRUE),
(3, 'Vacuum Cleaner', 'Powerful home vacuum cleaner', 7499, 18, TRUE),
(3, 'Coffee Maker', 'Automatic coffee brewing machine', 4599, 22, TRUE),

(4, 'Clean Code', 'Software development best practices', 699, 80, TRUE),
(4, 'Designing Data Intensive Applications', 'Advanced distributed systems book', 1299, 45, TRUE),
(4, 'The Pragmatic Programmer', 'Programming and engineering practices', 899, 60, TRUE),
(4, 'JavaScript: The Good Parts', 'JavaScript programming guide', 599, 90, TRUE),
(4, 'Database System Concepts', 'Database fundamentals textbook', 1099, 40, TRUE),
(4, 'Learning PostgreSQL', 'Practical PostgreSQL development guide', 799, 35, TRUE),

(5, 'Cricket Bat', 'English willow cricket bat', 5499, 20, TRUE),
(5, 'Football', 'Professional size football', 1299, 50, TRUE),
(5, 'Yoga Mat', 'Non-slip exercise yoga mat', 899, 75, TRUE),
(5, 'Dumbbell Set', 'Adjustable home dumbbell set', 3499, 25, TRUE),
(5, 'Badminton Racket', 'Lightweight carbon racket', 1899, 40, TRUE),
(5, 'Skipping Rope', 'Adjustable fitness skipping rope', 499, 100, TRUE);


-- =========================================================
-- ORDERS - 15
-- =========================================================

INSERT INTO orders
(user_id, status, total_amount)
VALUES
(1, 'delivered', 35498),
(2, 'delivered', 69999),
(3, 'shipped', 5998),
(4, 'processing', 7499),
(5, 'pending', 2799),
(6, 'delivered', 1698),
(7, 'cancelled', 4999),
(8, 'delivered', 1299),
(9, 'shipped', 6999),
(10, 'processing', 4599),
(11, 'delivered', 699),
(12, 'pending', 1299),
(13, 'delivered', 10398),
(14, 'shipped', 1899),
(15, 'delivered', 3499);


-- =========================================================
-- ORDER ITEMS - 40
-- =========================================================

INSERT INTO order_items
(order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 32999),
(1, 7, 1, 799),
(1, 19, 1, 699),
(1, 30, 2, 499),

(2, 2, 1, 69999),

(3, 11, 2, 2999),

(4, 17, 1, 7499),

(5, 16, 1, 2799),

(6, 7, 1, 799),
(6, 22, 1, 599),

(7, 12, 1, 4999),

(8, 15, 1, 1299),

(9, 13, 1, 3499),
(9, 30, 1, 499),
(9, 26, 1, 1299),
(9, 27, 1, 899),
(9, 29, 1, 1899),

(10, 18, 1, 4599),

(11, 19, 1, 699),

(12, 20, 1, 1299),

(13, 24, 1, 799),
(13, 25, 1, 1299),
(13, 28, 1, 3499),
(13, 29, 1, 1899),
(13, 23, 1, 1099),

(14, 8, 1, 1899),

(15, 28, 1, 3499);


-- =========================================================
-- VERIFY COUNTS
-- =========================================================

SELECT 'users' AS table_name, COUNT(*) AS total
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
FROM order_items;