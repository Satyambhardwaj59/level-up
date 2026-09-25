-- Monitoring Queries

-- Active queries
SELECT
    pid,
    usename,
    state,
    wait_event_type,
    wait_event,
    query_start,
    query
FROM pg_stat_activity
WHERE datname = current_database()
ORDER BY query_start;

--Current locks
SELECT
    pid,
    locktype,
    mode,
    granted,
    relation::regclass AS relation
FROM pg_locks
WHERE relation IS NOT NULL
ORDER BY relation::regclass::text;

-- Waiting transactions
SELECT
    pid,
    usename,
    state,
    wait_event_type,
    wait_event,
    query
FROM pg_stat_activity
WHERE wait_event IS NOT NULL;

-- Blocking relationships
SELECT
    blocked.pid AS blocked_pid,
    blocked.query AS blocked_query,
    blocking.pid AS blocking_pid,
    blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking
    ON blocking.pid = ANY(
        pg_blocking_pids(blocked.pid)
    );

-- This is one of the most useful queries in the project.

-- Long-running transactions
SELECT
    pid,
    usename,
    state,
    xact_start,
    now() - xact_start AS transaction_duration,
    query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;

--Kill a problematic session
-- First identify the PID:

SELECT
    pid,
    usename,
    state,
    query
FROM pg_stat_activity
WHERE datname = current_database();

-- Then:

SELECT pg_terminate_backend(<PID>);

-- Example:

SELECT pg_terminate_backend(12345);

-- Use this carefully because it terminates the session.