DROP DATABASE IF EXISTS ecommerce_analytics;
CREATE DATABASE ecommerce_analytics;
USE ecommerce_analytics;

-- USERS
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    phone VARCHAR(20),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(255),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    category_id BIGINT UNSIGNED NOT NULL,

    price DECIMAL(12,2) NOT NULL,

    stock INT UNSIGNED NOT NULL DEFAULT 0,

    brand VARCHAR(100),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ORDERS
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'pending',
        'processing',
        'completed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT UNSIGNED NOT NULL,

    product_id BIGINT UNSIGNED NOT NULL,

    quantity INT UNSIGNED NOT NULL,

    price DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_price
        CHECK (price >= 0)
);

-- BASIC INDEXES
CREATE INDEX idx_products_category
ON products(category_id);

CREATE INDEX idx_orders_user
ON orders(user_id);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_orders_date
ON orders(order_date);

CREATE INDEX idx_order_items_order
ON order_items(order_id);

CREATE INDEX idx_order_items_product
ON order_items(product_id);


-- VERIFY
SHOW TABLES;