angular.module('TeamUp.profile',[])

.controller('profileController', function($scope, User, Game, $location, $window, $routeParams){
	
	$scope.user = {}
	$scope.games = []
	$scope.currentDate = Date.now()
	$scope.pageId = $routeParams.id;
	$scope.userId = $window.localStorage.userId;
	$scope.MissingInfo = [];
	$scope.showUser = function (){
		User.getUser($routeParams.id)
		.then(function(user){
			if(!user){
				$location.path('/404');
			}
			$scope.user = user;
			//$scope.copyData();
		})
		.then(function(){
			$scope.getGames()
		})
		.catch(function (error) {
			console.error(error)
		})

	}

	$scope.copyData = function () {
		$scope.MissingInfo = [ 
				 ['Username','username',$scope.user.username],
				 ['First Name','firstName',$scope.user.firstName],
				 ['Last Name','lastName',$scope.user.lastName],
				 ['Email','email',$scope.user.email],
				 ['Country','country',$scope.user.country],
				 ['City','city',$scope.user.city]
			]
			for (var i = 0; i < $scope.MissingInfo.length; i++) {
				if($scope.MissingInfo[i][2].length !== 0){
					$scope.MissingInfo.splice(i,1)
					i--;
				}
			}
	}


	$scope.setData = function (k,value) {
		$scope.user[k] = value;
		$scope.copyData();
		User.editUser($scope.user, $window.localStorage.userId)
		.then(function(result){
			$location.path('/profile/'+$window.localStorage.userId)
		})
		.catch(function(error){
			throw error
		})
	}

	$scope.edit = function(){
		$location.path('/profile/'+$window.localStorage.userId+'/edit');
	}

	$scope.getGames = function(){
		for(var i = 0; i < $scope.user.games.length; i++){
			Game.getOne($scope.user.games[i])
			.then(function(game){
				$scope.games.push(game)
			})
		}
	}

	$scope.pastGames = function(game){
		return Date.parse(game.date) < $scope.currentDate
	}

	$scope.currentGames = function(game){
		return Date.parse(game.date) > $scope.currentDate
	}

	$scope.showUser();
	
});
