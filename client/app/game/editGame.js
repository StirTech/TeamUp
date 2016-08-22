angular.module('TeamUp.editGame',[])

.controller('editGameController',function($scope,$routeParams, Game,$location,Category){
	$scope.game={};
	$scope.categories = [];
	$scope.selectedCategory={};

	$scope.initialize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;
			Category.getAll()
			.then(function (categories) {
				$scope.categories=categories;
				for (var i = 0; i < $scope.categories.length; i++) {
					if(game.category===$scope.categories[i]._id){
						$scope.selectedCategory=$scope.categories[i];
						$scope.childs=$scope.categories[i].games;
					}
				}
			})
			.catch(function (err) {
				console.log(err);
			})
			
		})
		.catch(function (err) {
			console.log(err);
		})
	};

	$scope.update =function () {
		for (var i = 0; i < $scope.categories.length; i++) {
			if($scope.categories[i].name===$scope.category){
				$scope.selectedCategory=$scope.categories[i];
				$scope.childs=$scope.categories[i].games;
			}
		}
	}

	$scope.editGame = function () {
		Game.editOne($routeParams.id,$scope.game)
		.then(function (game) {
			$location.path('/game/'+$routeParams.id)
		})
		.catch(function (err) {
			console.log(err)
		})
	}

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
	        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.locationID.lat+","+$scope.locationID.lng+"&sensor=false",
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
	                    }
	                });

	            });
	        },
	        error: function () { console.log('error'); } 
	    }); 
    }


	$scope.initialize();
});