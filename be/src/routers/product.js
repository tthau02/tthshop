import { Router } from "express";
import {
  createProduct,
  getProductByID,
  getProductsPaginate,
  getRelatedProducts,
  removeProduct,
  searchProducts,
  updateProduct,
} from "../controllers/ProductController.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/products", getProductsPaginate);
router.get("/products/search", searchProducts);
router.get("/products/:id", getProductByID);
router.post("/products", upload.array("images"), createProduct);
router.put("/products/:id", upload.array("images"), updateProduct);
router.delete("/products/:id", removeProduct);
router.get("/products/related/:productId", getRelatedProducts);

export default router;
