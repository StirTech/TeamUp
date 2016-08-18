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
	comment :[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
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
		type: Object,
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
	},
	likes :[{
		type: mongoose.Schema.Types.ObjectId,
		ref : 'User'
	}],
	rate :[{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	}] ,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}
});
var Game = mongoose.model('Game',GameSchema);

// Test Game

// var newGame=new Game({
/*	name : "new Game",
	description : "test description",
	type : "sport",
	owner : "57a4d2e78f9d3afc0f576031",
	numOfPlayers : 12,
	locationID : " Syria , Damascus",
	country : "Syria",
	city : "Damascus",
	date : new Date()*/
// });

// newGame.save(function (err , newGame) {
// 	console.log(newGame);
// })
module.exports=Game;