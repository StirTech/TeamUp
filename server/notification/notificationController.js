var Notification = require('./notificationModel.js');
var Game = require('../games/gameModel.js');

module.exports ={
	 players : [],
	insertNotification : function (req, res) {
		Game.findOne({_id : req.params.id}, function (err, game) {
			if(game){
				players = game.players;
			}else{
				res.status(500).send(err);
			}
		})
		var body = req.body;
		var newNotification = new Notification({
			from : body.from,
			notificationType : body.type,
			game : req.params.id,
			text : body.text
		})

		newNotification.save(function (err, notification) {
			if(notification){
				if(this.players.length > 0){ 
					for (var i = 0; i < this.players.length; i++) {
						notification.to.push({playerId: players[i] , seen: false})
					}
					notification.save(function (err, saved) {
						if(saved){
							console.log("notification saved");
						}else{
							res.status(500).send(err);
						}
					});
				}else{
					res.status(500).send("no players ");
				}
				res.status(200).send(notification);
			}else{
				res.status(500).send(err);
			}
		});
	},


	isRead: function (req, res) {
		Notification.findOne({_id : req.params.id}, function (err, notification) {
			if(Notification){
				notification.read = true;
				notification.save(function (err, readNotification) {
					if(readNotification){
						res.status(200).send(readNotification);
					}else{
						res.status(500).send(err);
					}
				})
			}else{
				res.status.send(500);
			}
		})
	},

	getNotification : function (req, res) {

		Notification.findOne({game : req.params.id}, function (err, notification) {
			if(notification){
				res.status(200).send(notification)
			}else{
				res.status(500).send("err")
			}
		})
	}
};

