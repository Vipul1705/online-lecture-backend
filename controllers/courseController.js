import { Course } from "../models/Course.js";
import { Instructor } from "../models/Instructor.js";
import { Lecture } from "../models/Lecture.js";
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

const getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ course_id: req.params.courseId });
    res.status(200).send(course);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
const addCourse = async (req, res, next) => {
  try {
    const lectures = req.body.lectures;
    console.log("course", req.body);
    if (!lectures || lectures.length === 0) {
      const course = await Course.create({
        course_id: req.body.courseId,
        name: req.body.courseName,
        description: req.body.courseDescription,
        level: req.body.courseLevel,
        image: req.body.courseImage,
      });
      return res.status(201).send("Course added successfully");
    }

    const errorLectures = [];
    const createdCourses = [];

    for (const lecture of lectures) {
      const { instructor } = lecture;
      const instructor_id = instructor.instructor_id;
      const date = lecture.date;

      const existingLecture = await Course.findOne({
        "lectures.instructor.instructor_id": instructor_id,
        "lectures.date": date,
      });

      if (existingLecture) {
        errorLectures.push(lecture);
      } else {
        const createdCourse = await Course.create({
          course_id: req.body.courseId,
          name: req.body.courseName,
          description: req.body.courseDescription,
          level: req.body.courseLevel,
          image: req.body.courseImage,
          lectures: [lecture],
        });
        createdCourses.push(createdCourse);
      }
    }

    if (errorLectures.length > 0) {
      return res.status(409).send({
        error: true,
        message: "Instructor(s) already have lecture(s) on the provided date.",
        errorLectures: errorLectures,
      });
    }

    return res.status(200).send({
      error: false,
      message: "Lectures created successfully.",
      createdCourses: createdCourses,
    });
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findOneAndUpdate(
      { course_id: req.params.courseId },
      req.body
    );
    res.status(200).send(course);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

// const updateCourseLectures = async (req, res, next) => {
//   try {
//     const instructor_id = req.body.instructor_id;
//     const Lecture = await Lecture.findOne({ instructor_id: instructor_id });
//     if()
//     const course = await Course.findOneAndUpdate(
//       { course_id: req.params.courseId },
//       req.body
//     );
//     res.status(200).send(course);
//   } catch (err) {
//     console.log("in catch block", err);
//     next(err);
//     res.status(500).send("INTERNAL SERVER ERROR");
//   }
// };

const assignInstructor = async (req, res, next) => {
  try {
    const instructor = await User.findOne({ role: "instructor" });
    const course = await Course.findOneAndUpdate(
      { course_id: req.params.courseId },
      req.body
    );
    res.status(200).send(course);
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
export default {
  addCourse,
  updateCourse,
  //   updateCourseLectures,
  getAllCourses,
  getSingleCourse,
};
