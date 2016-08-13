angular.module('TeamUp.profile',[])

.controller('profileController', function($scope, User, $location, $window, $routeParams){
	
	$scope.user = {}
	$scope.pageId = $routeParams.id;
	$scope.userId = $window.localStorage.userId;

	$scope.showUser = function (){
		User.getUser($routeParams.id)
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
