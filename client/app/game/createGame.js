angular.module('TeamUp.createGame',[])

.controller('createGameController',function($scope, $window, Game){
	$scope.newGame = {};
	$scope.getGameData = function(name, type, description, locationID, country, city, picture, date, players, numOfPlayers){
		$scope.newGame.owner = $window.token.userid;
		$scope.newGame.name = name;
		$scope.newGame.type	= type;
		$scope.newGame.description = description;
		$scope.newGame.locationID = locationID;
		$scope.newGame.country = country;
		$scope.newGame.city = city;
		$scope.newGame.picture	= picture;
		$scope.newGame.date	= date;
		$scope.newGame.players	= players;
		$scope.newGame.numOfPlayers	= numOfPlayers;
		$scope.createGame($scope.newGame);
	}
	$scope.createGame = function(game){
		console.log(game);
		Game.addOne(game);
	}
});