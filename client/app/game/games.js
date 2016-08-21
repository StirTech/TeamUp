angular.module('TeamUp.games',[])
.controller('gamesController',function($scope, $location, Game, User, $window,Like,facebook,$routeParams){
	$scope.data={};
	$scope.type='';
	$scope.needPlayer=0;
	$scope.loved="red";
	$scope.isLogIn=false;
	$scope.filterDate;
	$scope.initaize = function () {
		if($window.localStorage.userId)
			$scope.isLogIn=true;
		Game.getAll()
		.then(function (games) {
			$scope.data.games = games;
			for (var i = 0; i < games.length; i++) {
				if(games[i].likes.indexOf($window.localStorage.userId)!==-1)
					$scope.data.games[i].loved='red'
				else
					$scope.data.games[i].loved='black'
			}
			$scope.data.types=[];
			$scope.data.types.push('All');
			for (var i = 0; i < games.length; i++) {
				if($scope.data.types.indexOf(games[i].type)===-1)
					$scope.data.types.push(games[i].type);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
	};
	$scope.viewGame = function (gameId) {
		$location.path('/game/'+gameId);
	}
	$scope.showType = function ($event) {
		if($event.target.id==="All")
			$scope.type='';
		else
			$scope.type=$event.target.id;
	}
	$scope.getLove = function (event) {
		for (var i = 0; i < $scope.data.games.length; i++) {
			if($scope.data.games[i]._id===event.target.id){
				if($scope.data.games[i].loved==='black'){
					$scope.data.games[i].loved='red';
					Like.likeGame($scope.data.games[i]._id,$window.localStorage.userId)
					.then(function (res) {
						console.log('like');
						$scope.initaize();
					})
					.catch (function (err) {
						console.log(err)
					})
				}
				else {
					$scope.data.games[i].loved='black';
					Like.dislike($scope.data.games[i]._id,$window.localStorage.userId)
					.then(function (res) {
						console.log('dislik');
						$scope.initaize();
					})
					.catch (function (err) {
						console.log(err)
					})
				}
			}
		}
	}

	$scope.fbshare = function(event){
		for (var i = 0; i < $scope.data.games.length; i++) {
			if($scope.data.games[i]._id===event.target.id){
				facebook.share($routeParams.id, $scope.data.games[i].picture, $scope.data.games[i].name);	
			}
		}
	};

	$scope.pastGames = function(game){
		return Date.parse(game.date) < Date.now()
	}

	$scope.currentGames = function(game){
		return Date.parse(game.date) > Date.now()
	}

	$scope.initaize();
	
	$scope.search = function(str){
		$window.localStorage.query = str;
		$location.path('/find');	
	}	
});


