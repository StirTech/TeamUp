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
})
