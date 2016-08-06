angular.module('TeamUp.Auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth) {
  

  $scope.createUser=function () {
    // dont forget to declare Userrrrrrr Data
    UserAuth.addNewUser(userData)
  }



  $scope.signin=function () {
    //dont forget to declare User
    UserAuth.signUser(user)
  }
  
})
