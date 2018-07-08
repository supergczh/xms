

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    level: String,
    time:Number,
    title: String,
    onf:Boolean,
    phone: String,
});