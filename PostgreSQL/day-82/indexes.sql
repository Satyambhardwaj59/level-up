-- CHALLENGE 1
-- USER EMAIL SEARCH
CREATE INDEX idx_users_email
ON users(email);

-- CHALLENGE 2
-- CUSTOMER ORDER HISTORY
CREATE INDEX idx_orders_user_created
ON orders(user_id, created_at DESC);

-- CHALLENGE 3
-- CATEGORY + PRICE
CREATE INDEX idx_products_category_price
ON products(category_id, price);

-- CHALLENGE 4
-- PARTIAL INDEX FOR PENDING ORDERS
CREATE INDEX idx_orders_pending
ON orders(created_at DESC)
WHERE status = 'pending';

-- CHALLENGE 5
-- CASE-INSENSITIVE EMAIL SEARCH
CREATE INDEX idx_users_lower_email
ON users(LOWER(email));

-- CHALLENGE 6
-- EXPENSIVE PRODUCTS
CREATE INDEX idx_products_price_desc
ON products(price DESC);

-- CHALLENGE 7
-- USER + STATUS + CREATED_AT
CREATE INDEX idx_orders_user_status_created
ON orders(
    user_id,
    status,
    created_at DESC
);

-- CHALLENGE 8
-- ORDER ITEMS → ORDERS
CREATE INDEX idx_order_items_order
ON order_items(order_id);

-- CHALLENGE 8
-- ORDER ITEMS → PRODUCTS
CREATE INDEX idx_order_items_product
ON order_items(product_id);

-- PAYMENT ANALYSIS
CREATE INDEX idx_payments_order
ON payments(order_id);

CREATE INDEX idx_payments_status
ON payments(payment_status);

-- ACTIVE PRODUCTS
CREATE INDEX idx_active_products
ON products(category_id, price)
WHERE is_active = TRUE;

-- UPDATE STATISTICS
ANALYZE users;
ANALYZE products;
ANALYZE orders;
ANALYZE order_items;
ANALYZE payments;

-- SHOW INDEXES
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;