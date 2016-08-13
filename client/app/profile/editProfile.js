angular.module('TeamUp.editProfile',[])

.controller('editProfileController', function($scope, User, $location, $window, $routeParams){

	$scope.user = {}
	$scope.newUser = {}

	if($window.localStorage.userId !== $routeParams.id){
		$location.path('/home')
	}

	$scope.copyData = function () {
		$scope.MissingInfo = [ 
				 ['Username','username',$scope.user.username],
				 ['First Name','firstName',$scope.user.firstName],
				 ['Last Name','lastName',$scope.user.lastName],
				 ['Email','email',$scope.user.email],
				 ['Country','country',$scope.user.country],
				 ['City','city',$scope.user.city.replace('`', '').replace(",","")]
			]
			for (var i = 0; i < $scope.MissingInfo.length; i++) {
				if($scope.MissingInfo[i][2].length !== 0){
					$scope.MissingInfo.splice(i,1)
					i--;
				}
			}
	}

	$scope.intialize = function(){
		User.getUser($routeParams.id)
		.then(function(user){
			if(!user){
				$location.path('/404');
			}
			$scope.user = user;
			$scope.newUser = user
			$scope.copyData();
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
		$scope.user[k] = value;
		$scope.copyData();
		User.editUser($scope.user, $window.localStorage.userId)

	}
});
