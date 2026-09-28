import { Router } from "express";

import {
  dashboard,
  topProducts
} from "../controllers/analyticsController.js";

const router = Router();

router.get(
  "/dashboard",
  dashboard
);

router.get(
  "/top-products",
  topProducts
);

export default router;