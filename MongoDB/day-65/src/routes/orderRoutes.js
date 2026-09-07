const express = require("express");

const {
  createOrder,
} = require("../controllers/orderController");

const {
  getPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/", createOrder);

router.get(
  "/payment/:id",
  getPayment
);

module.exports = router;