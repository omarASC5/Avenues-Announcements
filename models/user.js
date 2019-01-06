const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  username: String,
  profileImage: String
});

userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

module.exports = User;