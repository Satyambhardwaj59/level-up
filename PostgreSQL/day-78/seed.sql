
-- USERS
-- =========================================================

INSERT INTO users
(name, email, phone, password_hash)
VALUES
('Rahul Sharma', 'rahul@example.com', '9876543210', 'hash_rahul'),
('Priya Singh', 'priya@example.com', '9876543211', 'hash_priya'),
('Amit Kumar', 'amit@example.com', '9876543212', 'hash_amit'),
('Neha Verma', 'neha@example.com', '9876543213', 'hash_neha'),
('Rohit Gupta', 'rohit@example.com', '9876543214', 'hash_rohit'),
('Anjali Mehta', 'anjali@example.com', '9876543215', 'hash_anjali'),
('Vikas Yadav', 'vikas@example.com', '9876543216', 'hash_vikas'),
('Sneha Patel', 'sneha@example.com', '9876543217', 'hash_sneha'),
('Arjun Singh', 'arjun@example.com', '9876543218', 'hash_arjun'),
('Pooja Sharma', 'pooja@example.com', '9876543219', 'hash_pooja');


-- =========================================================
-- ADDRESSES
-- =========================================================

INSERT INTO addresses
(user_id, address_line, city, state, postal_code, country, is_default)
VALUES
(1, '12 MG Road', 'Patna', 'Bihar', '800001', 'India', TRUE),
(1, '45 Boring Road', 'Patna', 'Bihar', '800013', 'India', FALSE),

(2, '22 Park Street', 'Kolkata', 'West Bengal', '700016', 'India', TRUE),

(3, '15 Sector 18', 'Noida', 'Uttar Pradesh', '201301', 'India', TRUE),

(4, '8 Fraser Road', 'Patna', 'Bihar', '800001', 'India', TRUE),

(5, '101 MG Road', 'Bengaluru', 'Karnataka', '560001', 'India', TRUE),

(6, '34 FC Road', 'Pune', 'Maharashtra', '411004', 'India', TRUE),

(7, '55 C Scheme', 'Jaipur', 'Rajasthan', '302001', 'India', TRUE),

(8, '77 SG Highway', 'Ahmedabad', 'Gujarat', '380054', 'India', TRUE),

(9, '18 Connaught Place', 'New Delhi', 'Delhi', '110001', 'India', TRUE),

(10, '12 Anna Nagar', 'Chennai', 'Tamil Nadu', '600040', 'India', TRUE);


-- =========================================================
-- CATEGORIES
-- =========================================================

INSERT INTO categories
(name, description)
VALUES
('Electronics', 'Phones, laptops and electronic accessories'),
('Clothing', 'Fashion and apparel'),
('Footwear', 'Shoes and footwear'),
('Home & Kitchen', 'Home appliances and kitchen products'),
('Sports', 'Sports and fitness products');


-- =========================================================
-- PRODUCTS
-- =========================================================

INSERT INTO products
(category_id, sku, name, description, price, stock)
VALUES
(1, 'ELEC-IP15', 'iPhone 15', 'Apple smartphone', 69999, 20),
(1, 'ELEC-SGA55', 'Samsung Galaxy A55', 'Android smartphone', 32999, 30),
(1, 'ELEC-OP12', 'OnePlus 12', 'Flagship Android smartphone', 59999, 15),
(1, 'ELEC-HP15', 'HP Pavilion 15', 'Performance laptop', 64999, 10),

(2, 'CLOTH-TSHIRT', 'Classic T-Shirt', 'Cotton casual t-shirt', 799, 100),
(2, 'CLOTH-JEANS', 'Slim Fit Jeans', 'Denim jeans', 1899, 60),
(2, 'CLOTH-HOODIE', 'Winter Hoodie', 'Warm fleece hoodie', 2299, 40),
(2, 'CLOTH-SHIRT', 'Formal Shirt', 'Office formal shirt', 1499, 50),

(3, 'SHOE-RUNNER', 'Running Shoes', 'Lightweight running shoes', 2999, 35),
(3, 'SHOE-CASUAL', 'Casual Sneakers', 'Daily wear sneakers', 2499, 45),
(3, 'SHOE-FORMAL', 'Formal Shoes', 'Leather formal shoes', 3499, 25),

(4, 'HOME-AIRFRY', 'Air Fryer', 'Digital air fryer', 5999, 25),
(4, 'HOME-MIXER', 'Mixer Grinder', '750W mixer grinder', 3499, 35),
(4, 'HOME-KETTLE', 'Electric Kettle', '1.5L kettle', 1299, 50),
(4, 'HOME-VACUUM', 'Vacuum Cleaner', 'Home vacuum cleaner', 7499, 15),

(5, 'SPORT-BAT', 'Cricket Bat', 'English willow bat', 5499, 20),
(5, 'SPORT-FOOTBALL', 'Football', 'Professional football', 1299, 40),
(5, 'SPORT-YOGA', 'Yoga Mat', 'Non-slip yoga mat', 899, 80),
(5, 'SPORT-DUMBBELL', 'Dumbbell Set', 'Adjustable dumbbell set', 3499, 25);


-- =========================================================
-- PRODUCT VARIANTS
-- =========================================================

INSERT INTO product_variants
(product_id, sku, size, color, price, stock)
VALUES
(5, 'TS-M-BLK', 'M', 'Black', 799, 30),
(5, 'TS-L-BLK', 'L', 'Black', 799, 25),
(5, 'TS-M-WHT', 'M', 'White', 799, 20),

(6, 'JEANS-32-BLU', '32', 'Blue', 1899, 20),
(6, 'JEANS-34-BLU', '34', 'Blue', 1899, 20),
(6, 'JEANS-32-BLK', '32', 'Black', 1999, 15),

(7, 'HOOD-M-GRY', 'M', 'Grey', 2299, 15),
(7, 'HOOD-L-GRY', 'L', 'Grey', 2299, 10),
(7, 'HOOD-XL-BLK', 'XL', 'Black', 2399, 10),
(8, 'SHIRT-M-WHT', 'M', 'White', 1499, 15),
(8, 'SHIRT-L-BLU', 'L', 'Blue', 1499, 15),
(9, 'RUN-8-BLK', '8', 'Black', 2999, 10),
(9, 'RUN-9-BLK', '9', 'Black', 2999, 10),
(9, 'RUN-10-WHT', '10', 'White', 3099, 8);


-- =========================================================
-- ORDERS
-- =========================================================

INSERT INTO orders
(user_id, status, subtotal, tax, shipping_fee, discount, total_amount)
VALUES
(1, 'delivered', 70798, 12743.64, 0, 1000, 82541.64),
(2, 'delivered', 5999, 1079.82, 99, 0, 7177.82),
(3, 'shipped', 32999, 5939.82, 0, 500, 38438.82),
(4, 'processing', 7499, 1349.82, 99, 0, 8947.82),
(5, 'pending', 1899, 341.82, 99, 0, 2339.82),
(6, 'delivered', 4298, 773.64, 99, 200, 4970.64),
(7, 'cancelled', 5499, 989.82, 0, 0, 6488.82),
(8, 'delivered', 1299, 233.82, 99, 0, 1631.82);


-- =========================================================
-- ORDER ITEMS
-- =========================================================

INSERT INTO order_items
(order_id, product_id, quantity, unit_price, subtotal)
VALUES
(1, 1, 1, 69999, 69999),
(1, 5, 1, 799, 799),

(2, 12, 1, 5999, 5999),

(3, 2, 1, 32999, 32999),

(4, 15, 1, 7499, 7499),

(5, 6, 1, 1899, 1899),

(6, 5, 2, 799, 1598),
(6, 8, 1, 1499, 1499),
(6, 14, 1, 1299, 1299),

(7, 16, 1, 5499, 5499),

(8, 14, 1, 1299, 1299);


-- =========================================================
-- PAYMENTS
-- =========================================================

INSERT INTO payments
(order_id, payment_method, payment_status, transaction_id, amount)
VALUES
(1, 'card', 'paid', 'TXN-10001', 82541.64),
(2, 'upi', 'paid', 'TXN-10002', 7177.82),
(3, 'card', 'paid', 'TXN-10003', 38438.82),
(4, 'upi', 'paid', 'TXN-10004', 8947.82),
(5, 'cod', 'pending', NULL, 2339.82),
(6, 'card', 'paid', 'TXN-10006', 4970.64),
(7, 'card', 'refunded', 'TXN-10007', 6488.82),
(8, 'upi', 'paid', 'TXN-10008', 1631.82);


-- =========================================================
-- VERIFY
-- =========================================================

SELECT 'users' AS table_name, COUNT(*) AS total FROM users
UNION ALL
SELECT 'addresses', COUNT(*) FROM addresses
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'product_variants', COUNT(*) FROM product_variants
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;