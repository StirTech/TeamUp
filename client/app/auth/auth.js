angular.module('TeamUp.Auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth) {
  $scope.userData={
	username:'',
	firstName:'',
	lastName:'',
	password:'',
	email:''
  }



  $scope.createUser=function () {
    UserAuth.addNewUser(userData)
  }

  $scope.signin=function (username,password) {
    var user.username = username;
    user.password = password;
    
    UserAuth.signUser(user)
  }
  
})
