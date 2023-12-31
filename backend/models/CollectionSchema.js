const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    collectionNames : Array
})


const CollectionName = mongoose.model("CollectionNames", CollectionSchema );


module.exports = CollectionName;
