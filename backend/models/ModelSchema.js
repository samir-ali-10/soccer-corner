const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ModelSchema = new schema({
  model: String,
});

const Model = mongoose.model("Models", ModelSchema);

module.exports = Model;
