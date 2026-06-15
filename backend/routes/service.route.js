import express from "express";
import {
  postService,
  getServices,
  getAllServices,
  getServiceStats,
  putService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyRole.js";
import validate from "../middleware/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validations/service.validation.js";

const router = express.Router();

router.get("/service-stats", verifyToken, verifyAdmin, getServiceStats);
router.post("/service", verifyToken, verifyAdmin, validate(createServiceSchema), postService);
router.get("/service", verifyToken, getServices);
router.get("/services", verifyToken, getAllServices);
router.put("/service/:id", verifyToken, verifyAdmin, validate(updateServiceSchema), putService);
router.delete("/service/:id", verifyToken, verifyAdmin, deleteService);

export default router;
