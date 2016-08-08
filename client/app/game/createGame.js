angular.module('TeamUp.createGame',[])

.controller('createGameController',function($scope, $window, Game){
	$scope.newGame = {};
	$scope.getGameData = function(name, type, description, locationID, country, city, picture, date, players, numOfPlayers){
		$scope.newGame.owner = $window.localStorage.userId;
		$scope.newGame.name = name;
		$scope.newGame.type	= type;
		$scope.newGame.description = description;
		$scope.newGame.locationID = locationID;
		$scope.newGame.country = country;
		$scope.newGame.city = city;
		$scope.newGame.picture	= picture;
		$scope.newGame.date	= date;
		$scope.newGame.numOfPlayers	= numOfPlayers;
		console.log($scope.newGame)
		$scope.crGame($scope.newGame);
	}
	$scope.crGame = function(game){
		console.log(game);
		Game.addOne(game);
	}
});