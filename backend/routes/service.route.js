import express from "express";
import {
  postService,
  getServices,
  getAllServices,
  putService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/service", verifyToken, postService);
router.get("/service", verifyToken, getServices);
router.get("/services", verifyToken, getAllServices);
router.put("/service/:id", verifyToken, putService);
router.delete("/service/:id", verifyToken, deleteService);

export default router;
