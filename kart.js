const mongoose = require('mongoose')

var kartSchema = new mongoose.Schema({
    username: { type: String },
    itemname: { type: String },
    itemprice: { type: Number },
    itemid: { type: Number },
    quantity: { type: Number }
})

const kart = mongoose.model('kart', kartSchema)
module.exports = kart