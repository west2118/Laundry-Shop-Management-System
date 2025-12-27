import express from "express";
import { getUser, postUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user", verifyToken, postUser);
router.get("/user", verifyToken, getUser);

export default router;
