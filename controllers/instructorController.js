import { Instructor } from "../models/Instructor.js";

const getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await Instructor.find({});
    res.status(200).send(instructors);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

const getSingleInstructorByName = async (req, res, next) => {
  try {
    const instructor = await Instructor.findOne({ name: req.params.name });

    res.status(200).send(instructor);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
const getAllInstructorsName = async (req, res, next) => {
  try {
    const instructors = await Instructor.find(
      {},
      { name: 1, instructor_id: 1, _id: 0 }
    );
    res.status(200).send(instructors);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
export default {
  getAllInstructorsName,
  getAllInstructors,
  getSingleInstructorByName,
};
