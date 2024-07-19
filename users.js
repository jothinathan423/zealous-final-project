const mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    fullname: { type: String },
    phone: { type: Number },
    address: { type: String }
})

const users = mongoose.model('users', usersSchema)
module.exports = users