const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

// This is Schema/object template for creating/adding a new user to the MongoDB 
const userSchema = new Schema({
  googleId: String,
  username: String,
  profileImage: String,
  isAdmin: { type: Boolean, default: false}
});

// Adds the findOrCreate method to the User Schema
userSchema.plugin(findOrCreate);

// "mongoose.model" transforms the User Schema into a user model, 
// adding Create-Read-Update-Destroy mongoose methods to it,
// for interacting with the mongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;