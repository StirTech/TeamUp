angular.module('TeamUp.auth', [])

  .controller('AuthController', function ($scope, $window, $location, UserAuth ) {
    $scope.createUserData={};
    $scope.signinUserData={};
    $window.islogin = '';

    $scope.setcreateUserData = function (firstName, lastName, username, password, email) {
      $scope.createUserData.username = username;
      $scope.createUserData.password = password;
      $scope.createUserData.email = email;
      $scope.createUserData.firstName = firstName;
      $scope.createUserData.lastName = lastName;
      UserAuth.addNewUser($scope.createUserData)
    }
     

    //===============================================================================================
    /*                                        facrbook Auth                                        */
    //===============================================================================================

    $scope.fbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                if(response.status === "connected"){
                    getUserInfo();
                    $location.path('/')
                    $scope.$apply();
                }
                
            } else {

                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_videos'});

        function getUserInfo() {
            // get basic info
            FB.api('/me', function (response) {
                console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                // get profile picture
                FB.api('/me/picture?type=normal', function (picResponse) {
                    console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                    response.imageUrl = picResponse.data.url;
                    // store data to DB - Call to API
                    // Todo
                    // After posting user data to server successfully store user data locally
                    var user = {};
                    user.name = response.name;
                    user.email = response.email;
                    if(response.gender) {
                        response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = picResponse.data.url;
                    $window.localStorage.setItem('userInfo', JSON.stringify(user));
                     //JSON.parse(localStorage.userInfo);                       
                });
            });
        }
    };
    // END FB Login

    
   



    // Google Plus Login
    $scope.gplusLogin = function () {
        var myParams = {
            // Replace client id with yours
            'clientid': '18301237550-3vlqoed2en4lvq6uuhh88o2h1l9m70tr.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': loginCallback,
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(myParams);
        //console.log(myParams)
        function loginCallback(result) {
            if (result['status']['signed_in']) {
                var request = gapi.client.plus.people.get({'userId': 'me'});
                request.execute(function (resp) {
                    console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
                    var userEmail;
                    if (resp['emails']) {
                        for (var i = 0; i < resp['emails'].length; i++) {
                            if (resp['emails'][i]['type'] == 'account') {
                                userEmail = resp['emails'][i]['value'];
                            }
                        }
                    }
                    // store data to DB
                    var user = {};
                    user.name = resp.displayName;
                    user.email = userEmail;
                    if(resp.gender) {
                        resp.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = resp.image.url;
                    $cookieStore.put('userInfo', user);
                    $state.go('dashboard');
                });
            }
        }
    };

  

    //===============================================================================================
    /*                                             signin                                          */
    //===============================================================================================
    
    $scope.signin=function (username,password) {
      $scope.signinUserData.username = username;
      $scope.signinUserData.password = password;
      UserAuth.signUser(name)
      .then(function (resp) {
        $window.localStorage['token'] = resp.token;
        $window.localStorage['userId'] = resp.userId;
      })
      .then(function () {
        $scope.islogin();
        $location.path('/');
      })
    }


    $scope.logout = function () {
        console.log('log out user')
        $location.path('/signin')
        $window.localStorage.clear();
        $window.islogin = false ;
   }


    $scope.islogin = function () {
      if($window.localStorage['token'] ){
        $window.islogin = true;
      }else{
        $window.islogin = false;
      }
      console.log($window.islogin)
    }


    
})
