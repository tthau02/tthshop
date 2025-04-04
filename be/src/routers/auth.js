import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  googleLogin,
  signin,
  signup,
  updateUser,
  updateUserRole,
} from "../controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/auth/google", googleLogin);
router.put("/user/:id", updateUser);

router.get("/users", getAllUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
