angular.module('TeamUp.createGame',[])

.controller('createGameController',function($scope, $window, Game, $location){
	var newGame = {};
	$scope.getGameData = function(){
		newGame.owner = $window.localStorage.userId;
		newGame.name = $scope.name;
		newGame.type	= $scope.type;
		newGame.description = $scope.description;
		newGame.locationID = $scope.locationID;
		newGame.country = $scope.country;
		newGame.city = $scope.city;
		newGame.picture	= $scope.picture;
		newGame.date	= $scope.date;
		newGame.numOfPlayers	= $scope.numOfPlayers;
		$scope.crGame(newGame);
	}
	$scope.crGame = function(game){
		Game.addOne(game)
		.then(function (game) {
			console.log(game);
			$location.path('game/'+game._id)
		})
		.catch(function (err) {
			console.log(err);
		})


	}
});