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

	createGame: function(req, res){
		var game = req.body;
		console.log(req.body)
		var newGame = new Game ({
			name: game.name, 
			description : game.description, 
			type: game.type, 
			owner: game.owner, 
			players: game.players, 
			numOfPlayers: game.numOfPlayers, 
			locationID: game.locationID, 
			country: game.country, 
			city: game.city, 
			picture: game.picture, 
			date: game.date,
			category : game.category
		})
		newGame.save(function(err, newGame){
			if(err)
				res.status(500).send(err);
			else
				res.status(201).send(newGame);
		})
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

	editGame: function(req, res){
		var game=req.body;
		Game.findOneAndUpdate({_id:req.params.id},{$set:{
			name: game.name, 
			description : game.description, 
			type: game.type, 
			owner: game.owner, 
			players: game.players, 
			numOfPlayers: game.numOfPlayers, 
			locationID: game.locationID, 
			country: game.country, 
			city: game.city, 
			picture: game.picture, 
			date: game.date,
			category : game.category
			}})
		.exec(function(err, data){
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(data);
		})
	},

	removePlayer: function(req , res){
		var gameId=req.params.id;
		var userId=req.body.userId;
		Player.findOneAndUpdate({_id : userId},{ $pull : {games : gameId } } ).exec()
		Game.findOneAndUpdate({ _id : gameId},{$pull: {players : userId}},{new : true}).exec(function (err , data) {
			if(err)
				res.status(500).send(err);
			else{
				res.status(200).send(data);
			}
		});
	},

	likeGame : function (req, res) {
		var gameId=req.params.id;
		var userId=req.body.userId;

		Game.findOneAndUpdate({ _id : gameId},{$pull: {likes : userId}}).exec();
		Game.findOneAndUpdate({ _id : gameId},{$push: {likes : userId}},{new : true}).exec(function (err , game) {
			if(err){
				res.status(500).send('err');
			}else{
				res.status(201).send(game)
			}
		})
	},
	unlikeGame : function (req, res) {
		var gameId=req.params.id;
		var userId=req.body.userId;
		Game.findOneAndUpdate({ _id : gameId},{$pull: {likes : userId}},{new : true}).exec(function (err , data) {
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(data);
			}
		});
	}

}
