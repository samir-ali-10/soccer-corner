const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeagueOrBrandSchema = new Schema({
  leagueOrBrand: String,
});

const LeagueOrBrand = mongoose.model("leagueorbrand", LeagueOrBrandSchema);

module.exports = LeagueOrBrand;
