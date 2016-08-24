var mongoose = require ('mongoose');

var CategorySchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	}, 
	games : [{
		type : String,
		required : true
	}], 
	picture : {
		type : String,
		required : true
	}
})

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;