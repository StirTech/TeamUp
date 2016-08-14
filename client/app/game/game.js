angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, facebook, $routeParams, $location, $window){
	$scope.game={};
	$scope.owner ={};
	$scope.game.plyersObjs =[];
	$scope.numberOfPlayer;
	$scope.joinButton="join";

	$scope.initlize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;	
			User.getUser(game.owner)
			.then(function (user) {
				$scope.owner=user
			})
			.catch(function (err) {
				console.log(err)
			})
			//$scope.game.plyersOb	js=
			if($scope.game.players.indexOf($window.localStorage.userId)!==-1)
				$scope.joinButton="leave";
			User.getPlayers({playerIds :$scope.game.players})
			.then(function (data) {
				$scope.game.plyersObjs=data.data;
				$scope.numberOfPlayer=$scope.game.plyersObjs.length;
				console.log("numberOfPlayer : ",$scope.numberOfPlayer);
			})
			.catch(function (err) {
				console.log(err);
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	};
	
	$scope.initlize();
	$scope.fbshare = function(){
		console.log('so3ad');
		facebook.share($routeParams.id, $scope.game.picture, $scope.game.name);	
	};
	
});