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
  getReportStatsData,
  getDailySales,
  getRevenueTrend,
  getMostUsedService,
  requestVoidOrder,
  approveVoidOrder,
  rejectVoidOrder,
  getVoidRequests,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyRole.js";
import validate from "../middleware/validate.middleware.js";
import { 
  createOrderSchema, 
  updateOrderStatusSchema,
  validateOrderIdSchema,
  requestVoidSchema
} from "../validations/order.validation.js";

const router = express.Router();

router.post("/order", verifyToken, validate(createOrderSchema), postOrder);
router.get("/orders", verifyToken, getAllOrders);
router.get("/orders/void-requests", verifyToken, verifyAdmin, getVoidRequests);
router.get("/order-today", verifyToken, getAllOrdersBoard);
router.put("/order/:id", verifyToken, validate(createOrderSchema), putOrder);
router.delete("/order/:id", verifyToken, validate(validateOrderIdSchema), deleteOrder);
router.put("/order-status/:id", verifyToken, validate(updateOrderStatusSchema), updateOrderStatus);
router.put("/order/:id/request-void", verifyToken, validate(requestVoidSchema), requestVoidOrder);
router.put("/order/:id/approve-void", verifyToken, verifyAdmin, validate(validateOrderIdSchema), approveVoidOrder);
router.put("/order/:id/reject-void", verifyToken, verifyAdmin, validate(validateOrderIdSchema), rejectVoidOrder);
router.get("/order-stats-weekly", verifyToken, verifyAdmin, getWeeklyOrderStatus);
router.get("/order-service-weekly", verifyToken, verifyAdmin, getWeeklyServiceTypes);
router.get("/order-recent", verifyToken, verifyAdmin, getRecentOrders);
router.get("/order-stats", verifyToken, verifyAdmin, getOrdersStatsData);

router.get("/order-report-sales", verifyToken, verifyAdmin, getReportStatsData);
router.get("/order-daily-sales", verifyToken, verifyAdmin, getDailySales);
router.get("/order-revenue-trend", verifyToken, verifyAdmin, getRevenueTrend);
router.get("/order-most-services", verifyToken, verifyAdmin, getMostUsedService);

export default router;
