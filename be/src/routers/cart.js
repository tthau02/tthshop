import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/cart/remove", removeFromCart);
router.put("/cart/update", updateCartQuantity); // Thêm route cho updateCartQuantity

export default router;
