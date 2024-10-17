import { Router } from "express";
import {
  register,
  login,
  logout,
  activeUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activeUsers", activeUsers);

export default router;
