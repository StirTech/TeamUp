var Game = require('./gameModel.js');

module.exports = {
	getAllGames: function (req,res) {
		Game.find().exec(function (err,allGames) {
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(allGames);
		});
	},
	getGame: function(){

	},
	createGame: function(){

	},

	insertPlayer: function(){

	},
	editGame: function(){

	},
	removePlayer: function(){
		
	}
}
