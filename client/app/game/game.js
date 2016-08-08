angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, $routeParams){
	$scope.game={};
	$scope.game.owner ="";
	$scope.game.plyersObjs =[];
	var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(31.971715, 35.8355179),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
	$scope.initlize();
});