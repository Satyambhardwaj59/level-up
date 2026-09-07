require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Day 65 MongoDB Transactions API",
  });
});

app.use(
  "/api/orders",
  orderRoutes
);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
};

startServer();