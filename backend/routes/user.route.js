import express from "express";
import { getUser, getAllUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

export default router;
