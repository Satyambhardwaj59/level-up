-- Locking Tests

-- Test 1 — FOR UPDATE
BEGIN;

SELECT
    product_id,
    quantity
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- Keep this transaction open.
-- Open another PostgreSQL session and run:

-- SELECT *
-- FROM inventory
-- WHERE product_id = 1
-- FOR UPDATE;

-- The second session will wait.

ROLLBACK;



-- Test 2 — FOR SHARE

BEGIN;

SELECT *
FROM products
WHERE id = 1
FOR SHARE;

ROLLBACK;

-- Test 3 — NOWAIT
BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- Keep transaction open.
--In another session:

BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE NOWAIT;

ROLLBACK;

-- Expected behavior:
--ERROR: could not obtain lock on row in relation "inventory"

-- Test 4 — SKIP LOCKED

-- Session A:

BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- Keep transaction open.

Session B:

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE SKIP LOCKED;

/*
The locked row is skipped.

This pattern is useful for:

Job queues
Background workers
Task processing
Order processing
Inventory workers