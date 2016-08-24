var mongoose = require('mongoose');

var rateSchema = new mongoose.Schema({
  from : {
    type :  mongoose.Schema.Types.ObjectId,
    ref : 'User'    
  },
  rate : {
    type : Number,
  },
  game : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Game'
  }
});

var Rate = mongoose.model('Rate', rateSchema);
module.exports=Rate;