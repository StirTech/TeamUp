angular.module('TeamUp', [
  'TeamUp.services',
  'TeamUp.auth',
  'TeamUp.games',
  'TeamUp.game',
  'TeamUp.createGame',
  'TeamUp.editGame',
  'TeamUp.profile',
  'TeamUp.editProfile',
  'ngRoute'

])

.controller('HeaderController',function ($scope, $window, $location, Auth) {
  $scope.logout = function () {
    $window.localStorage.clear();
    $window.islogin = false ;
  }
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
    .when('/editGame/:id/edit', {
      templateUrl: 'app/game/editGame.html',
      controller: 'editGameController'
    })
    .when('/profile/:id', {
      templateUrl: 'app/profile/profile.html',
      controller: 'profileController',
    })
    .when('/editProfile/:id/edit', {
      templateUrl: 'app/profile/editProfile.html',
      controller: 'editProfileController',
    })
    .otherwise({
      redirectTo: '/home'
    });

});
