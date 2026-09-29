import express from "express";

import userRoutes from "./routes/userRoutes.js";

import requestContext from "./middleware/requestContext.js";
import requestLogger from "./middleware/requestLogger.js";

import {
  successResponse,
  errorResponse
} from "./utils/response.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(requestContext);

app.use(requestLogger);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "1mb"
  })
);

/*
|--------------------------------------------------------------------------
| Basic Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {
  return successResponse(res, {
    message: "Server is healthy",
    data: {
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development"
    },
    requestId: req.requestId
  });
});

/*
|--------------------------------------------------------------------------
| HTTP Inspection
|--------------------------------------------------------------------------
*/

app.get("/api/inspect", (req, res) => {
  const sensitiveHeaders = [
    "authorization",
    "cookie",
    "set-cookie",
    "proxy-authorization"
  ];

  const safeHeaders = {};

  for (const [key, value] of Object.entries(req.headers)) {
    if (!sensitiveHeaders.includes(key.toLowerCase())) {
      safeHeaders[key] = value;
    }
  }

  return successResponse(res, {
    message: "HTTP request inspection",
    data: {
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      query: req.query,
      protocol: req.protocol,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      httpVersion: req.httpVersion,
      headers: safeHeaders,
      userAgent: req.get("user-agent") || null,
      contentType: req.get("content-type") || null,
      contentLength: req.get("content-length") || null,
      requestId: req.requestId
    },
    requestId: req.requestId
  });
});

/*
|--------------------------------------------------------------------------
| HTTP Method Information
|--------------------------------------------------------------------------
*/

app.get("/api/http-methods", (req, res) => {
  return successResponse(res, {
    message: "Supported HTTP methods",
    data: {
      methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS"
      ]
    },
    requestId: req.requestId
  });
});

/*
|--------------------------------------------------------------------------
| Body Inspection
|--------------------------------------------------------------------------
*/

app.post("/api/inspect/body", (req, res) => {
  const contentType = req.get("content-type") || null;
  const contentLength = req.get("content-length") || null;

  return successResponse(res, {
    message: "Request body inspection",
    data: {
      contentType,
      contentLength,
      body: req.body
    },
    requestId: req.requestId
  });
});

/*
|--------------------------------------------------------------------------
| Intentional Error Endpoint
|--------------------------------------------------------------------------
|
| Used to test 500 responses and error middleware.
|
*/

app.get("/api/error", () => {
  throw new Error("Intentional server error for testing");
});

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

app.use("/api/users", userRoutes);

/*
|--------------------------------------------------------------------------
| 405 Method Not Allowed
|--------------------------------------------------------------------------
*/

app.use("/api/users", (req, res) => {
  return errorResponse(res, {
    statusCode: 405,
    code: "METHOD_NOT_ALLOWED",
    message: `HTTP method ${req.method} is not allowed for ${req.originalUrl}`,
    requestId: req.requestId,
    headers: {
      Allow: "GET, POST, PATCH, DELETE"
    }
  });
});

/*
|--------------------------------------------------------------------------
| 404 Not Found
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  return errorResponse(res, {
    statusCode: 404,
    code: "ROUTE_NOT_FOUND",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    requestId: req.requestId
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  /*
  |--------------------------------------------------------------------------
  | Malformed JSON
  |--------------------------------------------------------------------------
  */

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return errorResponse(res, {
      statusCode: 400,
      code: "INVALID_JSON",
      message: "Request body contains invalid JSON",
      requestId: req.requestId
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Payload Too Large
  |--------------------------------------------------------------------------
  */

  if (err.type === "entity.too.large") {
    return errorResponse(res, {
      statusCode: 413,
      code: "PAYLOAD_TOO_LARGE",
      message: "Request body is too large",
      requestId: req.requestId
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Generic Server Error
  |--------------------------------------------------------------------------
  */

  return errorResponse(res, {
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
    requestId: req.requestId
  });
});

export default app;