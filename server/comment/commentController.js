var Game = require('../games/gameModel.js');
var Player = require('../users/userModel.js');
var Comment = require ('./commentModel.js');

module.exports = {
	insertComment : function (req ,res, next) {
		var gameId = req.body.game;
		var comment = req.body.text;
		var from = req.body.from;
		var newComment =new Comment({
			from : from,
			text : comment,
			timeS : req.body.timeS,
			game : gameId
		});
		//create comment
		newComment.save(function (err) {
		  if (err) {
			return err;
		  }else {
		  	console.log("comment saved");
		  }
		});
	},
	getcomment :function (req, res) {
		Comment.find().exec(function (err,allComment) {
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(allComment);
		});
	}
}