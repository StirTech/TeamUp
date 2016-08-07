angular.module('TeamUp.auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth) {
    $scope.createUserData={};
    $scope.signinUserData={};

    $scope.setcreateUserData = function (firstName, lastName, username, password, email) {
      console.log("sssssssssssssssssssssssss")
      $scope.createUserData.username = username;
      $scope.createUserData.password = password;
      $scope.createUserData.email = email;
      $scope.createUserData.firstName = firstName;
      $scope.createUserData.lastName = lastName;
      $scope.createUser($scope.createUserData)
    }

    $scope.createUser=function (userD) {
      console.log(userD)
      UserAuth.addNewUser(userD)
    }
    


    //=====================================================================
    $scope.signin=function (username,password) {
      console.log($scope.signinUserData.a)
      $scope.signinUserData.username = username;
      $scope.signinUserData.password = password;
      UserAuth.signUser($scope.signinUserData)
    }
    
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
