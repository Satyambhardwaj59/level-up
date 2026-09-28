-- ==========================================
-- USERS
-- ==========================================

CREATE INDEX idx_users_created_at
ON users(created_at);


-- email already has a UNIQUE index.


-- ==========================================
-- PRODUCTS
-- ==========================================

CREATE INDEX idx_products_category
ON products(category_id);

CREATE INDEX idx_products_category_price
ON products(category_id, price);

CREATE INDEX idx_products_active
ON products(category_id, price)
WHERE is_active = TRUE;

CREATE INDEX idx_products_price_desc
ON products(price DESC);

CREATE INDEX idx_products_metadata_gin
ON products
USING GIN(metadata);

CREATE INDEX idx_products_tags_gin
ON products
USING GIN(tags);

CREATE INDEX idx_products_regions_gin
ON products
USING GIN(regions);


-- ==========================================
-- INVENTORY
-- ==========================================

-- product_id is already the primary key.


-- ==========================================
-- ORDERS
-- ==========================================

CREATE INDEX idx_orders_user_created
ON orders(user_id, created_at DESC);

CREATE INDEX idx_orders_user_status_created
ON orders(
    user_id,
    status,
    created_at DESC
);

CREATE INDEX idx_orders_pending
ON orders(created_at DESC)
WHERE status = 'pending';


-- ==========================================
-- ORDER ITEMS
-- ==========================================

CREATE INDEX idx_order_items_order
ON order_items(order_id);

CREATE INDEX idx_order_items_product
ON order_items(product_id);


-- ==========================================
-- PAYMENTS
-- ==========================================

CREATE INDEX idx_payments_order
ON payments(order_id);

CREATE INDEX idx_payments_status
ON payments(status);


ANALYZE;