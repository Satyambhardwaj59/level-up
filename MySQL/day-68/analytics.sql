USE ecommerce_analytics;

-- ============================================
-- PART 5
-- JOIN PERFORMANCE
-- ============================================

-- Before adding email index

EXPLAIN
SELECT *
FROM users u
JOIN orders o
    ON u.id = o.user_id
WHERE u.email = 'user@example.com';


-- ============================================
-- INDEX CHALLENGE
-- ============================================

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_orders_user_id
ON orders(user_id);


-- Run EXPLAIN again

EXPLAIN
SELECT *
FROM users u
JOIN orders o
    ON u.id = o.user_id
WHERE u.email = 'user@example.com';


-- ============================================
-- EXPLAIN ANALYZE
-- MySQL 8+
-- ============================================

EXPLAIN ANALYZE
SELECT
    u.id,
    u.name,
    u.email,
    o.id AS order_id,
    o.status,
    o.order_date
FROM users u
JOIN orders o
    ON u.id = o.user_id
WHERE u.email = 'rahul@example.com';


-- ============================================
-- CHECK INDEXES
-- ============================================

SHOW INDEX FROM users;

SHOW INDEX FROM orders;


-- ============================================
-- TEST CUSTOMER LOOKUP
-- ============================================

SELECT
    u.id,
    u.name,
    u.email,
    o.id AS order_id,
    o.status
FROM users u
JOIN orders o
    ON u.id = o.user_id
WHERE u.email = 'rahul@example.com';


-- ============================================
-- SENIOR-LEVEL ANALYTICS
-- TOP 20 CUSTOMERS BY LIFETIME SPENDING
-- ============================================

SELECT
    u.id,
    u.name,
    SUM(oi.quantity * oi.price) AS lifetime_spending
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY lifetime_spending DESC
LIMIT 20;


-- ============================================
-- EXPLAIN SENIOR QUERY
-- ============================================

EXPLAIN
SELECT
    u.id,
    u.name,
    SUM(oi.quantity * oi.price) AS lifetime_spending
FROM users u
JOIN orders o
    ON u.id = o.user_id
JOIN order_items oi
    ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY lifetime_spending DESC
LIMIT 20;


-- ============================================
-- REPORTING TABLE
-- PRECOMPUTED CUSTOMER TOTALS
-- ============================================

DROP TABLE IF EXISTS customer_lifetime_report;

CREATE TABLE customer_lifetime_report (
    customer_id BIGINT UNSIGNED PRIMARY KEY,

    customer_name VARCHAR(100) NOT NULL,

    total_orders BIGINT NOT NULL,

    total_items BIGINT NOT NULL,

    lifetime_spending DECIMAL(15,2) NOT NULL,

    average_order_value DECIMAL(15,2),

    last_order_date DATETIME,

    calculated_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_report_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id)
);


-- ============================================
-- BUILD REPORT
-- ============================================

INSERT INTO customer_lifetime_report (
    customer_id,
    customer_name,
    total_orders,
    total_items,
    lifetime_spending,
    average_order_value,
    last_order_date
)
SELECT
    u.id,
    u.name,

    COUNT(DISTINCT o.id),

    COALESCE(
        SUM(oi.quantity),
        0
    ),

    COALESCE(
        SUM(oi.quantity * oi.price),
        0
    ),

    ROUND(
        COALESCE(
            SUM(oi.quantity * oi.price),
            0
        )
        /
        NULLIF(COUNT(DISTINCT o.id), 0),
        2
    ),

    MAX(o.order_date)

FROM users u

LEFT JOIN orders o
    ON u.id = o.user_id
   AND o.status = 'completed'

LEFT JOIN order_items oi
    ON o.id = oi.order_id

GROUP BY
    u.id,
    u.name;


-- ============================================
-- DASHBOARD QUERY
-- ============================================

SELECT
    customer_id,
    customer_name,
    lifetime_spending
FROM customer_lifetime_report
ORDER BY lifetime_spending DESC
LIMIT 20;