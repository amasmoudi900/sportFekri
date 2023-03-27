// import mongoose module
const mongoose = require("mongoose");
// create player schema
const playerSchema = mongoose.Schema({
  nbr: Number,
  age: Number,
  name: String,
  position: String,
});
// create player model
const player = mongoose.model("Player", playerSchema);
// make player exportable
module.exports = player;
