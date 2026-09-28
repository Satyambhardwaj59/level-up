import { Router } from "express";

import {
  listUsers,
  getUserById,
  createUser
} from "../controllers/userController.js";

import {
  validateUser
} from "../middleware/validation.js";

const router = Router();

router.get("/", listUsers);

router.get("/:id", getUserById);

router.post(
  "/",
  validateUser,
  createUser
);

export default router;