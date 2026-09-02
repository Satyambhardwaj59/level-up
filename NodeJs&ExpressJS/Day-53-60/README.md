# 🚀 Task Management API

A **production-ready** REST API for task management built with Node.js, Express, MongoDB, JWT authentication, role-based access control (RBAC), and comprehensive automated testing.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure token-based auth with expiry
- 👥 **Role-Based Access Control** — `user` and `admin` roles
- ✅ **Input Validation** — Zod schemas with descriptive error messages
- 📋 **Full Task CRUD** — Create, Read, Update, Delete with ownership enforcement
- 🔍 **Filtering, Search & Sort** — Status, priority, text search, sort by any field
- 📄 **Pagination** — Page/limit with metadata (`total`, `totalPages`)
- 🛡️ **Security** — Helmet, CORS, rate limiting (stricter on auth routes)
- 📈 **Performance** — MongoDB indexes, `.lean()` on read queries
- 🧪 **Automated Tests** — Jest + Supertest with 35+ test cases
- ⚡ **Graceful Shutdown** — SIGTERM/SIGINT handling
- 🏥 **Health Check** — DB status + uptime endpoint

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | HTTP framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Zod | Input validation |
| Helmet | Security headers |
| CORS | Cross-origin resource sharing |
| express-rate-limit | Rate limiting |
| Morgan | HTTP request logging |
| Jest + Supertest | Automated testing |

---

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB running locally (or a MongoDB Atlas URI)

### Steps

```bash
# 1. Clone and navigate
cd NodeJs&ExpressJS/Day-60

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Start the server
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (`development`/`production`/`test`) | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/task-management` |
| `MONGO_URI_TEST` | Test database URI | `mongodb://localhost:27017/task-management-test` |
| `JWT_SECRET` | JWT signing secret (keep secret!) | — |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | — |

---

## 📂 Project Structure

```
Day-60/
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── server.js          # Entry point, graceful shutdown
│   ├── app.js             # Express app configuration
│   │
│   ├── config/
│   │   └── db.js          # MongoDB connect/disconnect
│   │
│   ├── models/
│   │   ├── User.js        # User schema (bcrypt, comparePassword)
│   │   └── Task.js        # Task schema (indexes, text search)
│   │
│   ├── routes/
│   │   ├── authRoutes.js  # /api/v1/auth/*
│   │   ├── userRoutes.js  # /api/v1/users/* (admin only)
│   │   └── taskRoutes.js  # /api/v1/tasks/*
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   │
│   ├── services/
│   │   ├── authService.js   # Business logic: register, login
│   │   ├── userService.js   # Business logic: list, delete users
│   │   └── taskService.js   # Business logic: CRUD, filter, paginate
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verify → req.user
│   │   ├── authorize.js       # RBAC role check
│   │   ├── validate.js        # Zod validation factory
│   │   ├── rateLimiter.js     # General + auth-specific limiters
│   │   ├── notFound.js        # 404 handler
│   │   ├── errorHandler.js    # Global error handler
│   │   └── logger.js          # Morgan HTTP logger
│   │
│   ├── validators/
│   │   ├── authValidator.js   # register + login Zod schemas
│   │   └── taskValidator.js   # create + update Zod schemas
│   │
│   └── utils/
│       └── ApiError.js        # Custom error class
│
└── tests/
    ├── health.test.js
    ├── auth.test.js
    ├── task.test.js
    └── user.test.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/health` | ❌ | — | Health check |
| `POST` | `/api/v1/auth/register` | ❌ | — | Register new user |
| `POST` | `/api/v1/auth/login` | ❌ | — | Login and get JWT |
| `GET` | `/api/v1/auth/me` | ✅ | User | Get current user |
| `POST` | `/api/v1/tasks` | ✅ | User | Create a task |
| `GET` | `/api/v1/tasks` | ✅ | User | List/filter tasks |
| `GET` | `/api/v1/tasks/:id` | ✅ | Owner | Get single task |
| `PUT` | `/api/v1/tasks/:id` | ✅ | Owner/Admin | Update task |
| `DELETE` | `/api/v1/tasks/:id` | ✅ | Owner/Admin | Delete task |
| `GET` | `/api/v1/users` | ✅ | Admin | List all users |
| `DELETE` | `/api/v1/users/:id` | ✅ | Admin | Delete user + tasks |

---

## 🔐 Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📝 Example Requests & Responses

### Register

**Request:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Satyam",
  "email": "satyam@example.com",
  "password": "Password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "user": {
      "_id": "64b2f...",
      "name": "Satyam",
      "email": "satyam@example.com",
      "role": "user",
      "createdAt": "2024-..."
    },
    "token": "eyJhbGci..."
  }
}
```

### Get Tasks with Filters

**Request:**
```http
GET /api/v1/tasks?status=completed&priority=high&page=1&limit=10&sort=createdAt&order=desc
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64c1a...",
      "title": "Build REST API",
      "description": "Day 60 project",
      "status": "completed",
      "priority": "high",
      "dueDate": null,
      "user": "64b2f...",
      "createdAt": "2024-..."
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" },
    { "field": "password", "message": "Password must contain at least one uppercase letter" }
  ]
}
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Test Coverage

| Suite | Tests |
|-------|-------|
| `health.test.js` | Health check endpoint |
| `auth.test.js` | Register, login, /me — success + error cases |
| `task.test.js` | Full CRUD, ownership, filter, pagination, search |
| `user.test.js` | Admin management, cascade delete, RBAC |

---

## 🔒 Security

| Feature | Implementation |
|---------|---------------|
| HTTP Security Headers | `helmet()` |
| CORS | Whitelist via `ALLOWED_ORIGINS` env var |
| General Rate Limiting | 100 req / 15 min per IP |
| Auth Rate Limiting | 10 req / 15 min per IP (login/register) |
| Input Validation | Zod schemas on all inputs |
| Password Hashing | bcryptjs with 12 salt rounds |
| Password Exposure | `select: false` + `toJSON` transform |
| JWT | Signed with `JWT_SECRET`, configurable expiry |
| Email Enumeration | Generic "Invalid email or password" message |
| Body Size Limit | `10kb` max request body |
| Environment Variables | No secrets in code |
| Sensitive Logging | No passwords/tokens logged |

---

## 📈 Performance

| Optimization | Where |
|-------------|-------|
| Compound index `{ user, status, priority, createdAt }` | Task queries |
| Text index `{ title, description }` | Text search |
| Unique index on `email` | User lookup |
| `.lean()` | All read-only task/user queries |
| Promise.all | Parallel query + count in getTasks |

---

## 🚀 Future Improvements

- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Task categories/tags
- [ ] Task sharing between users
- [ ] File attachments on tasks
- [ ] WebSocket notifications on task updates
- [ ] API versioning strategy (v2)
- [ ] Redis caching for frequently queried tasks
- [ ] Docker + docker-compose setup
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Swagger/OpenAPI documentation
