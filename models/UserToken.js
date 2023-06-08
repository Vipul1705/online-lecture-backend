import mongoose from "mongoose";

var UserTokenSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60 * 1000, //1 days
  },
});

export const UserToken = mongoose.model("user_tokens", UserTokenSchema);
