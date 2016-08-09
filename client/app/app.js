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

.controller('HeaderController',function ($scope, $window, $location, UserAuth) {
  $scope.userId=$window.localStorage.userId;

  if($window.localStorage.isLogin)
    $scope.loggedIN=true;
  else
    $scope.loggedIN=false;

  $scope.logout = function () {
    $scope.loggedIN=false;
    $window.localStorage.clear();
    $window.localStorage.loggedIN=false;
    $location.path('/home')
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
