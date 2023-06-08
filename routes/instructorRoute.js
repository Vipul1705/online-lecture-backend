import express from "express";
import instructorController from "../controllers/instructorController.js";

const instructorRouter = express.Router();

instructorRouter.get(
  "/getAllInstructors",
  instructorController.getAllInstructors
);
instructorRouter.get(
  "/getSingleInstructorBy/:name",
  instructorController.getSingleInstructorByName
);
instructorRouter.get(
  "/getAllInstructorsName",
  instructorController.getAllInstructorsName
);
export default instructorRouter;
