require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");

const initializeSocket = require("./sockets/socket");

const startProductStream = require("./services/productStream");
const startOrderStream = require("./services/orderStream");

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message:
      "Day 66 MongoDB Change Streams API",
  });
});

app.use(
  "/api/orders",
  orderRoutes
);

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
};

app.use(errorMiddleware);

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  const io = initializeSocket(server);

  startProductStream();
  startOrderStream();

  server.listen(
    process.env.PORT || 5000,
    () => {
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
      );
    }
  );
};

startServer();