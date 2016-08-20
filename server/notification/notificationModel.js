var mongoose = require('mongoose');
var notificationSchema = new mongoose.Schema({
  from : {
    type:  mongoose.Schema.Types.ObjectId,
    ref : 'User'    
  },
  to :{
  	 type:  mongoose.Schema.Types.ObjectId,
    ref : 'User' 
  },
  game:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Game'
  },
  read : {
  	type : Boolean 
  },
  text :{
  	type : String
  },
  date :{
  	type: Date,
  	default: Date.now
  }
});


var Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;