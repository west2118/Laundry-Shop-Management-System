import express from "express";
import {
  postOrder,
  getAllOrders,
  getAllOrdersBoard,
  putOrder,
  deleteOrder,
  updateOrderStatus,
  getWeeklyOrderStatus,
  getWeeklyServiceTypes,
  getRecentOrders,
  getOrdersStatsData,
  getMonthlySales,
  getDailySales,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/order", verifyToken, postOrder);
router.get("/orders", verifyToken, getAllOrders);
router.get("/order-today", verifyToken, getAllOrdersBoard);
router.put("/order/:id", verifyToken, putOrder);
router.delete("/order/:id", verifyToken, deleteOrder);
router.put("/order-status/:id", verifyToken, updateOrderStatus);
router.get("/order-stats-weekly", verifyToken, getWeeklyOrderStatus);
router.get("/order-service-weekly", verifyToken, getWeeklyServiceTypes);
router.get("/order-recent", verifyToken, getRecentOrders);
router.get("/order-stats", verifyToken, getOrdersStatsData);
router.get("/order-yearly-sales", verifyToken, getMonthlySales);
router.get("/order-daily-sales", verifyToken, getDailySales);

export default router;
