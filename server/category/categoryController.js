var Game = require('../game/gameModel.js');
var Category = require('./categoryModel.js');

module.exports = {

	getAll : function(req, res, next){
		Category.find().exec(function (err,allCategories) {
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(allCategories);
		});
	},

	getCategory : function(req, res, next){
		Category.findOne({ _id : req.params.id }).exec(function (err, category){
			if(err)
				res.status(500).send('err');
			else
				res.status(200).send(category);
		})
	},

	addCategory : function(req, res, next){
		var category = req.body

		var newCategory = new Category({
			name : category.name,
			games : category.games,
			picture : category.picture
		})

		newCategory.save(function(err, newCategory){
			if(err)
				res.status(500).send(err);
			else
				res.status(201).send(newCategory);
		})
	},

	editCategory : function(req, res, next){

	},

	deleteCategory : function(req, res, next){

	}
}