angular.module('TeamUp.games',[])

.controller('gamesController',function($scope, $location, Game, User){
	$scope.data={};
	$scope.type='';
	$scope.initaize = function () {
		Game.getAll()
		.then(function (games) {
			$scope.data.games = games;
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
	$scope.initaize();
	
});