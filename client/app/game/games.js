angular.module('TeamUp.games',[])

.controller('gamesController',function($scope, Game, User){
	$scope.data = {
	    model: null,
	    availableOptions: [
	      {id: '1', name: 'Option A'},
	      {id: '2', name: 'Option B'},
	      {id: '3', name: 'Option C'}
	    ]
   	};

	$scope.initaize = function () {
		Game.getAll()
		.then(function (games) {
			$scope.data.games = games;
		})
		.catch(function (err) {
			console.log(err);
		});
	};

	// $scope.getPlayers = function (players) {
	// 	User.getPlayers(players)
	// 	.then(function (players) {
	// 		console.log(players)
	// 		return players;
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err);
	// 	})
	// }

	$scope.initaize();
	
});