const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/authController");

user_router.post("/login", userController.verifyLogin);
user_router.get("/logout", userController.logout);

module.exports = authRouter;
