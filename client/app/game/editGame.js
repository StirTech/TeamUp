angular.module('TeamUp.editGame',[])

.controller('editGameController',function($scope,$routeParams, Game,$location){
	$scope.game={};
	$scope.initialize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			console.log(game);
			$scope.game=game;
		})
		.catch(function (err) {
			console.log(err);
		})
	};
	$scope.editGame = function () {
		Game.editOne($routeParams.id,$scope.game)
		.then(function (game) {
			$location.path('/game/'+$routeParams.id)
		})
		.catch(function (err) {
			console.log(err)
		})
	}
	$scope.initialize();
});