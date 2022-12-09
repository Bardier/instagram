const { Schema, model } = require("mongoose");

// * схема содержащая информацию о полях User
const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String },
  followers: [{ type: String }],
});

module.exports = model("User", User);
