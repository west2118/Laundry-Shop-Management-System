import express from "express";
import {
  postOrder,
  getAllOrders,
  getAllOrdersBoard,
  putOrder,
  deleteOrder,
  updateOrderStatus,
  getWeeklyOrderStatus,
  getWeeklyRevenue,
  getWeeklyServiceTypes,
  getRecentOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/order", verifyToken, postOrder);
router.get("/order", verifyToken, getAllOrders);
router.get("/order-today", verifyToken, getAllOrdersBoard);
router.put("/order/:id", verifyToken, putOrder);
router.delete("/order/:id", verifyToken, deleteOrder);
router.put("/order-status/:id", verifyToken, updateOrderStatus);
router.get("/order-stats-weekly", verifyToken, getWeeklyOrderStatus);
router.get("/order-revenue-weekly", verifyToken, getWeeklyRevenue);
router.get("/order-service-weekly", verifyToken, getWeeklyServiceTypes);
router.get("/order-recent", verifyToken, getRecentOrders);

export default router;
