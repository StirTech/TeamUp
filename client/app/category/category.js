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

	$scope.byCategoryOrType = function(game){
		if($scope.type.filter){
			return game.type === $scope.type.value
		} else if ($scope.cat.filter){
			return game.category === $scope.cat.value
		}
	}

	$scope.getCat = function(categoryId){
		$scope.type.filter = false
		$scope.cat.value = categoryId
		$scope.cat.filter = true
	}

	$scope.getType = function(type){
		$scope.cat.filter = false
		$scope.type.value = type
		$scope.type.filter = true
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
	