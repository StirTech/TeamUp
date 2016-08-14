angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, facebook, $routeParams, $location, $window){
	$scope.game={};
	$scope.owner ={};
	$scope.game.plyersObjs =[];
	$scope.numberOfPlayer;
	$scope.joinButton="join";
	$scope.playerId = $window.localStorage.userId;
	console.log($scope.playerId);

	$scope.initlize = function () {
		console.log($scope.game);
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
	
	// $scope.joinGame = function(){
	// 	Game.insertPlayer($scope.game._id,$window.localStorage.userId)
	// 	.then(function (game) {
	// 		$scope.initlize()
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err)
	// 	})
	// };

	// $scope.leaveGame = function(){
	// 	Game.removePlayer($scope.game._id,$window.localStorage.userId)
	// 	.then(function(game) {
	// 		$scope.initlize();
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err)
	// 	})
	// };

	$scope.joinGame =function () {
		if($scope.game.players.indexOf($window.localStorage.userId)===-1){
			console.log("Join");
			$scope.joinButton="Leave"
			Game.insertPlayer($scope.game._id,$window.localStorage.userId)
			.then(function (game) {
				$scope.game=game;
				// console.log(game);
				$scope.initlize()
			})
			.catch(function (err) {
				console.log(err)
			})
		}
		else {
			console.log("Leave");
			$scope.joinButton="Join";
			Game.removePlayer($scope.game._id,$window.localStorage.userId)
			.then(function(game) {
				console.log(game);
				// $scope.game=game;
				$scope.initlize();
			})
			.catch(function (err) {
				console.log(err)
			})


		}
	}
});