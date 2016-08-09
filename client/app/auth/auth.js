angular.module('TeamUp.auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth, $route ) {
    $scope.wrong=true;

    $scope.signin = function () {
      UserAuth.signUser($scope.user)
      .then(function (data) {
        $scope.wrong=false;
        $window.localStorage['token'] = data.token;
        $window.localStorage['userId'] = data.userId;
        $window.localStorage['isLogin'] = true;
        $location.path('/home');
        $window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
        $scope.wrong=false;
        $scope.username="";
        $scope.password="";
      })
    };

    $scope.signup = function () {
        UserAuth.addNewUser($scope.user)
        .then(function (user) {
            $scope.signin();
        })
        .catch(function (err) {
            console.log(err);
        })
    }

    // //===============================================================================================
    // /*                                        login/out Auth                                       */
    // //===============================================================================================
    
    // $scope.islogin = function () {
    //   if($window.localStorage['token']){
    //     $window.islogin = true;
    //   }else{
    //     $window.islogin = false;
    //   }
    //   console.log($window.islogin)
    // }
    
    // //===============================================================================================
    //                                              signin                                          
    // //===============================================================================================
    
    // $scope.signin=function (username,password) {
    //   $scope.signinUserData.username = username;
    //   $scope.signinUserData.password = password;
    //   UserAuth.signUser($scope.signinUserData)
    //   .then(function (data) {
    //     console.log(resp)
    //     $window.localStorage['token'] = resp.token;
    //     $window.localStorage['userId'] = resp.userId;
    //   })
    //   .then(function () {
    //     $scope.islogin();
    //   })
    // }
    
})
