var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  userId: {
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

const user = mongoose.model("user_logins", UserSchema);
module.exports = user;
