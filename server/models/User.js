const { Schema, model } = require("mongoose");

// * схема содержащая информацию о полях User
const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String },
  // todo доделать привязку постов и фоловеров к юзеру
  // followers: [{ type: ObjectId, ref: "User" }],
  // posts: [{ type: ObjectId, ref: "Post" }],
  // likedPosts: [{ type: ObjectId, ref: "Post" }],
});

module.exports = model("User", User);
