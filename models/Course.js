import mongoose from "mongoose";

var CourseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  level: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  lectures: {
    type: [{}],
  },
});

export const Course = mongoose.model("courses", CourseSchema);
