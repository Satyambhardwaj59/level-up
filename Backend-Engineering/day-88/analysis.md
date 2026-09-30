# Production HTTP Protocol Lab

## Part A — HTTP/1.1

### /health

Response time:

Socket:

HTTP version:

### /users

Response size:

Response time:

### /slow

Single request:

Concurrent requests:

### /large-response

Response size:

Memory before:

Memory after:

Response time:

---

# Part B — Keep-Alive

| Metric | OFF | ON |
|---|---:|---:|
| Requests | | |
| TCP Connections | | |
| Total Time | | |
| Average Latency | | |

## Explanation

Why did the number of TCP connections change?

-

Why did latency change?

-

Does keep-alive mean requests are concurrent?

-

---

# Part C — HTTP/2

TCP connections:

Number of streams:

Stream IDs:

Total time:

## Observations

-

## HTTP/1.1 vs HTTP/2

-

---

# Part D — Streaming

| File Size | Memory | Time | Throughput |
|---|---:|---:|---:|
| | | | |
| | | | |
| | | | |

## readFile vs createReadStream

-

## Backpressure

-

---

# Part E — Compression

| Encoding | Original | Compressed | Ratio | CPU/Time |
|---|---:|---:|---:|---:|
| None | | | | |
| gzip | | | | |
| Brotli | | | | |

## Observations

-

---

# Final Understanding

## HTTP/1.1

-

## Keep-Alive

-

## HTTP/2 Streams

-

## Streaming

-

## Compression

-

## TCP Connection vs HTTP Request

-