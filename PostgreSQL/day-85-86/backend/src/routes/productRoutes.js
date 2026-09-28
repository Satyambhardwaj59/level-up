import { Router } from "express";

import {
  listProducts,
  getProductById,
  metadataSearch
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);

router.get("/:id", getProductById);

router.post(
  "/search/metadata",
  metadataSearch
);

export default router;