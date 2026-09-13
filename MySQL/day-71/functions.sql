USE ecommerce_day71;

DROP FUNCTION IF EXISTS CalculateDiscount;

DELIMITER $$

CREATE FUNCTION CalculateDiscount(
    amount DECIMAL(12,2)
)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN

    DECLARE discount DECIMAL(12,2);

    IF amount < 5000 THEN

        SET discount = 0;

    ELSEIF amount < 10000 THEN

        SET discount = amount * 0.05;

    ELSE

        SET discount = amount * 0.10;

    END IF;

    RETURN discount;

END $$

DELIMITER ;

SELECT CalculateDiscount(4000);

SELECT CalculateDiscount(7000);

SELECT CalculateDiscount(20000);


-- We'll use 18% GST for this project.

DROP FUNCTION IF EXISTS CalculateTax;

DELIMITER $$

CREATE FUNCTION CalculateTax(
    amount DECIMAL(12,2)
)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN

    RETURN amount * 0.18;

END $$

DELIMITER ;

SELECT CalculateTax(10000);


-- Calculate Final Price
-- Final Price = Price + Tax - Discount

DROP FUNCTION IF EXISTS CalculateFinalPrice;

DELIMITER $$

CREATE FUNCTION CalculateFinalPrice(
    price DECIMAL(12,2)
)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN

    DECLARE tax DECIMAL(12,2);
    DECLARE discount DECIMAL(12,2);

    SET discount = CalculateDiscount(price);

    SET tax = CalculateTax(
        price - discount
    );

    RETURN price - discount + tax;

END $$

DELIMITER ;

SELECT CalculateFinalPrice(20000);



-- Get Customer Tier

--  < ₹10,000       → Bronze , ₹10K – ₹50K     → Silver,  ₹50K – ₹1L   → Gold, > ₹1L   → Platinum

DROP FUNCTION IF EXISTS GetCustomerTier;

DELIMITER $$

CREATE FUNCTION GetCustomerTier(
    spending DECIMAL(14,2)
)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN

    IF spending < 10000 THEN

        RETURN 'Bronze';

    ELSEIF spending <= 50000 THEN

        RETURN 'Silver';

    ELSEIF spending <= 100000 THEN

        RETURN 'Gold';

    ELSE

        RETURN 'Platinum';

    END IF;

END $$

DELIMITER ;


SELECT GetCustomerTier(5000);

SELECT GetCustomerTier(25000);

SELECT GetCustomerTier(75000);

SELECT GetCustomerTier(150000);