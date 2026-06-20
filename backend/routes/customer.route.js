import express from "express";
import {
  postCustomer,
  getCustomers,
  getAllCustomers,
  getCustomerStats,
  putCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyRole.js";
import validate from "../middleware/validate.middleware.js";
import { createCustomerSchema, updateCustomerSchema, deleteCustomerSchema } from "../validations/customer.validation.js";

const router = express.Router();

router.get("/customer-stats", verifyToken, verifyAdmin, getCustomerStats);
router.post("/customer", verifyToken, verifyAdmin, validate(createCustomerSchema), postCustomer);
router.get("/customer", verifyToken, getCustomers);
router.get("/customers", verifyToken, getAllCustomers);
router.put("/customer/:id", verifyToken, verifyAdmin, validate(updateCustomerSchema), putCustomer);
router.delete("/customer/:id", verifyToken, verifyAdmin, validate(deleteCustomerSchema), deleteCustomer);

export default router;
