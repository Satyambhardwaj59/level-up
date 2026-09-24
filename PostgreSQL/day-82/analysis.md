# Day 82 — Performance Analysis

## Dataset

Target dataset:

| Table | Rows |
|---|---:|
| users | 100,000 |
| categories | 10 |
| products | 100,000 |
| orders | 1,000,000 |
| order_items | 2,000,000 |
| payments | 1,000,000 |

If the full dataset could not be generated because of hardware limitations, record the actual numbers below.

---

## Before vs After

| Challenge | Before Plan | After Plan | Before Time | After Time |
|---|---|---|---:|---:|
| Email lookup | | | | |
| Customer history | | | | |
| Category + price | | | | |
| Pending orders | | | | |
| LOWER(email) | | | | |
| Top products | | | | |
| User + status | | | | |
| Orders + items | | | | |
| User + orders + items | | | | |

---

# Challenge 1 — Email

Query:

```sql
SELECT *
FROM users
WHERE email = 'user50000@example.com';