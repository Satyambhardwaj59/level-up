-- Active: 1789834622940@@127.0.0.1@5432@ecommerce
-- =========================================================
-- DAY 82
-- PRODUCTION E-COMMERCE PERFORMANCE LAB
-- PostgreSQL
-- =========================================================

-- Create separately:
-- CREATE DATABASE ecommerce;

-- Connect:
-- \c ecommerce


-- =========================================================
-- CLEANUP
-- =========================================================

DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    phone VARCHAR(20),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- CATEGORIES
-- =========================================================

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT
);


-- =========================================================
-- PRODUCTS
-- =========================================================

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,

    category_id BIGINT NOT NULL,

    name VARCHAR(200) NOT NULL,

    sku VARCHAR(100) NOT NULL UNIQUE,

    price NUMERIC(12, 2) NOT NULL
        CHECK (price >= 0),

    stock INTEGER NOT NULL DEFAULT 0
        CHECK (stock >= 0),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);


-- =========================================================
-- ORDERS
-- =========================================================

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    status VARCHAR(30) NOT NULL,

    total_amount NUMERIC(12, 2) NOT NULL
        CHECK (total_amount >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);


-- =========================================================
-- ORDER ITEMS
-- =========================================================

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL
        CHECK (quantity > 0),

    price NUMERIC(12, 2) NOT NULL
        CHECK (price >= 0),

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);


-- =========================================================
-- PAYMENTS
-- =========================================================

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL,

    payment_method VARCHAR(30) NOT NULL,

    payment_status VARCHAR(30) NOT NULL,

    transaction_id VARCHAR(150),

    amount NUMERIC(12, 2) NOT NULL
        CHECK (amount >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);


-- =========================================================
-- BASIC INDEXES REQUIRED FOR INTEGRITY / FK OPERATIONS
-- =========================================================

CREATE INDEX idx_products_category_id
ON products(category_id);

CREATE INDEX idx_order_items_order_id
ON order_items(order_id);

CREATE INDEX idx_order_items_product_id
ON order_items(product_id);


-- =========================================================
-- VERIFY
-- =========================================================

SELECT
    table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;