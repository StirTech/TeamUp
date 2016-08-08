angular.module('TeamUp.editProfile',[])

.controller('editProfileController', function($scope, User, $location, $routeParams){

	$scope.user = {}
	$scope.newUser = {}

	$scope.intialize = function(){
		Users.getUser($routeParams.id)
		.then(function(user){
			if(!user){
				$location.path('/404');
			}
			$scope.user = user;
			$scope.newUser = user
		})
		.catch(function (error) {
			console.error(error)
		})
	}

	$scope.save = function(){
		Users.editUser($scope.newUser, $routeParams.id)
		.then(function(result){
			$location.path('/user/'+$routeParams.id)
		})
		.catch(function(error){
			console.log(error)
		})
	}

	$scope.intialize()

});