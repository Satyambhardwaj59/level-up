# Day 87 — Production HTTP Inspection Server

A production-style Node.js + Express server for understanding the HTTP request/response lifecycle.

---

## Tech Stack

- Node.js
- Express.js
- JavaScript ES Modules
- HTTP
- REST API
- Middleware
- In-memory repository
- Native Fetch API

---

# Project Architecture

```text
Client
  │
  │ HTTP Request
  ▼
server.js
  │
  ▼
app.js
  │
  ├── requestContext
  │
  ├── requestLogger
  │
  ▼
Router
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
Response
  │
  ▼
Client