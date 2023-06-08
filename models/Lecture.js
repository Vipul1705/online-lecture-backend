import mongoose from "mongoose";

var LectureSchema = new mongoose.Schema({
  lecture_id: {
    type: String,
    unique: true,
  },
  lecture_name: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  instructor_id: {
    type: String,
  },
});

export const Lecture = mongoose.model("lectures", LectureSchema);
