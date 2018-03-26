const mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  name: String,
  state: Number
});

export default deviceSchema;