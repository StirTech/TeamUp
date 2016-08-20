angular.module('TeamUp.profile',[])

.controller('profileController', function($scope, User, Game, Category, $location, $window, $routeParams){
	
	$scope.user = {}
	$scope.newUser = {}
	$scope.games = []
	$scope.categories = []
	$scope.lastGame = {}
	$scope.nextGame = {}
	$scope.currentDate = Date.now()
	$scope.pageId = $routeParams.id;
	$scope.userId = $window.localStorage.userId;
	$scope.editing = false
	$scope.MissingInfo = [];

	$scope.showUser = function (){
		User.getUser($routeParams.id)
		.then(function(user){
			if(!user){
				$location.path('/404');
			}
			$scope.user = user;
			$scope.newUser = user
			$scope.copyData();
		})
		.then(function(){
			$scope.getGames()
			$scope.getCategories()
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
		$scope.editing = true
	}

	$scope.save = function(){
		User.editUser($scope.newUser, $window.localStorage.userId)
		.then(function(result){
			$scope.editing = false
		})
		.catch(function(error){
			console.log(error)
		})
	}
	
	$scope.getGames = function(){

		for(var i = 0; i < $scope.user.games.length; i++){
			Game.getOne($scope.user.games[i])
			.then(function(game){
				$scope.games.push(game)

				if($scope.games.length === $scope.user.games.length){
					var minArr = [], maxArr = []
					$scope.games.forEach(function(entry){
						if(Date.parse(entry.date) > $scope.currentDate){
							minArr.push(entry)
						} else if (Date.parse(entry.date) < $scope.currentDate) {
							maxArr.push(entry)
						}
					})
					var minD = minArr[0]
					minArr.forEach(function(entry){
						if(Date.parse(entry.date) < Date.parse(minD.date)){
							minD = entry
						}
					})
					var maxD = maxArr[0]
					maxArr.forEach(function(entry){
						if(Date.parse(entry.date) > Date.parse(maxD.date)){
							maxD = entry
						}
					})
					$scope.lastGame = maxD
					$scope.nextGame = minD
				}
			})
		}
	}

	$scope.pastGames = function(game){
		return Date.parse(game.date) < $scope.currentDate
	}

	$scope.currentGames = function(game){
		return Date.parse(game.date) > $scope.currentDate
	}

	$scope.getCategories = function(){
		Category.getAll()
		.then(function(categories){
			$scope.categories = categories
		})
		.catch(function(err){
			throw err
		})
	}

	$scope.showUser();
	
});
