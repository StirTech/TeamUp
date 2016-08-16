angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, facebook, $routeParams, $location, $window){
	$scope.game={};
	$scope.owner ={};
	$scope.game.plyersObjs =[];
	$scope.numberOfPlayer;
	$scope.joinButton="join";
	$scope.closed =false;
	$scope.joinButtonIf=true;
	$scope.show = false;
	$scope.toggle = function() {
        $scope.show = !$scope.show;
    };

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
			if($scope.game.players.indexOf($window.localStorage.userId)!==-1){
				$scope.joinButton="leave";
				if($scope.game.numOfPlayers===$scope.game.players.length){
					$scope.closed=true;
				}
			}
			else{
				if($scope.game.numOfPlayers===$scope.game.players.length){
					$scope.closed=true;
					$scope.joinButtonIf=false;
				}
			}
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
	

	$scope.fbshare = function(){
		console.log('so3ad');
		facebook.share($routeParams.id, $scope.game.picture, $scope.game.name);	
	};

	$scope.joinGame =function () {
		if($window.localStorage.userId===undefined){
			console.log('signin')
			$location.path('/signin');
			return;
		}
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
			$scope.closed=false;
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
	
	$scope.initlize();
});