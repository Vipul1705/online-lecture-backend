const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/login", authController.verifyLogin);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
