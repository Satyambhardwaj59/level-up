USE ecommerce_day71;

DROP TRIGGER IF EXISTS trg_inventory_update;

DELIMITER $$

CREATE TRIGGER trg_inventory_update

AFTER UPDATE ON inventory

FOR EACH ROW

BEGIN

    IF OLD.stock <> NEW.stock THEN

        INSERT INTO inventory_logs (
            product_id,
            old_stock,
            new_stock,
            difference
        )

        VALUES (
            NEW.product_id,
            OLD.stock,
            NEW.stock,
            NEW.stock - OLD.stock
        );

    END IF;

END $$

DELIMITER ;


UPDATE inventory
SET stock = stock - 5
WHERE product_id = 1;


SELECT *
FROM inventory_logs
ORDER BY id DESC;





-- Order Audit Trigger

DROP TRIGGER IF EXISTS trg_order_status_audit;

DELIMITER $$

CREATE TRIGGER trg_order_status_audit

AFTER UPDATE ON orders

FOR EACH ROW

BEGIN

    IF OLD.status <> NEW.status THEN

        INSERT INTO order_audit_logs (
            order_id,
            old_status,
            new_status
        )

        VALUES (
            NEW.id,
            OLD.status,
            NEW.status
        );

    END IF;

END $$

DELIMITER ;

UPDATE orders
SET status = 'shipped'
WHERE id = 1;

UPDATE orders
SET status = 'delivered'
WHERE id = 1;

SELECT *
FROM order_audit_logs
WHERE order_id = 1
ORDER BY changed_at;


-- Product Price Validation
DROP TRIGGER IF EXISTS trg_product_price_insert;

DELIMITER $$

CREATE TRIGGER trg_product_price_insert

BEFORE INSERT ON products

FOR EACH ROW

BEGIN

    IF NEW.price < 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Product price cannot be negative';

    END IF;


    IF NEW.discount_price IS NOT NULL
       AND NEW.discount_price < 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Discount price cannot be negative';

    END IF;


    IF NEW.discount_price IS NOT NULL
       AND NEW.discount_price > NEW.price THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'Discount price cannot be greater than product price';

    END IF;

END $$

DELIMITER ;

DROP TRIGGER IF EXISTS trg_product_price_update;

DELIMITER $$

CREATE TRIGGER trg_product_price_update

BEFORE UPDATE ON products

FOR EACH ROW

BEGIN

    IF NEW.price < 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Product price cannot be negative';

    END IF;


    IF NEW.discount_price IS NOT NULL
       AND NEW.discount_price < 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Discount price cannot be negative';

    END IF;


    IF NEW.discount_price IS NOT NULL
       AND NEW.discount_price > NEW.price THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'Discount price cannot be greater than product price';

    END IF;

END $$

DELIMITER ;