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
	$scope.joinGame =function () {
		if($scope.game.players.indexOf($window.localStorage.userId)===-1){
			$scope.joinButton="Leave"
			Game.insertPlayer($scope.game._id,$window.localStorage.userId)
			.then(function (game) {
				$scope.game=game;
				$scope.initlize()
			})
			.catch(function (err) {
				console.log(err)
			})
		}
		else {
			$scope.joinButton="Join"

			for (var i = 0; i < $scope.game.players.length; i++) {
				if($scope.game.players[i]===$window.localStorage.userId){
					$scope.game.players.splice(i,1);
				}
			}

			User.getPlayers({playerIds :$scope.game.players})
			.then(function (data) {
				$scope.game.plyersObjs=data.data;
				$scope.numberOfPlayer=$scope.game.plyersObjs.length;
				console.log("numberOfPlayer : ",$scope.numberOfPlayer);
				//Game.removePlayers($scope.game._id,$window.localStorage.userId);
			})
			.catch(function (err) {
				console.log(err);
			})
		}
	}
});