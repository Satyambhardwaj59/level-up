INSERT INTO users (name, email)
VALUES
('Satyam Kumar', 'satyam@example.com'),
('Rahul Sharma', 'rahul@example.com'),
('Priya Singh', 'priya@example.com'),
('Aman Verma', 'aman@example.com'),
('Neha Gupta', 'neha@example.com'),
('Rohit Kumar', 'rohit@example.com');

INSERT INTO addresses
(user_id, address_line, city, state, pincode)
VALUES
(1, 'Main Road', 'Patna', 'Bihar', '800001'),
(2, 'MG Road', 'Delhi', 'Delhi', '110001'),
(3, 'Park Street', 'Kolkata', 'West Bengal', '700016'),
(4, 'Station Road', 'Mumbai', 'Maharashtra', '400001');

INSERT INTO categories (name)
VALUES
('Electronics'),
('Clothing'),
('Books'),
('Gaming'),
('Accessories');

INSERT INTO products
(category_id, name, description, base_price)
VALUES
(1, 'Laptop', 'Developer laptop', 65000),
(1, 'Smartphone', 'Android smartphone', 30000),
(2, 'T-Shirt', 'Cotton t-shirt', 799),
(2, 'Jeans', 'Regular fit jeans', 1999),
(3, 'SQL Book', 'PostgreSQL learning book', 999),
(3, 'JavaScript Book', 'Advanced JavaScript', 1299),
(4, 'Gaming Mouse', 'RGB gaming mouse', 2499),
(4, 'Mechanical Keyboard', 'RGB mechanical keyboard', 4999),
(5, 'USB Cable', 'Type-C cable', 499),
(5, 'Laptop Stand', 'Aluminium laptop stand', 1499);

INSERT INTO product_variants
(product_id, sku, variant_name, price, stock)
VALUES
(1, 'LAP-001', '16GB RAM', 65000, 10),
(1, 'LAP-002', '32GB RAM', 80000, 5),
(2, 'PHN-001', '128GB', 30000, 20),
(3, 'TSH-001', 'Black-L', 799, 50),
(7, 'MOU-001', 'RGB', 2499, 30),
(8, 'KEY-001', 'Blue Switch', 4999, 15);

INSERT INTO orders
(user_id, status, total_amount)
VALUES
(1, 'completed', 67499),
(1, 'completed', 999),
(2, 'completed', 34999),
(2, 'pending', 4999),
(3, 'completed', 1299),
(3, 'cancelled', 799),
(4, 'completed', 7498);

INSERT INTO order_items
(order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 65000),
(1, 7, 1, 2499),

(2, 5, 1, 999),

(3, 2, 1, 30000),
(3, 9, 1, 499),

(4, 8, 1, 4999),

(5, 6, 1, 1299),

(6, 3, 1, 799),

(7, 8, 1, 4999),
(7, 7, 1, 2499);

INSERT INTO payments
(order_id, payment_method, payment_status, transaction_id)
VALUES
(1, 'UPI', 'success', 'TXN001'),
(2, 'CARD', 'success', 'TXN002'),
(3, 'UPI', 'success', 'TXN003'),
(5, 'CARD', 'success', 'TXN005'),
(7, 'UPI', 'success', 'TXN007');