angular.module('TeamUp.games',[])
.controller('gamesController',function($scope, $location, Game, User, $window,Like,facebook,$routeParams){
	
	$scope.data={};
	$scope.type='';
	$scope.needPlayer=0;
	$scope.loved="red";
	$scope.isLogIn=false;
	$scope.filterDate;

	$scope.initaize = function () {
		if($window.localStorage.userId)
			$scope.isLogIn=true;
		Game.getAll()
		.then(function (games) {
			$scope.data.games = games;
			for (var i = 0; i < games.length; i++) {
				if(games[i].likes.indexOf($window.localStorage.userId)!==-1)
					$scope.data.games[i].loved='red'
				else
					$scope.data.games[i].loved='black'
			}
			$scope.data.types=[];
			$scope.data.types.push('All');
			for (var i = 0; i < games.length; i++) {
				if($scope.data.types.indexOf(games[i].type)===-1)
					$scope.data.types.push(games[i].type);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
	};

	$scope.viewGame = function (gameId) {
		$location.path('/game/'+gameId);
	}

	$scope.showType = function ($event) {
		if($event.target.id==="All")
			$scope.type='';
		else
			$scope.type=$event.target.id;
	}

	$scope.getLove = function (event) {
		for (var i = 0; i < $scope.data.games.length; i++) {
			if($scope.data.games[i]._id===event.target.id){
				if($scope.data.games[i].loved==='black'){
					$scope.data.games[i].loved='red';
					Like.likeGame($scope.data.games[i]._id,$window.localStorage.userId)
					.then(function (res) {
						$scope.initaize();
					})
					.catch (function (err) {
						console.log(err)
					})
				}
				else {
					$scope.data.games[i].loved='black';
					Like.dislike($scope.data.games[i]._id,$window.localStorage.userId)
					.then(function (res) {
						$scope.initaize();
					})
					.catch (function (err) {
						console.log(err)
					})
				}
			}
		}
	}

	$scope.fbshare = function(event){
		for (var i = 0; i < $scope.data.games.length; i++) {
			if($scope.data.games[i]._id===event.target.id){
				facebook.share($routeParams.id, $scope.data.games[i].picture, $scope.data.games[i].name);	
			}
		}
	};

	$scope.today = new Date()
	$scope.tomorrow = new Date()
	$scope.thisWeek = new Date()
	$scope.nextWeek = new Date()

	$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
	$scope.thisWeek.setDate($scope.thisWeek.getDate() + 7);
	$scope.nextWeek.setDate($scope.nextWeek.getDate() + 14);

	$scope.gamesToday = function(game){
		return Date.parse(game.date) <= Date.parse($scope.today)
	}

	$scope.gamesTomorrow = function(game){
		return Date.parse(game.date) > Date.parse($scope.today) && Date.parse(game.date) <= Date.parse($scope.tomorrow)
	}

	$scope.gamesThisWeek = function(game){
		return Date.parse(game.date) > Date.parse($scope.tomorrow) && Date.parse(game.date) <= Date.parse($scope.thisWeek)
	}

	$scope.gamesNextWeek = function(game){
		return Date.parse(game.date) > Date.parse($scope.thisWeek) && Date.parse(game.date) <= Date.parse($scope.nextWeek)
	}

	$scope.moreGames = function(game){
		return Date.parse(game.date) > Date.parse($scope.nextWeek)
	}

	$scope.initaize();
	
	$scope.search = function(str){
		$window.localStorage.query = str;
		$location.path('/find');	
	}	

    $scope.locate = function(){
    	var options = {
        	enableHighAccuracy: true
    	};
        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);               
        }, 
        function(error) {                    
            alert('Unable to get location: ' + error.message);
        }, options);        
    }

    $scope.locate();

    $scope.calculateDistance = function(gameloc){
    	
    	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
		  var R = 6371; // Radius of the earth in km
		  var dLat = deg2rad(lat2-lat1);  // deg2rad below
		  var dLon = deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c; // Distance in km
		  return d;
		}

		function deg2rad(deg) {
		  return deg * (Math.PI/180)
		}

		return getDistanceFromLatLonInKm($scope.position.lat, $scope.position.lng, gameloc.lat, gameloc.lng)
    }

    $scope.distances = {
    	'2' : distance2km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 2
		    },
		'5 km' : distance5km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 5
		    },
		'10 km': distance10km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 10
		    },
		'25 km': distance25km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 25
		    },
		'50 km' : distance50km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 50
		    },
		'100 km' : distance100km = function(game) {
		    	return $scope.calculateDistance(game.locationID) <= 100
		    },
		'any' : anyDistance = function(game){
		    	return true
		    }
    }

    $scope.chooseDistance = function(choice, game){
    	return $scope[choice](game)
    }

});


