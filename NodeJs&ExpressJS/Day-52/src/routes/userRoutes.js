import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";


const router = express.Router();


// GET /api/users
router.get(
  "/",
  getAllUsers
);


// GET /api/users/:id
router.get(
  "/:id",
  getUserById
);


// POST /api/users
router.post(
  "/",
  createUser
);


// PUT /api/users/:id
router.put(
  "/:id",
  updateUser
);


// DELETE /api/users/:id
router.delete(
  "/:id",
  deleteUser
);


export default router;