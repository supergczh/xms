
const mongoose = require('mongoose');
const usersSchema = require('../schemas/return');

module.exports = mongoose.model('return', usersSchema);