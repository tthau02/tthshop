import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/cart/remove", removeFromCart);

export default router;
