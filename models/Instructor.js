import mongoose from "mongoose";

var InstructorSchema = new mongoose.Schema({
  instructor_id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  courses: {
    type: [{}],
  },
});

export const Instructor = mongoose.model("instructors", InstructorSchema);
