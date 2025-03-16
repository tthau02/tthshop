import { Router } from "express";
import { createCategory, getByid, getCategory, getCategoryName, removeCate, updateCategory } from "../controllers/category";

const router  = Router();

router.get("/categores/:id", getCategory);
router.put("/categores/:id", updateCategory);
router.post("/categores", createCategory);
router.get("/categores", getCategoryName);
router.delete("/categores/:id", removeCate);
router.get("/categores/:id", getByid);
export default router