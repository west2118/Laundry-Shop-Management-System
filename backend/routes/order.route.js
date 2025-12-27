import express from "express";
import {
  postOrder,
  getAllOrders,
  putOrder,
  deleteOrder,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/order", verifyToken, postOrder);
router.get("/order", verifyToken, getAllOrders);
router.put("/order/:id", verifyToken, putOrder);
router.delete("/order/:id", verifyToken, deleteOrder);
router.put("/order-status/:id", verifyToken, updateOrderStatus);
router.get("/order-stats", verifyToken, getDashboardStats);

export default router;
