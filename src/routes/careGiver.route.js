import express from "express";
import {
  createCareGiver,
  getProfile,
  loginCareGiver,
} from "../controllers/careGiver.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginCareGiver);
router.post("/signup", createCareGiver);
router.get("/me", authenticateToken, getProfile);

export default router;
