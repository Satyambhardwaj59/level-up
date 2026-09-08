const express = require("express");

const {
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);

router.patch(
  "/:id/status",
  updateOrderStatus
);

module.exports = router;