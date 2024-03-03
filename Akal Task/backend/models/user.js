const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    contactNumber:Number, 
})

module.exports = new mongoose.model('user',Schema)