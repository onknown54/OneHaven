import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import supabaseAuth from "../middlewares/supabaseAuth.middleware.js";

const router = express.Router();

router.post("/", createUser);
// protected profile route example. Put before ":id" so it doesn't get treated as an id.
router.get("/profile", supabaseAuth, (req, res) =>
  res.json({ profile: req.user })
);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
