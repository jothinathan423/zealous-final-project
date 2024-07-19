const mongoose = require('mongoose')

var collectionSchema = new mongoose.Schema({
    itemname: { type: String },
    itemprice: { type: Number },
    itemid: { type: Number }
})

const collection = mongoose.model('collection', collectionSchema)
module.exports = collection