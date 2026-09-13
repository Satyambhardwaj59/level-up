-- Customer Summary

USE ecommerce_day71;

DROP VIEW IF EXISTS customer_summary;

CREATE VIEW customer_summary AS SELECT

    u.id AS customer_id,

    u.name AS customer,

    COUNT(
        CASE
            WHEN o.status <> 'cancelled'
            THEN o.id
        END
    ) AS total_orders,

    COALESCE(
        SUM(
            CASE
                WHEN o.status <> 'cancelled'
                THEN o.total
                ELSE 0
            END
        ),
        0
    ) AS total_spending,

    COALESCE(
        AVG(
            CASE
                WHEN o.status <> 'cancelled'
                THEN o.total
            END
        ),
        0
    ) AS average_order_value

FROM users u

LEFT JOIN orders o
    ON u.id = o.user_id

GROUP BY
    u.id,
    u.name;

SELECT * FROM customer_summary;




-- Product Performance

DROP VIEW IF EXISTS product_performance;

CREATE VIEW product_performance AS SELECT

    p.id AS product_id,

    p.name AS product,

    COALESCE(
        SUM(
            CASE
                WHEN o.status <> 'cancelled'
                THEN oi.quantity
                ELSE 0
            END
        ),
        0
    ) AS units_sold,

    COALESCE(
        SUM(
            CASE
                WHEN o.status <> 'cancelled'
                THEN oi.quantity * oi.price
                ELSE 0
            END
        ),
        0
    ) AS revenue,

    COALESCE(
        AVG(oi.price),
        0
    ) AS average_price

FROM products p

LEFT JOIN order_items oi
    ON p.id = oi.product_id

LEFT JOIN orders o
    ON oi.order_id = o.id

GROUP BY
    p.id,
    p.name;

    SELECT *
FROM product_performance
ORDER BY revenue DESC;



-- Category Performance

DROP VIEW IF EXISTS category_performance;

CREATE VIEW category_performance AS

SELECT

    c.id AS category_id,

    c.name AS category,

    COUNT(DISTINCT p.id) AS products,

    COALESCE(
        SUM(
            CASE
                WHEN o.status <> 'cancelled'
                THEN oi.quantity
                ELSE 0
            END
        ),
        0
    ) AS units_sold,

    COALESCE(
        SUM(
            CASE
                WHEN o.status <> 'cancelled'
                THEN oi.quantity * oi.price
                ELSE 0
            END
        ),
        0
    ) AS revenue

FROM categories c

LEFT JOIN products p
    ON c.id = p.category_id

LEFT JOIN order_items oi
    ON p.id = oi.product_id

LEFT JOIN orders o
    ON oi.order_id = o.id

GROUP BY
    c.id,
    c.name;


    SELECT *
FROM category_performance
ORDER BY revenue DESC;


-- Order Summary

DROP VIEW IF EXISTS order_summary;

CREATE VIEW order_summary AS

SELECT

    o.id AS order_id,

    u.name AS customer,

    COUNT(oi.id) AS items,

    o.total,

    o.status,

    o.created_at

FROM orders o

JOIN users u
    ON o.user_id = u.id

LEFT JOIN order_items oi
    ON o.id = oi.order_id

GROUP BY

    o.id,
    u.name,
    o.total,
    o.status,
    o.created_at;


    SELECT *
FROM order_summary
ORDER BY order_id;