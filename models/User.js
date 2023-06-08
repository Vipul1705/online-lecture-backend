import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const User = mongoose.model("user_logins", UserSchema);
