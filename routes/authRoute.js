import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", authController.verifyLogin);
authRouter.get("/logout", authController.logout);

export default authRouter;
