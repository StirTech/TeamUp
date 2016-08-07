
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
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    //$httpProvider.interceptors.push('AttachTokens');
});

angular.module('TeamUp'[
	'TeamUp.Auth',
	'TeamUp.services',
	'ngRoute'
	])
.config(function ($routeProvider, $httpProvider) {
	$routeProvider
	.when('/signin',{
		templateUrl : 'app/auth/signin.html'
		controller  : 'app/auth/auth.js',
	})
	.when('/signup',{
		templateUrl : 'app/auth/signup.html'
		controller  : 'app/auth/auth.js',
	})

	 $httpProvider.interceptors.push('AttachTokens');
})
