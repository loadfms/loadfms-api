const mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  name: String,
  state: Number,
  port: Number
});

export default deviceSchema;