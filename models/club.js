const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is Schema/object template for creating/adding a new club to the MongoDB 
const clubSchema = new Schema({
  clubName: String,
  facultyAdvisor: String,
  clubDescription: String,
  room: String,
  day: String,
  time: String
});

// "mongoose.model" transforms the Club Schema into a club model, 
// adding Create-Read-Update-Destroy mongoose methods to it,
// for interacting with the mongoDB
const Club = mongoose.model("Club", clubSchema);

module.exports = Club;