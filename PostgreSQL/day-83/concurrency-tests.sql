-- Concurrency Tests 

-- Test 1 — Overselling scenario
--First reset inventory:

UPDATE inventory
SET quantity = 5
WHERE product_id = 1;

-- Now open Session A:

BEGIN;

SELECT quantity
FROM inventory
WHERE product_id = 1
FOR UPDATE;

--Result: 5

-- Do not commit.

--Open Session B:
BEGIN;

SELECT quantity
FROM inventory
WHERE product_id = 1
FOR UPDATE;

-- Session B waits.

-- Now Session A:

UPDATE inventory
SET quantity = quantity - 4
WHERE product_id = 1;

COMMIT;

-- Session B now continues.

-- It sees:

-- quantity = 1

-- If B tries to purchase 4:

UPDATE inventory
SET quantity = quantity - 4
WHERE product_id = 1
  AND quantity >= 4;

--Check:

SELECT *
FROM inventory
WHERE product_id = 1;

-- No row should be updated.

-- Test 2 — Atomic inventory decrement
--This is an important production pattern.

BEGIN;

UPDATE inventory
SET
    quantity = quantity - 3,
    updated_at = CURRENT_TIMESTAMP
WHERE product_id = 1
  AND quantity >= 3
RETURNING *;

COMMIT;

-- The important part is:

-- AND quantity >= 3

-- This prevents the quantity from becoming negative.

-- Test 3 — Detect whether checkout succeeded
BEGIN;

WITH updated_inventory AS (
    UPDATE inventory
    SET
        quantity = quantity - 2,
        updated_at = CURRENT_TIMESTAMP
    WHERE product_id = 1
      AND quantity >= 2
    RETURNING product_id, quantity
)
SELECT *
FROM updated_inventory;

COMMIT;

-- If zero rows are returned:
-- Checkout cannot proceed.