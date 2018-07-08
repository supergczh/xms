
const mongoose = require('mongoose');
const usersSchema = require('../schemas/commodity');

module.exports = mongoose.model('Commodity', usersSchema);