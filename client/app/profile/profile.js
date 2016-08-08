angular.module('TeamUp.profile',[])

.controller('profileController', function($scope, User, $location, $routeParams){
	
	$scope.showUser = function (){
		Users.getUser($routeParams.id)
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
		$location.path('/user/'+$routeParams.id+'/edit');
	}

	$scope.showUser();

});
