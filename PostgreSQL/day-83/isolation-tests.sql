-- Isolation Level Tests

--Test 1 — Read Committed
--Session A:

BEGIN ISOLATION LEVEL READ COMMITTED;

SELECT quantity
FROM inventory
WHERE product_id = 1;

-- Session B:

BEGIN;

UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = 1;

COMMIT;

-- Session A:

SELECT quantity
FROM inventory
WHERE product_id = 1;

COMMIT;

--The second SELECT can see the committed change.

-- Test 2 — Repeatable Read
-- Session A:

BEGIN ISOLATION LEVEL REPEATABLE READ;

SELECT quantity
FROM inventory
WHERE product_id = 1;

-- Session B:

BEGIN;

UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = 1;

COMMIT;

-- Session A:

SELECT quantity
FROM inventory
WHERE product_id = 1;

COMMIT;

-- Session A maintains its transaction snapshot.

-- Test 3 — Serializable

-- Session A:

BEGIN ISOLATION LEVEL SERIALIZABLE;

SELECT quantity
FROM inventory
WHERE product_id = 1;

-- perform business logic

SELECT quantity
FROM inventory
WHERE product_id = 1;

COMMIT;