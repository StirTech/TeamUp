var mongoose= require ('mongoose');

var GameSchema= new mongoose.Schema({
	name: {
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true
	}, 
	owner: {
		type: String,
		required: true
	},
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	numOfPlayers: {
		type: Number,
		required: true
	},
	locationID:{
		type: String,
		required: true
	},
	country:{
		type: String,
		required: true
	},
	city:{
		type: String,
		required: true
	},
	picture:{
		type: String
	},
	date:{
		type: Date,
		required: true
	} 
});
var Game = mongoose.model('Game',GameSchema);
module.exports=Game;