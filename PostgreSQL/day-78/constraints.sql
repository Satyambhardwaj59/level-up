-- 1. DUPLICATE USER EMAIL
-- Expected: FAIL
INSERT INTO users
(name, email, password_hash)
VALUES
('Duplicate User', 'rahul@example.com', 'hash');

-- 2. NULL USER NAME
-- Expected: FAIL

INSERT INTO users
(name, email, password_hash)
VALUES
(NULL, 'nullname@example.com', 'hash');

-- 3. DUPLICATE PRODUCT SKU
-- Expected: FAIL

INSERT INTO products
(category_id, sku, name, price)
VALUES
(1, 'ELEC-IP15', 'Duplicate iPhone', 50000);

-- 4. NEGATIVE PRODUCT PRICE
-- Expected: FAIL
INSERT INTO products
(category_id, sku, name, price, stock)
VALUES
(1, 'TEST-NEG-PRICE', 'Negative Price Product', -100, 10);

-- 5. NEGATIVE STOCK
-- Expected: FAIL
INSERT INTO products
(category_id, sku, name, price, stock)
VALUES
(1, 'TEST-NEG-STOCK', 'Negative Stock Product', 1000, -5);

-- 6. INVALID CATEGORY
-- Expected: FAIL
INSERT INTO products
(category_id, sku, name, price)
VALUES
(99999, 'TEST-CATEGORY', 'Invalid Category Product', 1000);

-- 7. INVALID ORDER STATUS
-- Expected: FAIL
INSERT INTO orders
(user_id, status, subtotal, total_amount)
VALUES
(1, 'unknown_status', 1000, 1000);

-- 8. NEGATIVE ORDER TOTAL
-- Expected: FAIL
INSERT INTO orders
(user_id, status, subtotal, total_amount)
VALUES
(1, 'pending', 1000, -100);

-- 9. ZERO ORDER ITEM QUANTITY
-- Expected: FAIL
INSERT INTO order_items
(order_id, product_id, quantity, unit_price, subtotal)
VALUES
(1, 1, 0, 69999, 0);

-- 10. NEGATIVE UNIT PRICE
-- Expected: FAIL
INSERT INTO order_items
(order_id, product_id, quantity, unit_price, subtotal)
VALUES
(1, 1, 1, -500, -500);

-- 11. INVALID ORDER ID
-- Expected: FAIL
INSERT INTO order_items
(order_id, product_id, quantity, unit_price, subtotal)
VALUES
(99999, 1, 1, 69999, 69999);

-- 12. DUPLICATE PAYMENT TRANSACTION
-- Expected: FAIL
INSERT INTO payments
(order_id, payment_method, payment_status, transaction_id, amount)
VALUES
(2, 'card', 'paid', 'TXN-10001', 1000);

-- 13. NEGATIVE PAYMENT
-- Expected: FAIL
INSERT INTO payments
(order_id, payment_method, payment_status, amount)
VALUES
(2, 'card', 'paid', -100);

-- 14. INVALID PAYMENT METHOD
-- Expected: FAIL
INSERT INTO payments
(order_id, payment_method, payment_status, amount)
VALUES
(2, 'crypto', 'paid', 1000);

-- 15. INVALID PAYMENT STATUS
-- Expected: FAIL
INSERT INTO payments
(order_id, payment_method, payment_status, amount)
VALUES
(2, 'card', 'completed', 1000);

-- 16. DUPLICATE PRODUCT VARIANT
-- Expected: FAIL
INSERT INTO product_variants
(product_id, sku, size, color, price, stock)
VALUES
(5, 'DUPLICATE-VARIANT', 'M', 'Black', 799, 10);

-- 17. NEGATIVE VARIANT STOCK
-- Expected: FAIL
INSERT INTO product_variants
(product_id, sku, size, color, price, stock)
VALUES
(5, 'NEGATIVE-VARIANT', 'XL', 'Red', 799, -10);

-- 18. NEGATIVE VARIANT PRICE
-- Expected: FAIL
INSERT INTO product_variants
(product_id, sku, size, color, price, stock)
VALUES
(5, 'NEGATIVE-PRICE-VARIANT', 'XL', 'Blue', -500, 10);

-- 19. INVALID USER FOREIGN KEY
-- Expected: FAIL
INSERT INTO addresses
(
    user_id,
    address_line,
    city,
    state,
    postal_code
)
VALUES
(
    99999,
    'Unknown Address',
    'Patna',
    'Bihar',
    '800001'
);

-- 20. FINAL CONSTRAINT VERIFICATION

SELECT
    conname,
    contype
FROM pg_constraint
WHERE connamespace = 'public'::regnamespace
ORDER BY conname;