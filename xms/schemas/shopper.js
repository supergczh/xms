/**
 * Created by Moudi on 2017/3/12.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  number: String ,
  time: String,
  title:String,
  mode: String,
  dh: String,
  name:String,
  phone:String,
  lsh: String,
  ps: String,
  dz: String,
  je: String,
  tz: String,
  hh: String,
  sl: String,
  xj: String,
  sp: String,
  ly: String,
  zt: Number,
  checked:Boolean,
  of: Number,
  onOFF:Boolean,
  dd:Number
  

});