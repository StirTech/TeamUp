var mongoose = require('mongoose');
var notificationSchema = new mongoose.Schema({
  from : {
    type:  mongoose.Schema.Types.ObjectId,
    ref : 'User'    
  },
  to :[{
  	playerId:{
      type:  mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    seen : Boolean
  }],
  notificationType : {
    type : String
  },
  game:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Game'
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