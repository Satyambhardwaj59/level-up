
-- DAY 84
-- PRODUCTION PRODUCT METADATA & AUDIT ENGINE
-- PostgreSQL


DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;



-- USERS


CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);



-- CATEGORIES


CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);



-- PRODUCTS


CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(200) NOT NULL,

    price NUMERIC(12,2) NOT NULL
        CHECK (price >= 0),

    tags TEXT[] NOT NULL DEFAULT '{}',

    regions TEXT[] NOT NULL DEFAULT '{}',

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);



-- ORDERS


CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'pending',

    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0
        CHECK (total_amount >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
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



-- AUDIT LOGS


CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,

    table_name VARCHAR(100) NOT NULL,

    record_id BIGINT,

    operation VARCHAR(20) NOT NULL,

    old_data JSONB,

    new_data JSONB,

    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    changed_by TEXT DEFAULT CURRENT_USER
);



-- BASIC INDEXES


CREATE INDEX idx_orders_user_id
ON orders(user_id);

CREATE INDEX idx_order_items_order_id
ON order_items(order_id);

CREATE INDEX idx_order_items_product_id
ON order_items(product_id);