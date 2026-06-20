import express from "express";
import { getUser, getAllUsers, changePassword } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyRole.js";
import validate from "../middleware/validate.middleware.js";
import { changePasswordSchema } from "../validations/user.validation.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.put("/user/change-password", verifyToken, validate(changePasswordSchema), changePassword);

export default router;
