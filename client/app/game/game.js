angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, $routeParams, $location){
	$scope.game={};
	$scope.game.owner ="";
	$scope.game.plyersObjs =[];

	$scope.initlize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;
			//$scope.game.plyersObjs=
			User.getPlayers(game.players)
			.then(function (players) {
				console.log(players);
				$scope.game.plyersObjs=players;
			})
			.catch(function (err) {
				console.log(err);
			})

		})
		.catch(function (err) {
			console.log(err);
		})
	};

	$scope.editGame = function () {
		$location.path('game/'+$routeParams.id+'/edit');
	}
	$scope.initlize();
});