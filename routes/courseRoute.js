import express from "express";
import courseController from "../controllers/courseController.js";

const authRouter = express.Router();

authRouter.post("/addCourse", courseController.addCourse);
authRouter.get("/getAllCourses", courseController.getAllCourses);
authRouter.get("/getSingleCourse/:courseId", courseController.getSingleCourse);

export default authRouter;
