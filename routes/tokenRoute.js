import express from "express";
import tokenController from "../controllers/tokenController.js";

const tokenRouter = express.Router();

tokenRouter.get("/", tokenController.refreshToken);

export default tokenRouter;
