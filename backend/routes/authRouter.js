import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);

export default authRouter;
