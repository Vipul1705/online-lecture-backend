const express = require("express");
const tokenRouter = express.Router();
const tokenController = require("../controllers/tokenController");

tokenRouter.get("/", tokenController.refreshToken);

module.exports = tokenRouter;
