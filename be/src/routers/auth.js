import { Router } from "express";
import { googleLogin, signin, signup } from "../controllers/auth";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/auth/google", googleLogin);

export default router;
