angular.module('TeamUp', [
  'TeamUp.services',
  'TeamUp.auth',
  'TeamUp.games',
  'TeamUp.game',
  'TeamUp.createGame',
  'TeamUp.editGame',
  'TeamUp.category',
  'TeamUp.profile',
  'ngRoute',
  'ngMap',
  'ngMaterial',
  'ngMessages',
  'ngFileUpload',
  'TeamUp.find'
])


.controller('HeaderController',function ($scope, $window, $location, UserAuth, User, Notification) {
  $scope.userId=$window.localStorage.userId;
  $scope.profilePicture="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";
  $scope.notifications=[];
  

  if($window.localStorage.isLogin){ 
    $scope.loggedIN=true;
    User.getUser($window.localStorage.userId)
    .then(function (user) {
      $scope.profilePicture=user.picture;
      for (var i = 0; i < user.games.length; i++) {
        Notification.getNotification(user.games[i])
        .then(function (notification) {
          for (var i = 0; i < notification.data.length; i++) {
            if(notification.data[i].from !== $window.localStorage.userId)
              $scope.notifications.push(notification.data[i]);
          }
        })
        .catch(function (err) {
          console.log(err)
        })

      }
    })

  }
  else
    $scope.loggedIN=false;

  $scope.getClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  }
  
  $scope.logout = function () {
    $scope.profilePicture="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";
    $scope.loggedIN=false;
    $window.localStorage.clear();
    $window.localStorage.loggedIN=false;
    $location.path('#/home');
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
    .when('/category', {
      templateUrl: 'app/category/category.html',
      controller: 'categoryController'
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
    .when('/find', {
      templateUrl: 'app/find/find.html',
      controller: 'searchController',
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

