var mongoose = require('mongoose');
var User = new mongoose.model({
  _id: Number,
  name: String,
  createdAt: Date,
})
