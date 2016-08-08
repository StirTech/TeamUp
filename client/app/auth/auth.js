angular.module('TeamUp.auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth ) {
    $scope.createUserData={};
    $scope.signinUserData={};
    $window.islogin = false;

    $scope.setcreateUserData = function (firstName, lastName, username, password, email) {
      $scope.createUserData.username = username;
      $scope.createUserData.password = password;
      $scope.createUserData.email = email;
      $scope.createUserData.firstName = firstName;
      $scope.createUserData.lastName = lastName;
      UserAuth.addNewUser($scope.createUserData)
    }
    

    //===============================================================================================
    /*                                        login/out Auth                                       */
    //===============================================================================================
    
    $scope.islogin = function () {
      if($window.localStorage['token']){
        $window.islogin = true;
      }else{
        $window.islogin = false;
      }
      console.log($window.islogin)
    }
    
    //===============================================================================================
    /*                                             signin                                          */
    //===============================================================================================
    
    $scope.signin=function (username,password) {
      $scope.signinUserData.username = username;
      $scope.signinUserData.password = password;
      UserAuth.signUser($scope.signinUserData)
      .then(function (resp) {
        console.log(resp)
        $window.localStorage['token'] = resp.token;
        $window.localStorage['userId'] = resp.userId;
      })
      .then(function () {
        $scope.islogin();
      })
    }
    
})
