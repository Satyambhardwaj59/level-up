import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import { query } from "./config/database.js";

import {
  errorHandler
} from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;


app.use(express.json());


// -- health check

app.get("/api/health", async (req, res) => {
  const result = await query(
    "SELECT NOW() AS server_time"
  );

  res.json({
    success: true,
    message:
      "E-Commerce API is running",
    database: "connected",
    serverTime:
      result.rows[0].server_time
  });
});


app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});