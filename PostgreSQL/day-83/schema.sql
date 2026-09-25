
-- DAY 83 - PRODUCTION E-COMMERCE CONCURRENCY
-- PostgreSQL


DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- USERS
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- PRODUCTS
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0)
);

-- INVENTORY
CREATE TABLE inventory (
    product_id BIGINT PRIMARY KEY,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- ORDERS
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    total_amount NUMERIC(12,2) NOT NULL
        CHECK (total_amount >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),
    CONSTRAINT chk_order_status
        CHECK (
            status IN (
                'pending',
                'confirmed',
                'processing',
                'shipped',
                'delivered',
                'cancelled'
            )
        )
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL
        CHECK (quantity > 0),
    price NUMERIC(12,2) NOT NULL
        CHECK (price >= 0),

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

-- PAYMENTS
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL,

    amount NUMERIC(12,2) NOT NULL
        CHECK (amount >= 0),

    status VARCHAR(30) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_payment_status
        CHECK (
            status IN (
                'pending',
                'success',
                'failed',
                'refunded'
            )
        )
);


-- INDEXES
CREATE INDEX idx_orders_user_id
ON orders(user_id);

CREATE INDEX idx_order_items_order_id
ON order_items(order_id);

CREATE INDEX idx_order_items_product_id
ON order_items(product_id);

CREATE INDEX idx_payments_order_id
ON payments(order_id);


-- VERIFICATION


SELECT
    table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;