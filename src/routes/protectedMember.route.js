import express from "express";
import {
  crateProtectedMember,
  deleteProtectedMember,
  getProtectedMembers,
  updateProtectedMember,
} from "../controllers/protectedMember.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getProtectedMembers);
router.post("/", authenticateToken, crateProtectedMember);
router.patch("/:id", authenticateToken, updateProtectedMember);
router.delete("/:id", authenticateToken, deleteProtectedMember);

export default router;
