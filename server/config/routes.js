var user = require('../users/userController.js');
var game = require('../games/gameController.js');

var helpers = require('./helpers.js');

module.exports = function(app, express) {

	// app.post('api/users/signup', user.signup);
	// app.post('api/users/singin', user.signin);
	
	/*app.get('api/user/:id', user.getUser);
	app.post('api/users', user.getPlayers);
	app.put('api/user/:id', user.editUser );

	app.get('api/game/:id', game.getGame);
	app.post('api/game', game.createGame);
	app.post('api/game', game.insertPlayer);
	app.put('api/game/:id', game.editGame);
	app.delete('api/game/:id', game.removePlayer);*/
	
	app.get('/api/games', game.getAllGames);


	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
