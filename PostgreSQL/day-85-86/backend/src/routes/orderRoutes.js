import { Router } from "express";

import {
  createOrder,
  getOrderById
} from "../controllers/orderController.js";

import {
  validateCheckout
} from "../middleware/validation.js";

const router = Router();

router.post(
  "/checkout",
  validateCheckout,
  createOrder
);

router.get(
  "/:id",
  getOrderById
);

export default router;