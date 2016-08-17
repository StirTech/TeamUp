var Game = require('../games/gameModel.js');
var Player = require('../users/userModel.js');
var Rate = require('./rateModel.js');


module.exports = {
	
	setRate : function (req, res) {
			var gameID = req.params.id;
			var userId = req.body.id;
			var rate = req.body.rate;

			var newRate = new Rate({
				from : userId,
				rate : rate,
				game : gameID
			});

			newRate.save(function (err, rate) {
				if(rate){
					res.status(201).send(rate);
				}else{
					res.status(500).send(err)
				}
			});
		},

	getRates : function (req, res) {
			Rate.find().exec(function (err, arrOfRate) {
				if(arrOfRate){
					res.json(arrOfRate);
				}else{
					res.status(500).send('ssssssssssssss');
				}
			})
		}
}