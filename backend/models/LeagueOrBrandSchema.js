const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeagueOrBrandSchema = new Schema({
  leagueOrBrand: String,
});

const LeagueOrBrand = mongoose.model("LeagueNamesOrBrandNames", LeagueOrBrandSchema);

module.exports = LeagueOrBrand;
