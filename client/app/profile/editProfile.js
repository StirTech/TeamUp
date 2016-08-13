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
			$scope.MissingInfo = [ 
				 ['Username',$scope.user.username],
				 ['First Name',$scope.user.firstName],
				 ['Last Name',$scope.user.lastName],
				 ['Email',$scope.user.email],
				 ['Country',$scope.user.country],
				 ['City',$scope.user.city.replace('`', '').replace(",","")]
			]
			for (var i = 0; i < $scope.MissingInfo.length; i++) {
				if($scope.MissingInfo[i][1].length !== 0){
					$scope.MissingInfo.splice(i,1)
					i--;
				}
			}
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

	$scope.setData = function (k,value) {
		$scope.user[k.toLowerCase()] = value;
		User.editUser($scope.user, $window.localStorage.userId)
		$window.location.reload();
	}
});
