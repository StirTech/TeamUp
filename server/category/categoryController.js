var Game = require('../games/gameModel.js');
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
		Category.findOne({_id: req.params.id}, function(err, category){
	      if(err){
	        res.status(500).send(err);
	      } else if (!category){
	        res.status(500).send(new Error ('Category does not exist'));
	      } else {

	        category.name = req.body.name || category.name;
	        category.games = req.body.games || category.games;
	        category.picture = req.body.picture || category.picture;

	        category.save(function(err, savedCategory){
	          if(err){
	            res.status(500).send(err);
	          } else {
	            res.json(savedCategory);
	          }
	        });
	      }
	    })
	},

	deleteCategory : function(req, res, next){
		Category.remove({ _id: req.body.id }, function(err){
			if(!err){
				console.log("Category removed!")
			} else {
				console.log(err)
			}
		})
	}
}