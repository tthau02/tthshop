import { Router } from "express";
import {
  createCategory,
  getByid,
  getCategory,
  getCategoryName,
  removeCate,
  updateCategory,
} from "../controllers/category";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/categores/:id", getCategory);
router.put("/categores/:id", upload.single("image"), updateCategory);
router.post("/categores", upload.single("image"), createCategory);
router.get("/categores", getCategoryName);
router.delete("/categores/:id", removeCate);
router.get("/categores/:id", getByid);

export default router;
