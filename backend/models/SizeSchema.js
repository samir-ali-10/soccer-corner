const mongoose = require('mongoose')
const schema = mongoose.Schema;


const SizesSchema = new schema({
    size : String,
})


const Size = mongoose.model('sizes' , SizesSchema);

module.exports = Size;


