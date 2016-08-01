var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  rate: {
    type: String
  },
  interests: {
    type: String
  },
  pictuer: {
    type: String
  },
  game:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Game'
  }]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;