angular.module('TeamUp.editGame',[])

.controller('editGameController',function($scope,$routeParams, Game){
	$scope.editGame = {};
	$scope.getNewData = function(name, type, description, locationID, country, city, picture, date, players, numOfPlayers){
		console.log($scope.editGame);
		$scope.editGame.owner = $window.localStorage.token.userid;
		$scope.editGame.name = name;
		$scope.editGame.type = type;
		$scope.editGame.description = description;
		$scope.editGame.locationID = locationID;
		$scope.editGame.country = country;
		$scope.editGame.city = city;
		$scope.editGame.picture	= picture;
		$scope.editGame.date = date;
		$scope.editGame.numOfPlayers = numOfPlayers;
		$scope.updateGame($scope.editGame);
	}
	$scope.getGame = function(gameId){
		console.log(game);
		Game.getOne(gameId);
	}
	$scope.updateGame = function(gameId, game){
		Game.editOne(gameId, game)
	}
	getGame($routeParams.id)
	.then(function(resp){
		console.log(resp)
	})
});