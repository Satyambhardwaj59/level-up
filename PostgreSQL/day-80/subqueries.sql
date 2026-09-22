
/*
===========================================================
DAY 80 — PRODUCTION E-COMMERCE ANALYTICS ENGINE
PART 2 — SUBQUERY CHALLENGES
===========================================================

Tables:
users
addresses
categories
products
product_variants
orders
order_items
payments

Focus:
- Scalar Subqueries
- Multi-row Subqueries
- Correlated Subqueries
- EXISTS
- NOT EXISTS
- IN
- NOT IN
- ANY
- ALL
- Nested Subqueries
- Subqueries with Aggregations
- Production Analytics
===========================================================
*/


/*
===========================================================
1. SCALAR SUBQUERIES
===========================================================
*/


-- 1. Find products whose price is greater than the
-- average product price.

SELECT
    id,
    name,
    price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);


-- 2. Find products whose price is below the average price.

SELECT
    id,
    name,
    price
FROM products
WHERE price < (
    SELECT AVG(price)
    FROM products
);


-- 3. Find the most expensive product.

SELECT
    id,
    name,
    price
FROM products
WHERE price = (
    SELECT MAX(price)
    FROM products
);


-- 4. Find the cheapest product.

SELECT
    id,
    name,
    price
FROM products
WHERE price = (
    SELECT MIN(price)
    FROM products
);


-- 5. Find orders whose total_amount is greater than
-- the average order amount.

SELECT
    id,
    user_id,
    total_amount
FROM orders
WHERE total_amount > (
    SELECT AVG(total_amount)
    FROM orders
);


/*
===========================================================
2. SUBQUERIES WITH IN
===========================================================
*/


-- 6. Find users who have placed at least one order.

SELECT
    id,
    name,
    email
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);


-- 7. Find users who have never placed an order.

SELECT
    id,
    name,
    email
FROM users
WHERE id NOT IN (
    SELECT user_id
    FROM orders
);


-- 8. Find products that have been ordered.

SELECT
    id,
    name
FROM products
WHERE id IN (
    SELECT product_id
    FROM order_items
);


-- 9. Find products that have never been ordered.

SELECT
    id,
    name
FROM products
WHERE id NOT IN (
    SELECT product_id
    FROM order_items
);


-- 10. Find categories that contain products.

SELECT
    id,
    name
FROM categories
WHERE id IN (
    SELECT category_id
    FROM products
);


/*
===========================================================
3. EXISTS SUBQUERIES
===========================================================
*/


-- 11. Find users who have placed at least one order.

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


-- 12. Find users who have never placed an order.

SELECT
    u.id,
    u.name,
    u.email
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


-- 13. Find products that have at least one sale.

SELECT
    p.id,
    p.name
FROM products p
WHERE EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);


-- 14. Find products that have never been sold.

SELECT
    p.id,
    p.name
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);


-- 15. Find categories that contain at least one product.

SELECT
    c.id,
    c.name
FROM categories c
WHERE EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);


/*
===========================================================
4. CORRELATED SUBQUERIES
===========================================================
*/


-- 16. Find products that are more expensive than the
-- average product price.

SELECT
    p.id,
    p.name,
    p.price
FROM products p
WHERE p.price > (
    SELECT AVG(p2.price)
    FROM products p2
);


-- 17. Find customers whose spending is greater than
-- the average spending of all customers.

SELECT
    u.id,
    u.name,
    (
        SELECT COALESCE(SUM(o.total_amount), 0)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_spending
FROM users u
WHERE (
    SELECT COALESCE(SUM(o.total_amount), 0)
    FROM orders o
    WHERE o.user_id = u.id
) > (
    SELECT AVG(customer_total)
    FROM (
        SELECT
            user_id,
            SUM(total_amount) AS customer_total
        FROM orders
        GROUP BY user_id
    ) customer_spending
);


-- 18. Find users who have placed more orders than
-- the average number of orders per customer.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(*)
    FROM orders o
    WHERE o.user_id = u.id
) > (
    SELECT AVG(order_count)
    FROM (
        SELECT
            user_id,
            COUNT(*) AS order_count
        FROM orders
        GROUP BY user_id
    ) customer_orders
);


/*
===========================================================
5. SUBQUERIES WITH AGGREGATION
===========================================================
*/


-- 19. Find customers whose total spending is above
-- ₹10,000.

SELECT
    u.id,
    u.name,
    (
        SELECT COALESCE(SUM(o.total_amount), 0)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_spending
FROM users u
WHERE (
    SELECT COALESCE(SUM(o.total_amount), 0)
    FROM orders o
    WHERE o.user_id = u.id
) > 10000;


-- 20. Find customers with more than 3 orders.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(*)
    FROM orders o
    WHERE o.user_id = u.id
) > 3;


-- 21. Find products whose total sold quantity is
-- greater than the average sold quantity.

SELECT
    p.id,
    p.name
FROM products p
WHERE (
    SELECT COALESCE(SUM(oi.quantity), 0)
    FROM order_items oi
    WHERE oi.product_id = p.id
) > (
    SELECT AVG(product_quantity)
    FROM (
        SELECT
            product_id,
            SUM(quantity) AS product_quantity
        FROM order_items
        GROUP BY product_id
    ) product_sales
);


/*
===========================================================
6. SUBQUERY WITH MAX / MIN
===========================================================
*/


-- 22. Find customers who placed the highest-value order.

SELECT
    u.id,
    u.name,
    o.total_amount
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.total_amount = (
    SELECT MAX(total_amount)
    FROM orders
);


-- 23. Find customers who placed the lowest-value order.

SELECT
    u.id,
    u.name,
    o.total_amount
FROM users u
JOIN orders o
    ON o.user_id = u.id
WHERE o.total_amount = (
    SELECT MIN(total_amount)
    FROM orders
);


-- 24. Find products with the highest price in the catalog.

SELECT
    id,
    name,
    price
FROM products
WHERE price = (
    SELECT MAX(price)
    FROM products
);


/*
===========================================================
7. SUBQUERIES WITH ANY / ALL
===========================================================
*/


-- 25. Find products that cost more than ANY product
-- in category 1.

SELECT
    id,
    name,
    price
FROM products
WHERE price > ANY (
    SELECT price
    FROM products
    WHERE category_id = 1
);


-- 26. Find products that cost more than ALL products
-- in category 1.

SELECT
    id,
    name,
    price
FROM products
WHERE price > ALL (
    SELECT price
    FROM products
    WHERE category_id = 1
);


-- 27. Find products cheaper than ANY product
-- in category 2.

SELECT
    id,
    name,
    price
FROM products
WHERE price < ANY (
    SELECT price
    FROM products
    WHERE category_id = 2
);


/*
===========================================================
8. NESTED SUBQUERIES
===========================================================
*/


-- 28. Find users whose spending is greater than the
-- average spending of customers who have placed orders.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COALESCE(SUM(o.total_amount), 0)
    FROM orders o
    WHERE o.user_id = u.id
) > (
    SELECT AVG(customer_total)
    FROM (
        SELECT
            user_id,
            SUM(total_amount) AS customer_total
        FROM orders
        GROUP BY user_id
    ) customer_stats
);


-- 29. Find products whose price is greater than the
-- average price of products in their category.

SELECT
    p.id,
    p.name,
    p.category_id,
    p.price
FROM products p
WHERE p.price > (
    SELECT AVG(p2.price)
    FROM products p2
    WHERE p2.category_id = p.category_id
);


/*
===========================================================
9. CATEGORY ANALYTICS USING SUBQUERIES
===========================================================
*/


-- 30. Find categories whose average product price is
-- greater than the overall average product price.

SELECT
    c.id,
    c.name
FROM categories c
WHERE (
    SELECT AVG(p.price)
    FROM products p
    WHERE p.category_id = c.id
) > (
    SELECT AVG(price)
    FROM products
);


-- 31. Find categories containing more products than
-- the average category product count.

SELECT
    c.id,
    c.name
FROM categories c
WHERE (
    SELECT COUNT(*)
    FROM products p
    WHERE p.category_id = c.id
) > (
    SELECT AVG(product_count)
    FROM (
        SELECT
            category_id,
            COUNT(*) AS product_count
        FROM products
        GROUP BY category_id
    ) category_stats
);


/*
===========================================================
10. PAYMENT SUBQUERIES
===========================================================
*/


-- 32. Find orders that have a successful payment.

SELECT
    id,
    user_id,
    total_amount
FROM orders
WHERE id IN (
    SELECT order_id
    FROM payments
    WHERE status = 'success'
);


-- 33. Find orders that do not have a successful payment.

SELECT
    id,
    user_id,
    total_amount
FROM orders
WHERE id NOT IN (
    SELECT order_id
    FROM payments
    WHERE status = 'success'
);


-- 34. Find users who have made at least one successful payment.

SELECT
    u.id,
    u.name
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    JOIN payments p
        ON p.order_id = o.id
    WHERE o.user_id = u.id
      AND p.status = 'success'
);


/*
===========================================================
11. ORDER ANALYTICS
===========================================================
*/


-- 35. Find customers whose latest order is greater than
-- ₹5,000.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT o.total_amount
    FROM orders o
    WHERE o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT 1
) > 5000;


-- 36. Find customers whose first order was greater than
-- ₹2,000.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT o.total_amount
    FROM orders o
    WHERE o.user_id = u.id
    ORDER BY o.created_at ASC
    LIMIT 1
) > 2000;


/*
===========================================================
12. PRODUCTION ANALYTICS CHALLENGES
===========================================================
*/


-- 37. Find the top-spending customer.

SELECT
    u.id,
    u.name,
    (
        SELECT COALESCE(SUM(o.total_amount), 0)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_spending
FROM users u
ORDER BY total_spending DESC
LIMIT 1;


-- 38. Find the customer with the most orders.

SELECT
    u.id,
    u.name,
    (
        SELECT COUNT(*)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_orders
FROM users u
ORDER BY total_orders DESC
LIMIT 1;


-- 39. Find the best-selling product by quantity.

SELECT
    p.id,
    p.name,
    (
        SELECT COALESCE(SUM(oi.quantity), 0)
        FROM order_items oi
        WHERE oi.product_id = p.id
    ) AS total_quantity_sold
FROM products p
ORDER BY total_quantity_sold DESC
LIMIT 1;


-- 40. Find the highest-revenue product.

SELECT
    p.id,
    p.name,
    (
        SELECT COALESCE(
            SUM(oi.quantity * oi.price),
            0
        )
        FROM order_items oi
        WHERE oi.product_id = p.id
    ) AS total_revenue
FROM products p
ORDER BY total_revenue DESC
LIMIT 1;


/*
===========================================================
13. CUSTOMER PRODUCT ANALYTICS
===========================================================
*/


-- 41. Find customers who purchased more than 5
-- unique products.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(DISTINCT oi.product_id)
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    WHERE o.user_id = u.id
) > 5;


-- 42. Find customers who purchased products from
-- more than 2 categories.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(DISTINCT p.category_id)
    FROM orders o
    JOIN order_items oi
        ON oi.order_id = o.id
    JOIN products p
        ON p.id = oi.product_id
    WHERE o.user_id = u.id
) > 2;


/*
===========================================================
14. PRODUCT PERFORMANCE
===========================================================
*/


-- 43. Find products whose revenue is greater than the
-- average product revenue.

SELECT
    p.id,
    p.name
FROM products p
WHERE (
    SELECT COALESCE(
        SUM(oi.quantity * oi.price),
        0
    )
    FROM order_items oi
    WHERE oi.product_id = p.id
) > (
    SELECT AVG(product_revenue)
    FROM (
        SELECT
            product_id,
            SUM(quantity * price) AS product_revenue
        FROM order_items
        GROUP BY product_id
    ) revenue_stats
);


/*
===========================================================
15. CUSTOMER RETENTION ANALYTICS
===========================================================
*/


-- 44. Find customers who have placed orders on
-- more than one different date.

SELECT
    u.id,
    u.name
FROM users u
WHERE (
    SELECT COUNT(DISTINCT o.created_at::date)
    FROM orders o
    WHERE o.user_id = u.id
) > 1;


-- 45. Find customers who have placed at least two orders.

SELECT
    u.id,
    u.name
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o1
    WHERE o1.user_id = u.id
      AND EXISTS (
          SELECT 1
          FROM orders o2
          WHERE o2.user_id = u.id
            AND o2.id <> o1.id
      )
);


/*
===========================================================
16. FINAL CHALLENGE
===========================================================

Create a customer analytics report using SUBQUERIES ONLY.

Return:

- user_id
- customer_name
- total_orders
- total_spending
- average_order_value
- unique_products
- categories_purchased
- latest_order_amount
- first_order_amount
- successful_payments

Requirements:

- Include customers with zero orders.
- Use correlated subqueries.
- Use COUNT(DISTINCT).
- Use COALESCE.
- Use nested subqueries where necessary.
- Do not use CTEs.
===========================================================
*/


SELECT
    u.id AS user_id,
    u.name AS customer_name,

    (
        SELECT COUNT(*)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_orders,

    (
        SELECT COALESCE(SUM(o.total_amount), 0)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS total_spending,

    (
        SELECT COALESCE(AVG(o.total_amount), 0)
        FROM orders o
        WHERE o.user_id = u.id
    ) AS average_order_value,

    (
        SELECT COUNT(DISTINCT oi.product_id)
        FROM orders o
        JOIN order_items oi
            ON oi.order_id = o.id
        WHERE o.user_id = u.id
    ) AS unique_products,

    (
        SELECT COUNT(DISTINCT p.category_id)
        FROM orders o
        JOIN order_items oi
            ON oi.order_id = o.id
        JOIN products p
            ON p.id = oi.product_id
        WHERE o.user_id = u.id
    ) AS categories_purchased,

    (
        SELECT o.total_amount
        FROM orders o
        WHERE o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 1
    ) AS latest_order_amount,

    (
        SELECT o.total_amount
        FROM orders o
        WHERE o.user_id = u.id
        ORDER BY o.created_at ASC
        LIMIT 1
    ) AS first_order_amount,

    (
        SELECT COUNT(*)
        FROM payments p
        JOIN orders o
            ON o.id = p.order_id
        WHERE o.user_id = u.id
          AND p.status = 'success'
    ) AS successful_payments

FROM users u
ORDER BY total_spending DESC;


/*
===========================================================
END OF PART 2
===========================================================
*/

