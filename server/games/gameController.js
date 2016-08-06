var Game = require('./gameModel.js');
var Player = require('../users/userModel.js');

module.exports = {
	getAllGames: function (req,res) {
		Game.find().exec(function (err,allGames) {
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(allGames);
		});
	},
	getGame: function(req, res){
		Game.findOne({_id:req.params.id}).exec(function (err, game){
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(game);
		})

	},
	createGame: function(){

	},

	insertPlayer: function(req , res){
		var gameId=req.params.id;
		var userId=req.body.userId;
		console.log(userId);

		Player.findOneAndUpdate({_id : userId},{ $pull : {games : gameId } } ).exec();
		Player.findOneAndUpdate({_id : userId},{ $push : {games : gameId } } ).exec();


		Game.findOneAndUpdate({ _id : gameId},{$pull: {players : userId}}).exec();
		Game.findOneAndUpdate({ _id : gameId},{$push: {players : userId}},{new : true}).exec(function (err , game) {
			if(err)
				res.status(500).send('err');
			else{
				res.status(201).send(game)
			}
		})

	},
	editGame: function(){

	},

	removePlayer: function(req , res){
		var gameId=req.params.id;
		var userId=req.body.userId;

		Player.findOneAndUpdate({_id : userId},{ $pull : {games : gameId } } ).exec();
		Game.findOneAndUpdate({ _id : gameId},{$pull: {players : userId}}).exec(function (err , data) {
			if(err)
				res.status(204).send(err);
			else
				res.status(200).send(data);
		});

	}
}
