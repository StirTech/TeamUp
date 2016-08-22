angular.module('TeamUp.category',[])

.controller('categoryController', function($scope, Category, Game, $location, $window, $routeParams, $interval){

	$scope.categories = []
	$scope.games = []
	$scope.type = {value: '', filter: false}
	$scope.cat = {value: '', filter: false}

	$scope.initialize = function(){
		Category.getAll()
		.then(function(categories){
			$scope.categories = categories
		})
		.then(function(){
			$scope.getGames()
		})
		.catch(function(err){
			console.log(err)
		})
	}


	$scope.getGames = function(){
		Game.getAll()
		.then(function(games){
			$scope.games = games
		})
		.catch(function(err){
			throw err
		})
	}

	$scope.initialize()
})
	