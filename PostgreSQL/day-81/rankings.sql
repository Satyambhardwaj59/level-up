
/*

DAY 81 — PRODUCTION E-COMMERCE ANALYTICS ENGINE
PART 1 — RANKINGS


Focus:
- RANK()
- DENSE_RANK()
- ROW_NUMBER()
- PARTITION BY
- ORDER BY
- Ranking within groups
- Top N per group
- Customer leaderboards
- Product leaderboards

Tables:
users
categories
products
orders
order_items


*/


-- 1. Rank customers by total spending.
WITH customer_spending AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,
        COALESCE(
            SUM(o.total_amount),
            0
        ) AS total_spending
    FROM users u
    LEFT JOIN orders o
        ON o.user_id = u.id
        AND o.status = 'completed'
    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,
    total_spending,

    RANK() OVER (
        ORDER BY total_spending DESC
    ) AS spending_rank

FROM customer_spending

ORDER BY spending_rank;

-- 2. Rank customers by number of orders.

WITH customer_orders AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COUNT(o.id) AS total_orders

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,
    total_orders,

    RANK() OVER (
        ORDER BY total_orders DESC
    ) AS order_rank

FROM customer_orders

ORDER BY order_rank;


-- 3. Compare RANK() and DENSE_RANK().

WITH customer_spending AS (
    SELECT
        user_id,
        SUM(total_amount) AS total_spending

    FROM orders

    WHERE status = 'completed'

    GROUP BY user_id
)

SELECT
    user_id,
    total_spending,

    RANK() OVER (
        ORDER BY total_spending DESC
    ) AS rank_position,

    DENSE_RANK() OVER (
        ORDER BY total_spending DESC
    ) AS dense_rank_position

FROM customer_spending

ORDER BY total_spending DESC;


/*

4. ROW_NUMBER

*/


-- 4. Assign a unique position to every customer.

WITH customer_spending AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COALESCE(
            SUM(o.total_amount),
            0
        ) AS total_spending

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id
        AND o.status = 'completed'

    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,
    total_spending,

    ROW_NUMBER() OVER (
        ORDER BY total_spending DESC
    ) AS row_number

FROM customer_spending

ORDER BY row_number;


/*

5. CUSTOMER LEADERBOARD

*/


-- 5. Build a complete customer leaderboard.

WITH customer_stats AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COUNT(o.id) AS total_orders,

        COALESCE(
            SUM(o.total_amount)
            FILTER (
                WHERE o.status = 'completed'
            ),
            0
        ) AS total_spending,

        COALESCE(
            AVG(o.total_amount),
            0
        ) AS average_order_value

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,
    total_orders,
    total_spending,
    ROUND(
        average_order_value,
        2
    ) AS average_order_value,

    RANK() OVER (
        ORDER BY total_spending DESC
    ) AS spending_rank,

    RANK() OVER (
        ORDER BY total_orders DESC
    ) AS order_rank

FROM customer_stats

ORDER BY spending_rank;


/*

6. PRODUCT REVENUE RANK

*/


-- 6. Rank products by revenue.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name
)

SELECT
    product_id,
    product,
    revenue,

    RANK() OVER (
        ORDER BY revenue DESC
    ) AS revenue_rank

FROM product_revenue

ORDER BY revenue_rank;


/*

7. PRODUCT SALES RANK

*/


-- 7. Rank products by units sold.

WITH product_sales AS (
    SELECT
        p.id AS product_id,
        p.name AS product,

        COALESCE(
            SUM(oi.quantity),
            0
        ) AS units_sold

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name
)

SELECT
    product_id,
    product,
    units_sold,

    RANK() OVER (
        ORDER BY units_sold DESC
    ) AS sales_rank

FROM product_sales

ORDER BY sales_rank;


/*

8. PRODUCT RANK WITHIN CATEGORY

*/


-- 8. Rank every product within its category.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,

        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
)

SELECT
    product_id,
    product,
    category_id,
    revenue,

    RANK() OVER (
        PARTITION BY category_id
        ORDER BY revenue DESC
    ) AS category_rank

FROM product_revenue

ORDER BY
    category_id,
    category_rank;


/*

9. PRODUCT DENSE RANK WITHIN CATEGORY

*/


-- 9. Use DENSE_RANK() within every category.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
)

SELECT
    product_id,
    product,
    category_id,
    revenue,

    DENSE_RANK() OVER (
        PARTITION BY category_id
        ORDER BY revenue DESC
    ) AS category_rank

FROM product_revenue

ORDER BY
    category_id,
    category_rank;


/*

10. ROW_NUMBER WITHIN CATEGORY

*/


-- 10. Give every product a unique position
-- inside its category.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
)

SELECT
    product_id,
    product,
    category_id,
    revenue,

    ROW_NUMBER() OVER (
        PARTITION BY category_id
        ORDER BY
            revenue DESC,
            product_id
    ) AS product_position

FROM product_revenue

ORDER BY
    category_id,
    product_position;


/*

11. TOP 3 PRODUCTS PER CATEGORY

*/


-- 11. Return the top 3 products from every category.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
),

ranked_products AS (
    SELECT
        product_id,
        product,
        category_id,
        revenue,

        ROW_NUMBER() OVER (
            PARTITION BY category_id
            ORDER BY revenue DESC
        ) AS rank

    FROM product_revenue
)

SELECT
    rp.category_id,
    c.name AS category,
    rp.product,
    rp.revenue,
    rp.rank

FROM ranked_products rp

JOIN categories c
    ON c.id = rp.category_id

WHERE rp.rank <= 3

ORDER BY
    rp.category_id,
    rp.rank;


/*

12. TOP 5 PRODUCTS PER CATEGORY

*/


-- 12. Return the top 5 products per category.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
),

ranked_products AS (
    SELECT
        *,

        ROW_NUMBER() OVER (
            PARTITION BY category_id
            ORDER BY revenue DESC
        ) AS rank

    FROM product_revenue
)

SELECT
    category_id,
    product,
    revenue,
    rank

FROM ranked_products

WHERE rank <= 5

ORDER BY
    category_id,
    rank;


/*

13. MOST EXPENSIVE PRODUCT PER CATEGORY

*/


-- 13. Find the most expensive product in each category.

WITH ranked_products AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,
        p.price,

        ROW_NUMBER() OVER (
            PARTITION BY p.category_id
            ORDER BY
                p.price DESC,
                p.id
        ) AS rank

    FROM products p
)

SELECT
    rp.product_id,
    rp.product,
    c.name AS category,
    rp.price

FROM ranked_products rp

JOIN categories c
    ON c.id = rp.category_id

WHERE rp.rank = 1

ORDER BY c.name;


/*

14. CHEAPEST PRODUCT PER CATEGORY

*/


-- 14. Find the cheapest product in each category.

WITH ranked_products AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,
        p.price,

        ROW_NUMBER() OVER (
            PARTITION BY p.category_id
            ORDER BY
                p.price ASC,
                p.id
        ) AS rank

    FROM products p
)

SELECT
    rp.product_id,
    rp.product,
    c.name AS category,
    rp.price

FROM ranked_products rp

JOIN categories c
    ON c.id = rp.category_id

WHERE rp.rank = 1

ORDER BY c.name;


/*

15. HIGHEST-VALUE ORDER PER CUSTOMER

*/


-- 15. Find the highest-value order for every customer.

WITH ranked_orders AS (
    SELECT
        o.id AS order_id,
        o.user_id,
        o.total_amount,
        o.created_at,

        ROW_NUMBER() OVER (
            PARTITION BY o.user_id
            ORDER BY
                o.total_amount DESC,
                o.created_at ASC
        ) AS rank

    FROM orders o
)

SELECT
    ro.order_id,
    u.name AS customer,
    ro.total_amount,
    ro.created_at

FROM ranked_orders ro

JOIN users u
    ON u.id = ro.user_id

WHERE ro.rank = 1

ORDER BY ro.total_amount DESC;


/*

16. FIRST ORDER PER CUSTOMER

*/


-- 16. Find the first order of every customer.

WITH ranked_orders AS (
    SELECT
        o.id AS order_id,
        o.user_id,
        o.total_amount,
        o.created_at,

        ROW_NUMBER() OVER (
            PARTITION BY o.user_id
            ORDER BY
                o.created_at ASC,
                o.id ASC
        ) AS rank

    FROM orders o
)

SELECT
    ro.order_id,
    u.name AS customer,
    ro.total_amount,
    ro.created_at AS first_order

FROM ranked_orders ro

JOIN users u
    ON u.id = ro.user_id

WHERE ro.rank = 1

ORDER BY ro.created_at;


/*

17. LATEST ORDER PER CUSTOMER

*/


-- 17. Find the latest order of every customer.

WITH ranked_orders AS (
    SELECT
        o.id AS order_id,
        o.user_id,
        o.total_amount,
        o.created_at,

        ROW_NUMBER() OVER (
            PARTITION BY o.user_id
            ORDER BY
                o.created_at DESC,
                o.id DESC
        ) AS rank

    FROM orders o
)

SELECT
    ro.order_id,
    u.name AS customer,
    ro.total_amount,
    ro.created_at AS latest_order

FROM ranked_orders ro

JOIN users u
    ON u.id = ro.user_id

WHERE ro.rank = 1

ORDER BY ro.created_at DESC;


/*

18. CUSTOMER LEADERBOARD — MULTIPLE WINDOW FUNCTIONS

*/


-- 18. Complete customer leaderboard.

WITH customer_stats AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COUNT(o.id) AS orders,

        COALESCE(
            SUM(o.total_amount)
            FILTER (
                WHERE o.status = 'completed'
            ),
            0
        ) AS total_spending,

        COALESCE(
            AVG(o.total_amount),
            0
        ) AS average_order_value

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
)

SELECT
    RANK() OVER (
        ORDER BY total_spending DESC
    ) AS rank,

    customer,

    orders,

    total_spending,

    ROUND(
        average_order_value,
        2
    ) AS average_order_value,

    DENSE_RANK() OVER (
        ORDER BY orders DESC
    ) AS order_count_rank,

    ROW_NUMBER() OVER (
        ORDER BY
            total_spending DESC,
            customer_id
    ) AS unique_position

FROM customer_stats

ORDER BY rank;


/*

19. REVENUE CONTRIBUTION RANK

*/


-- 19. Calculate each customer's revenue percentage
-- and rank.

WITH customer_revenue AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COALESCE(
            SUM(o.total_amount)
            FILTER (
                WHERE o.status = 'completed'
            ),
            0
        ) AS revenue

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,
    revenue,

    RANK() OVER (
        ORDER BY revenue DESC
    ) AS revenue_rank,

    ROUND(
        (
            revenue
            /
            NULLIF(
                SUM(revenue) OVER (),
                0
            )
        ) * 100,
        2
    ) AS revenue_percentage

FROM customer_revenue

ORDER BY revenue_rank;


/*

20. PRODUCT CONTRIBUTION WITHIN CATEGORY

*/


-- 20. Calculate each product's contribution
-- to its category revenue.

WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
)

SELECT
    product_id,
    product,
    category_id,
    revenue,

    RANK() OVER (
        PARTITION BY category_id
        ORDER BY revenue DESC
    ) AS category_rank,

    ROUND(
        (
            revenue
            /
            NULLIF(
                SUM(revenue) OVER (
                    PARTITION BY category_id
                ),
                0
            )
        ) * 100,
        2
    ) AS category_revenue_percentage

FROM product_revenue

ORDER BY
    category_id,
    category_rank;


/*

21. CUSTOMER SEGMENT RANKING

*/


-- 21. Rank customers inside spending segments.

WITH customer_revenue AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COALESCE(
            SUM(o.total_amount)
            FILTER (
                WHERE o.status = 'completed'
            ),
            0
        ) AS revenue

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
),

segmented_customers AS (
    SELECT
        *,

        CASE
            WHEN revenue >= 50000
                THEN 'VIP'

            WHEN revenue >= 20000
                THEN 'High Value'

            WHEN revenue >= 10000
                THEN 'Medium Value'

            ELSE 'Low Value'
        END AS segment

    FROM customer_revenue
)

SELECT
    customer,
    segment,
    revenue,

    RANK() OVER (
        PARTITION BY segment
        ORDER BY revenue DESC
    ) AS segment_rank

FROM segmented_customers

ORDER BY
    segment,
    segment_rank;


/*

22. CATEGORY LEADERBOARD

*/


-- 22. Rank categories by revenue.

WITH category_revenue AS (
    SELECT
        c.id AS category_id,
        c.name AS category,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM categories c

    LEFT JOIN products p
        ON p.category_id = c.id

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        c.id,
        c.name
)

SELECT
    category_id,
    category,
    revenue,

    RANK() OVER (
        ORDER BY revenue DESC
    ) AS category_rank,

    ROUND(
        (
            revenue
            /
            NULLIF(
                SUM(revenue) OVER (),
                0
            )
        ) * 100,
        2
    ) AS revenue_percentage

FROM category_revenue

ORDER BY category_rank;


/*

23. PRODUCT PRICE RANK WITHIN CATEGORY

*/


-- 23. Rank products according to price within
-- their category.

SELECT
    p.id AS product_id,
    p.name AS product,
    c.name AS category,
    p.price,

    RANK() OVER (
        PARTITION BY p.category_id
        ORDER BY p.price DESC
    ) AS price_rank

FROM products p

JOIN categories c
    ON c.id = p.category_id

ORDER BY
    c.name,
    price_rank;


/*

24. CUSTOMER AVERAGE ORDER VALUE RANK

*/


-- 24. Rank customers by average order value.

WITH customer_aov AS (
    SELECT
        u.id AS customer_id,
        u.name AS customer,

        COALESCE(
            AVG(o.total_amount),
            0
        ) AS average_order_value

    FROM users u

    LEFT JOIN orders o
        ON o.user_id = u.id

    GROUP BY
        u.id,
        u.name
)

SELECT
    customer_id,
    customer,

    ROUND(
        average_order_value,
        2
    ) AS average_order_value,

    RANK() OVER (
        ORDER BY average_order_value DESC
    ) AS aov_rank

FROM customer_aov

ORDER BY aov_rank;


/*

25. FINAL CHALLENGE — TOP 3 PRODUCTS PER CATEGORY


Return:

category
product
revenue
rank

Only:

rank <= 3

Requirements:

- JOIN categories
- JOIN products
- JOIN order_items
- SUM()
- GROUP BY
- ROW_NUMBER() or RANK()
- PARTITION BY
- ORDER BY

*/


WITH product_revenue AS (
    SELECT
        p.id AS product_id,
        p.name AS product,
        p.category_id,

        COALESCE(
            SUM(
                oi.quantity * oi.price
            ),
            0
        ) AS revenue

    FROM products p

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        p.id,
        p.name,
        p.category_id
),

ranked_products AS (
    SELECT
        product_id,
        product,
        category_id,
        revenue,

        ROW_NUMBER() OVER (
            PARTITION BY category_id
            ORDER BY
                revenue DESC,
                product_id
        ) AS rank

    FROM product_revenue
)

SELECT
    c.name AS category,
    rp.product,
    rp.revenue,
    rp.rank

FROM ranked_products rp

JOIN categories c
    ON c.id = rp.category_id

WHERE rp.rank <= 3

ORDER BY
    c.name,
    rp.rank;


/*

END OF PART 1 — RANKINGS


Topics completed:

✓ RANK()
✓ DENSE_RANK()
✓ ROW_NUMBER()
✓ PARTITION BY
✓ Customer ranking
✓ Product ranking
✓ Category ranking
✓ Top N per category
✓ Customer leaderboard
✓ Revenue contribution
✓ Segment ranking
✓ Multiple window functions


*/

