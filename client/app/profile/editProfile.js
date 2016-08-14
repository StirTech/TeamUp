angular.module('TeamUp.editProfile',[])

.controller('editProfileController', function($scope, User, $location, $window, $routeParams){

	$scope.user = {}
	$scope.newUser = {}

	if($window.localStorage.userId !== $routeParams.id){
		$location.path('/home')
	}

	

	$scope.intialize = function(){
		User.getUser($routeParams.id)
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
		User.editUser($scope.newUser, $window.localStorage.userId)
		.then(function(result){
			$location.path('/profile/'+$window.localStorage.userId)
		})
		.catch(function(error){
			console.log(error)
		})
	}

	$scope.intialize()

});
