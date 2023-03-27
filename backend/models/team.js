const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  teamName: String,
  teamOwner: String,
  teamStadium: String,
  teamFoundation: Number,
});

const team = mongoose.model("Team", teamSchema);

module.exports = team;
