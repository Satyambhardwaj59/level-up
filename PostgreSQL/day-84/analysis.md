
# Day 84 Analysis

## 1. JSONB

JSONB provides flexible document-style storage inside PostgreSQL.

Example:

{
    "brand": "Lenovo",
    "ram": 16,
    "screen": {
        "size": 15.6
    }
}

Important operators:

->

Extract JSON value.

->>

Extract JSON value as text.

@>

Checks JSON containment.

?

Checks whether a key exists.

|| 

Merges JSONB objects.

-

Removes a JSONB key.


---

# 2. Arrays

Products contain:

tags TEXT[]

regions TEXT[]

Important operations:

ANY
ALL
@>
&&
array_append()
array_remove()
unnest()


---

# 3. GIN

GIN indexes are useful for:

- JSONB containment
- Array containment
- Array overlap

Example:

CREATE INDEX idx_products_metadata_gin
ON products
USING GIN(metadata);


---

# 4. EXPLAIN ANALYZE

Use:

EXPLAIN (ANALYZE, BUFFERS)

to investigate:

- execution time
- actual rows
- estimated rows
- scans
- index usage
- buffer activity


---

# 5. Functions

Implemented:

calculate_discount()

calculate_order_total()

get_stock_status()


---

# 6. Triggers

Implemented:

updated_at trigger

product audit trigger


---

# 7. Audit System

Every product:

INSERT
UPDATE
DELETE

creates an audit record.

The audit record stores:

old_data
new_data
operation
timestamp
database user


---

# 8. Questions

## Question 1

Why use JSONB instead of JSON?

Answer:

JSONB stores JSON in a binary representation that supports efficient processing and indexing.


## Question 2

What is a GIN index?

Answer:

GIN is an inverted index structure particularly useful for composite values such as arrays and JSONB.


## Question 3

What does @> mean?

Answer:

It tests containment.


## Question 4

What is the difference between -> and ->>?

Answer:

-> returns JSON/JSONB while ->> returns text.


## Question 5

What does && do for arrays?

Answer:

It checks whether two arrays overlap.


## Question 6

Why use an audit table?

Answer:

To maintain a historical record of changes to important data.


## Question 7

Why use a trigger for updated_at?

Answer:

It guarantees the timestamp is updated automatically whenever a row changes.


## Question 8

What happens if an audit trigger fails?

Answer:

Because the trigger executes as part of the same database operation, the original operation can fail as well.


## Question 9

Why can GIN indexes improve JSONB queries?

Answer:

They index elements inside composite JSONB values, allowing PostgreSQL to locate matching rows without examining every JSON document.


## Question 10

What is the trade-off of GIN indexes?

Answer:

They consume storage and can increase write/update overhead because index entries must also be maintained.