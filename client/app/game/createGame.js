angular.module('TeamUp.createGame',[/*'ngMap'*/])

.controller('createGameController',function( $scope, $window, Game, $location, NgMap, Category){
	var newGame = {};
	$scope.categories = [];
	$scope.selectedCategory={};

	// redirct to sinin page if the user didn't login yet
	if($window.localStorage.userId===undefined)
		$location.path('signin');
	
	$scope.getCategories = function () {
		Category.getAll()
		.then(function (categories) {
			console.log(categories);
			$scope.categories=categories;
		})
		.catch(function (err) {
			console.log(err);
		})
	};

	$scope.getCategories();

	$scope.update =function () {
		for (var i = 0; i < $scope.categories.length; i++) {
			if($scope.categories[i].name===$scope.category){
				$scope.selectedCategory=$scope.categories[i];
				$scope.childs=$scope.categories[i].games;
			}
		}
	}




	NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.placeMarker = function(e) {
      var marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
      $scope.map.panTo(e.latLng);
      $scope.locationID={
      	lat:e.latLng.lat(),
      	lng :e.latLng.lng()
      }
      $scope.getLocDetails();
    }
    $scope.getLocDetails = function(){
	    $.ajax({
	        type: 'GET',
	        dataType: "json",
	        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.locationID.lat+","+$scope.locationID.lng+"&sensor=false",
	        data: {},
	        success: function(data) {
	            $.each( data['results'],function(i, val) {
	                $.each( val['address_components'],function(i, val) {
	                    if (val['types'] == "locality,political") {
	                        if (val['long_name']!="") {
	                            $scope.city=val['long_name'];
	                        }
	                        else {
	                            $scope.city="unknown";
	                        }
	                        console.log(i+", " + val['long_name']);
	                        console.log(i+", " + val['types']);
	                    }
	                });
	                $.each( val['address_components'],function(i, val) {
	                    if (val['types'] == "country,political") {
	                        if (val['long_name']!="") {
	                            $scope.country=val['long_name'];
	                        }
	                        else {
	                            $scope.country="unknown";
	                        }
	                        console.log(i+", " + val['long_name']);
	                        console.log(i+", " + val['types']);
	                    }
	                });

	            });
	            console.log('Success');
	        },
	        error: function () { console.log('error'); } 
	    }); 
    }
	$scope.getGameData = function(){
		newGame.owner = $window.localStorage.userId;
		newGame.name = $scope.name;
		newGame.type	= $scope.type;
		newGame.description = $scope.description;
		newGame.locationID =  $scope.locationID;
		newGame.country = $scope.country;
		newGame.city = $scope.city;
		newGame.picture	= $scope.picture || $scope.selectedCategory.picture;
		newGame.date	= $scope.date;
		newGame.numOfPlayers	= $scope.numOfPlayers;
		newGame.category = $scope.selectedCategory._id;
		console.log($scope.selectedCategory._id)
		console.log("new Game : ",newGame)
		$scope.crGame(newGame);
	}
	$scope.crGame = function(game){
		Game.addOne(game)
		.then(function (game) {
			console.log("game after create",game);
			$location.path('game/'+game._id)
		})
		.catch(function (err) {
			console.log(err);
		})
	}
});