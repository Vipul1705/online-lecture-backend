var mongoose = require("mongoose");

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

const user_token = mongoose.model("user_tokens", UserTokenSchema);
module.exports = user_token;
