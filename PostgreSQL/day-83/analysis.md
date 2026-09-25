# Day 83 — Production E-Commerce Concurrency Engine

## Objective

The goal of this project is to understand how PostgreSQL handles:

- Transactions
- Row-level locks
- Concurrent checkout
- Inventory protection
- Race conditions
- Deadlocks
- Isolation levels
- Blocking transactions
- Transaction monitoring

---

# 1. Checkout Flow

The checkout transaction follows:

BEGIN
↓
Lock inventory
↓
Check stock
↓
Create order
↓
Create order item
↓
Decrease inventory
↓
Create payment
↓
COMMIT

If anything fails:

ROLLBACK

---

# 2. Why Lock Inventory?

Without locking, two customers can read:

quantity = 1

at approximately the same time.

Both transactions may believe that the product is available.

This can produce overselling.

---

# 3. SELECT FOR UPDATE

The checkout transaction uses:

SELECT ...
FROM inventory
WHERE product_id = ?
FOR UPDATE;

This obtains a row-level lock.

Another transaction attempting to modify or lock the same row must wait.

---

# 4. Atomic Inventory Update

Another important pattern is:

UPDATE inventory
SET quantity = quantity - ?
WHERE product_id = ?
AND quantity >= ?;

The condition prevents the inventory from becoming negative.

---

# 5. Deadlocks

A deadlock can occur when:

Transaction A locks Product 1
Transaction B locks Product 2

A waits for Product 2
B waits for Product 1

PostgreSQL detects the circular dependency and aborts one transaction.

---

# 6. Deadlock Prevention

Always acquire multiple locks in a consistent order.

For example:

Product 1
Product 2
Product 3

All transactions should follow the same ordering.

---

# 7. Isolation Levels

Tested:

- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

READ COMMITTED allows a transaction to see newly committed changes between statements.

REPEATABLE READ maintains a consistent transaction snapshot.

SERIALIZABLE provides the strongest isolation and may require application-level retries.

---

# 8. Monitoring

Important PostgreSQL monitoring tools:

pg_stat_activity
pg_locks
pg_blocking_pids()

These can help identify:

- blocked sessions
- blocking sessions
- long-running transactions
- lock waits
- active queries

---

# 9. Questions

## Question 1

Why should inventory be locked before checking stock?

Answer:

Because checking stock and modifying stock must behave as one protected operation.

---

## Question 2

What does FOR UPDATE do?

Answer:

It locks selected rows so concurrent transactions cannot freely modify or acquire conflicting locks on those rows.

---

## Question 3

What causes overselling?

Answer:

A race condition where multiple transactions read the same available stock before any transaction updates it.

---

## Question 4

What is a deadlock?

Answer:

A situation where two or more transactions wait for locks held by each other.

---

## Question 5

How can deadlocks be reduced?

Answer:

Acquire locks in a consistent order and keep transactions short.

---

## Question 6

What is SERIALIZABLE?

Answer:

An isolation level that makes concurrent transactions behave as if they executed serially, while potentially aborting transactions that cannot be safely serialized.

---

## Question 7

Why should checkout transactions be short?

Answer:

Long transactions hold locks for longer periods and increase contention and deadlock probability.

---

## Question 8

Why use an atomic UPDATE?

Answer:

It allows the stock condition and stock decrement to happen as one database operation.

---

# Final Lessons

The database is not simply storing data.

It is also responsible for maintaining correctness when many users perform operations simultaneously.

Production checkout systems need:

- transactions
- locks
- atomic updates
- correct isolation
- deadlock handling
- retry logic
- monitoring
- short transactions