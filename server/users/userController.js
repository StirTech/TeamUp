var mongoose = require('mongoose');

//creating plants Schema 
var UserSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId
  },
  friendid:{
    type:mongoose.Schema.Types.ObjectId
  }
});
 
// creating plant model
var User = mongoose.model('User', UserSchema);
module.exports = User