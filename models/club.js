const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  clubName: String,
  facultyAdvisor: String,
  clubDescription: String,
  room: String,
  day: String,
  time: String
});

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;