angular.module('TeamUp.createGame',[/*'ngMap'*/])

.controller('createGameController',function( $scope, $window, Game, $location, NgMap){
	if($window.localStorage.userId===undefined)
		$location.path('signin');
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
      /*$scope.locationID.lat =e.latLng.lat()
      $scope.locationID.lng =e.latLng.lng()*/
      console.log(e.latLng);
      /*{lat: -25.363, lng: 131.044};*/
    }
	var newGame = {};
	$scope.getGameData = function(){
		newGame.owner = $window.localStorage.userId;
		newGame.name = $scope.name;
		newGame.type	= $scope.type;
		newGame.description = $scope.description;
		newGame.locationID =  $scope.locationID;
		newGame.country = $scope.country;
		newGame.city = $scope.city;
		newGame.picture	= $scope.picture;
		newGame.date	= $scope.date;
		newGame.numOfPlayers	= $scope.numOfPlayers;
		$scope.crGame(newGame);
		console.log(newGame.locationID)
	}
	$scope.crGame = function(game){
		Game.addOne(game)
		.then(function (game) {
			console.log(game);
			$location.path('game/'+game._id)
		})
		.catch(function (err) {
			console.log(err);
		})
	}
});