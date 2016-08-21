var user = require('../users/userController.js');
var game = require('../games/gameController.js');
var comment = require ('../comment/commentController.js');
var category = require('../category/categoryController.js');
var rate = require('../rate/rateController.js');
var notification = require('../notification/notificationController.js');
var utils = require('./utils.js')


var helpers = require('./helpers.js');


module.exports = function(app, express) {


	// auth routes
	app.post('/api/users/signup', user.signup);
	app.post('/api/users/signin', user.signin);
	app.post('/api/users/fbSignin', user.fbSignin);
	
	// user routes
	app.get('/api/user/:id', user.getUser);
	app.put('/api/user/:id/edit', user.editUser );
	app.post('/api/game/players', user.getPlayers);
	app.get('/api/users',user.getUsers);
	
	// game routes
	app.post('/api/game', game.createGame);
	app.get('/api/games', game.getAllGames);
	app.get('/api/game/:id', game.getGame);
	app.put('/api/game/removePlayer/:id', game.removePlayer);
	app.put('/api/game/:id/edit', game.editGame);
	app.post('/api/game/:id', game.insertPlayer);
	
	// like route
	app.post('/api/game/:id/like',game.likeGame);
	app.post('/api/game/:id/unlikeGame',game.unlikeGame);
	
	//rate route
	app.post('/api/game/:id/setRate',rate.setRate)
	app.get('/api/game/:id/rates',rate.getRates)

	//Comment Route
	app.post('/api/game/:id/insertcomment',comment.insertComment);
	app.get('/api/game/:id/getComment',comment.getComments)
	
	// Notification Route
	app.post('/api/game/:id/insertNotification', notification.insertNotification);
	app.post('/api/game/:id/isRead', notification.isRead);
	app.get('/api/game/:id/notification', notification.getNotification);

	// category routes
	app.get('/api/categories', category.getAll);
	app.get('/api/category/:id', category.getCategory);
	app.post('/api/category', category.addCategory);
	app.put('/api/category/:id/edit', category.editCategory);
	app.delete('/api/category/:id/delete', category.deleteCategory);

	//upload an image
	app.post('/api/upload', utils.uploadImg);

	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
