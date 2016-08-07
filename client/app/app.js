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