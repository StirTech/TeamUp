var Game = require('../game/gameModel.js');
var Category = require('./categoryModel.js');

module.exports = {

	getAll: function(req, res, next){
		Category.find().exec(function (err,allCategories) {
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(allCategories);
		});
	},

	getOne: function(req, res, next){

	},

	addOne: function(req, res, next){

	},

	editOne: function(req, res, next){

	},

	deleteOne: function(req, res, next){

	}
}