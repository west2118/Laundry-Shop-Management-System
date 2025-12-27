import express from "express";
import {
  postService,
  getAllServices,
  putService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/service", verifyToken, postService);
router.get("/service", verifyToken, getAllServices);
router.put("/service/:id", verifyToken, putService);
router.delete("/service/:id", verifyToken, deleteService);

export default router;
