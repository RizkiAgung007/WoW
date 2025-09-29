import express from "express";
import auth from "../middleware/auth.js";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

// PUBLIC
router.post("/public", createOrder);

// ADMIN
router.get("/", auth, getAllOrders);
router.put("/:order_id/status", auth, updateOrderStatus);

export default router;