-- Deadlock Tests

-- Session A
--Run:
BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- Do NOT commit yet.

SELECT *
FROM inventory
WHERE product_id = 2
FOR UPDATE;

--Session B
-- Run:

BEGIN;

SELECT *
FROM inventory
WHERE product_id = 2
FOR UPDATE;

-- Do NOT commit yet.

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;
