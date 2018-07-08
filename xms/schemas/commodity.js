
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  Name: String,
  number: String ,
  time: String,
  article:Number,
  onOFF:Boolean,
  Stock: Number,
  Price: Number,
  page: Number,
  checked:Boolean,
  vue1:String,
  vue2:String,
});