import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, refresh, logout } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per windowMs
  message: { message: "Too many login attempts, please try again later." },
});

router.post("/register", validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh-token", refresh);
router.post("/logout", logout);

export default router;
