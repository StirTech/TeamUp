var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  from : {
    type:  mongoose.Schema.Types.ObjectId,
    ref : 'User'    
  },
  text : {
    type: String,
  },
  timeS : {
  	type: Date,
  	default: Date.now
  },
  game:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Game'
  }
});


var Comment = mongoose.model('Comment', CommentSchema);
module.exports=Comment;