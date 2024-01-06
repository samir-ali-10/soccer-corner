const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const LeagueSchema = new Schema({
  leagueName : String,
});

const LeagueNames = mongoose.model("LeagueNames", LeagueSchema );


module.exports = LeagueNames;
