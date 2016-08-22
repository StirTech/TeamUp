angular.module('TeamUp.editGame',[])

.controller('editGameController',function($scope,$routeParams, Game,$location,Category){
	$scope.game={};
	$scope.categories = [];
	$scope.selectedCategory={};

	$scope.initialize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;
			Category.getAll()
			.then(function (categories) {
				$scope.categories=categories;
				for (var i = 0; i < $scope.categories.length; i++) {
					if(game.category===$scope.categories[i]._id){
						$scope.selectedCategory=$scope.categories[i];
						$scope.childs=$scope.categories[i].games;
					}
				}
			})
			.catch(function (err) {
				console.log(err);
			})
			
		})
		.catch(function (err) {
			console.log(err);
		})
	};

	$scope.update =function () {
		for (var i = 0; i < $scope.categories.length; i++) {
			if($scope.categories[i].name===$scope.category){
				$scope.selectedCategory=$scope.categories[i];
				$scope.childs=$scope.categories[i].games;
			}
		}
	}

	$scope.editGame = function () {
		Game.editOne($routeParams.id,$scope.game)
		.then(function (game) {
			$location.path('/game/'+$routeParams.id)
		})
		.catch(function (err) {
			console.log(err)
		})
	}
	$scope.initialize();
});