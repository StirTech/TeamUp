angular.module('TeamUp.createGame',[])

.controller('createGameController',['$scope', '$window', 'Game', '$location', 'NgMap', 'Category', 'Upload',function( $scope, $window, Game, $location, NgMap, Category, Upload){
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

    $scope.submit = function(){ //function to call on upload 
        if ($scope.file) { //check if file is loaded
            $scope.upload($scope.file); //call upload function
        }
    }
    $scope.upload = function (file) {//upload an image to the game
        Upload.upload({
            url: '/api/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
        	console.log(resp.data.file.path)
            if(resp.data.error_code === 0){ //validate success
                $scope.picture='http://localhost:3000/uploads/'+resp.data.file.filename;
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };


	NgMap.getMap().then(function(map) {//creat a map  
      $scope.map = map;
    });

	
    $scope.placeMarker = function(e) {// place a red marker on the map and get the game location from the marker position
    	if ($window.marker) {
    		$window.marker.setMap(null);
    	}
      $window.marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
      $scope.map.panTo(e.latLng);
      $scope.locationID={
      	lat:e.latLng.lat(),
      	lng :e.latLng.lng()
      }
      $scope.getLocDetails();
    }
    $scope.getLocDetails = function(){// get the country and city name automatically from marker position on the map
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
		newGame.category = $scope.selectedCategory._i;
		$scope.crGame(newGame)
	}
	$scope.crGame = function(game){
		Game.addOne(game)
		.then(function (game) {
			$location.path('game/'+game._id)
		})
		.catch(function (err) {
			console.log(err);
		})
	}
}]);