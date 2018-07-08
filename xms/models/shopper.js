
const mongoose = require('mongoose');
const usersSchema = require('../schemas/shopper');

module.exports = mongoose.model('Shopper', usersSchema);