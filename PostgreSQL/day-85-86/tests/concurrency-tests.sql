BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

SELECT pg_sleep(10);

UPDATE inventory
SET quantity = quantity - 4
WHERE product_id = 1
  AND quantity >= 4;

COMMIT;


-- session b while session a is running

BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

UPDATE inventory
SET quantity = quantity - 4
WHERE product_id = 1
  AND quantity >= 4;

COMMIT;