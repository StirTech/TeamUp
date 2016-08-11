angular.module('TeamUp', [
  'TeamUp.services',
  'TeamUp.auth',
  'TeamUp.games',
  'TeamUp.game',
  'TeamUp.createGame',
  'TeamUp.editGame',
  'TeamUp.profile',
  'TeamUp.editProfile',
  'ngRoute',
  'ngMap'
])



.controller('HeaderController',function ($scope, $window, $location, UserAuth) {
  $scope.userId=$window.localStorage.userId;

  if($window.localStorage.isLogin){ 
    $scope.loggedIN=true;
  }else
    $scope.loggedIN=false;

  $scope.logout = function () {
    $scope.loggedIN=false;
    $window.localStorage.clear();
    $window.localStorage.loggedIN=false;
    $location.path('/home')
  }
})
.controller('EventArgumentsController', function($scope, $window, NgMap) {
    var vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });
    vm.placeMarker = function(e) {
      var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
      vm.map.panTo(e.latLng);
      $window.localStorage.loc = e.latLng;
    }
   //console.log(loc)
  })
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/game/games.html',
      controller: 'gamesController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/createGame', {
      templateUrl: 'app/game/createGame.html',
      controller: 'createGameController'
    })
    .when('/game/:id', {
      templateUrl: 'app/game/game.html',
      controller: 'gameController'
    })
    .when('/game/:id/edit', {
      templateUrl: 'app/game/editGame.html',
      controller: 'editGameController'
    })
    .when('/profile/:id', {
      templateUrl: 'app/profile/profile.html',
      controller: 'profileController',
    })
    .when('/profile/:id/edit', {
      templateUrl: 'app/profile/editProfile.html',
      controller: 'editProfileController',
    })
    .otherwise({
      redirectTo: '/home'
    });
    
});


//======================================================================================
/*                                     facebook Auth                                  */
//======================================================================================
//var secret = '7ba8efed3d619c30658079c513ff2f4f';
//var ID = '1563637017279611';

window.fbAsyncInit = function() {
    FB.init({ 
      appId: '1264355366938127',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.7'
    });
};


(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

