import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrderStatus);

router.get("/orders/user", getUserOrders);
router.put("/orders/:orderId/cancel", cancelOrder);

export default router;
