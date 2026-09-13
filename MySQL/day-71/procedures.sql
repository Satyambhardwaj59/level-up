-- Procedure 1 — GetCustomerOrders

USE ecommerce_day71;

DROP PROCEDURE IF EXISTS GetCustomerOrders;

DELIMITER $$

CREATE PROCEDURE GetCustomerOrders(
    IN p_user_id BIGINT
)
BEGIN

    SELECT
        o.id AS order_id,
        o.status,
        o.total,
        o.created_at
    FROM orders o
    WHERE o.user_id = p_user_id
    ORDER BY o.created_at DESC;

END $$

DELIMITER ;

CALL GetCustomerOrders(1);


-- Procedure 2 — GetCustomerSpending

DROP PROCEDURE IF EXISTS GetCustomerSpending;

DELIMITER $$

CREATE PROCEDURE GetCustomerSpending(
    IN p_user_id BIGINT
)
BEGIN

    SELECT
        u.id,
        u.name,
        u.email,

        COALESCE(
            SUM(
                CASE
                    WHEN o.status <> 'cancelled'
                    THEN o.total
                    ELSE 0
                END
            ),
            0
        ) AS total_spending

    FROM users u

    LEFT JOIN orders o
        ON u.id = o.user_id

    WHERE u.id = p_user_id

    GROUP BY
        u.id,
        u.name,
        u.email;

END $$

DELIMITER ;

CALL GetCustomerSpending(1);



-- Procedure 3 — GetProductInventory

DROP PROCEDURE IF EXISTS GetProductInventory;

DELIMITER $$

CREATE PROCEDURE GetProductInventory(
    IN p_product_id BIGINT
)
BEGIN

    SELECT
        p.id,
        p.name,
        p.price,
        i.stock,
        i.updated_at

    FROM products p

    JOIN inventory i
        ON p.id = i.product_id

    WHERE p.id = p_product_id;

END $$

DELIMITER ;

CALL GetProductInventory(1);


-- Procedure 4 — CancelOrder

-- This procedure should:

-- Find the order.
-- Prevent cancelling delivered orders.
-- Change status.
-- Restore inventory.
-- Refund payment if necessary.

DROP PROCEDURE IF EXISTS CancelOrder;

DELIMITER $$

CREATE PROCEDURE CancelOrder(
    IN p_order_id BIGINT
)
BEGIN

    DECLARE v_status VARCHAR(30);
    DECLARE v_done INT DEFAULT 0;

    DECLARE v_product_id BIGINT;
    DECLARE v_quantity INT;

    DECLARE item_cursor CURSOR FOR

        SELECT
            product_id,
            quantity
        FROM order_items
        WHERE order_id = p_order_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET v_done = 1;


    START TRANSACTION;


    -- Lock order

    SELECT status
    INTO v_status
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;


    -- Order doesn't exist

    IF v_status IS NULL THEN

        ROLLBACK;

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order not found';

    END IF;


    -- Delivered orders cannot be cancelled

    IF v_status = 'delivered' THEN

        ROLLBACK;

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Delivered order cannot be cancelled';

    END IF;


    -- Already cancelled

    IF v_status = 'cancelled' THEN

        ROLLBACK;

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order already cancelled';

    END IF;


    -- Restore inventory

    OPEN item_cursor;


    restore_loop: LOOP

        FETCH item_cursor
        INTO v_product_id, v_quantity;


        IF v_done = 1 THEN
            LEAVE restore_loop;
        END IF;


        UPDATE inventory

        SET stock = stock + v_quantity

        WHERE product_id = v_product_id;

    END LOOP;


    CLOSE item_cursor;


    -- Cancel order

    UPDATE orders

    SET status = 'cancelled'

    WHERE id = p_order_id;


    -- Refund payment

    UPDATE payments

    SET status = 'refunded'

    WHERE order_id = p_order_id
      AND status = 'success';


    COMMIT;

END $$

DELIMITER ;

CALL CancelOrder(4);

SELECT *
FROM orders
WHERE id = 4;

SELECT *
FROM payments
WHERE order_id = 4;


-- Procedure 5 — CreateOrder

DROP PROCEDURE IF EXISTS CreateOrder;

DELIMITER $$

CREATE PROCEDURE CreateOrder(
    IN p_user_id BIGINT,
    IN p_product_id BIGINT,
    IN p_quantity INT
)
BEGIN

    DECLARE v_product_price DECIMAL(12,2);

    DECLARE v_stock INT;

    DECLARE v_total DECIMAL(12,2);

    DECLARE v_order_id BIGINT;


    -- Error handler

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        ROLLBACK;

        RESIGNAL;

    END;


    START TRANSACTION;


    -- ========================================
    -- Validate quantity
    -- ========================================

    IF p_quantity <= 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quantity must be greater than zero';

    END IF;


    -- ========================================
    -- Validate user
    -- ========================================

    IF NOT EXISTS (
        SELECT 1
        FROM users
        WHERE id = p_user_id
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User does not exist';

    END IF;


    -- ========================================
    -- Get product price
    -- ========================================

    SELECT price
    INTO v_product_price

    FROM products

    WHERE id = p_product_id
    FOR UPDATE;


    IF v_product_price IS NULL THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Product does not exist';

    END IF;


    -- ========================================
    -- Lock inventory
    -- ========================================

    SELECT stock
    INTO v_stock

    FROM inventory

    WHERE product_id = p_product_id
    FOR UPDATE;


    IF v_stock IS NULL THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Inventory record does not exist';

    END IF;


    -- ========================================
    -- Check stock
    -- ========================================

    IF v_stock < p_quantity THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';

    END IF;


    -- ========================================
    -- Decrease inventory
    -- ========================================

    UPDATE inventory

    SET stock = stock - p_quantity

    WHERE product_id = p_product_id;


    -- ========================================
    -- Calculate total
    -- ========================================

    SET v_total =
        v_product_price * p_quantity;


    -- ========================================
    -- Create order
    -- ========================================

    INSERT INTO orders (
        user_id,
        status,
        total
    )

    VALUES (
        p_user_id,
        'confirmed',
        v_total
    );


    SET v_order_id = LAST_INSERT_ID();


    -- ========================================
    -- Create order item
    -- ========================================

    INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
    )

    VALUES (
        v_order_id,
        p_product_id,
        p_quantity,
        v_product_price
    );

    -- Create payment
    INSERT INTO payments (
        order_id,
        amount,
        status
    )

    VALUES (
        v_order_id,
        v_total,
        'success'
    );

    -- COMMIT
    COMMIT;

    -- Return created order

    SELECT
        o.id,
        o.user_id,
        o.status,
        o.total,
        o.created_at

    FROM orders o

    WHERE o.id = v_order_id;

END $$

DELIMITER ;

CALL CreateOrder(1, 1, 2);

SELECT *
FROM inventory
WHERE product_id = 1;