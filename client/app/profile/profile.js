angular.module('TeamUp.profile',[])

.controller('profileController', function($scope, User, $location, $window, $routeParams){
	
	$scope.showUser = function (){
		User.getUser($window.localStorage.userId)
		.then(function(user){
			if(!user){
				$location.path('/404');
			}
			$scope.user = user;
		})
		.catch(function (error) {
			console.error(error)
		})
	}

	$scope.edit = function(){
		$location.path('/profile/'+$window.localStorage.userId+'/edit');
	}

	$scope.showUser();

});
