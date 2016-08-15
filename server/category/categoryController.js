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

	getCategory: function(req, res, next){
		Category.findOne({ _id : req.params.id }).exec(function (err, category){
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(category);
		})
	},

	addOne: function(req, res, next){

	},

	editOne: function(req, res, next){

	},

	deleteOne: function(req, res, next){

	}
}