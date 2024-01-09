const mongoose = require('mongoose')
const schema = mongoose.Schema;


const typesSchema = new schema({
    type : String,
})



const type = mongoose.model("types", typesSchema);


module.exports = type;