angular.module('TeamUp.category',[])

.controller('categoryController', function($scope, Category, Game, $location, $window, $routeParams, $interval){

	$scope.categories = []

	$scope.initialize = function(){
		Category.getAll()
		.then(function(categories){
			$scope.categories = categories
		})
		.catch(function(err){
			console.log(err)
		})
	}

	$scope.initialize()
})
	