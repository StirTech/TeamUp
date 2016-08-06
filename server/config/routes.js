var user = require('../users/userController.js');
var game = require('../games/gameController.js');

var helpers = require('./helpers.js');

module.exports = function(app, express) {



	app.post('/api/users/signup', user.signup);
	app.post('/api/users/signin', user.signin);
	
	app.get('/api/user/:id', user.getUser);
	app.put('/api/user/:id/edit', user.editUser );
	app.post('/api/game/players', user.getPlayers);
	
	/*
	app.post('api/game', game.createGame);
	app.put('api/game/:id', game.editGame);
	app.get('/api/game/:id', game.getGame);
	app.post('/api/game', game.createGame);
	app.put('/api/game/:id', game.editGame);
	*/
	
	//app.post('/api/game', game.createGame);
	app.get('/api/games', game.getAllGames);
	app.get('/api/game/:id', game.getGame);
	app.put('/api/game/:id', game.editGame);
	app.post('/api/game/:id', game.insertPlayer);
	app.delete('/api/game/:id', game.removePlayer);


	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
