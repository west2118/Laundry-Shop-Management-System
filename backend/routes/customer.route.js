import express from "express";
import {
  postCustomer,
  getAllCustomers,
  putCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/customer", verifyToken, postCustomer);
router.get("/customer", verifyToken, getAllCustomers);
router.put("/customer/:id", verifyToken, putCustomer);
router.delete("/customer/:id", verifyToken, deleteCustomer);

export default router;
