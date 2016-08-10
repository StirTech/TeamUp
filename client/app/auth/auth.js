angular.module('TeamUp.auth', [])


  .controller('AuthController', function ($scope, $window, $location, UserAuth, $route ) {
    
    //===============================================================================================
    /*                                        facrbook Auth                                        */
    //===============================================================================================
    $scope.facebookUser = {};

    $scope.fbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                if(response.status === "connected"){
                    getUserInfo();
                    //$window.localStorage['facebookState'] = response.status;
                    //$window.localStorage['isLogin'] = true;
                    //$location.path('/home');
                    //$window.location.reload();
                    //$scope.$apply();                
                }
                
            } else {

                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_birthday,user_location,user_hometown'});

        function getUserInfo() {

            // get basic info
            FB.api('/me',{ locale: 'en_US', fields: 'name, location, email' }, function (response) {
                $scope.facebookUser.username = response.email;
                $scope.facebookUser.firstName = response.name.split(" ")[0]
                $scope.facebookUser.lastName = response.name.split(" ")[1]
                $scope.facebookUser.password = response.email;
                $scope.facebookUser.email = response.email;
                $scope.facebookUser.location = response.location.name.split(" "); 
                $scope.facebookUser.country =$scope.facebookUser.location[$scope.facebookUser.location.length-1];
                $scope.facebookUser.city =$scope.facebookUser.location[0]
                
                // get profile picture
                FB.api('/me/picture?type=normal', function (picResponse) {
                    $scope.facebookUser.picture = picResponse.data.url;                 
                });


                // to get friends
                FB.api("/me/friends", function (response) {
                      if (response && !response.error) {
                        user.friends = response.data
                        console.log(user)
                      }
                    }
                );
            $scope.signup($scope.facebookUser);
            });

           
          //$window.localStorage.setItem('userInfo', JSON.stringify(user));  
          //JSON.parse(localStorage.userInfo);
          //console.log($scope.facebookUser,"hoooooooooooooooooooooooooooooooooooooooon")
        }
    };

    
   $window.do =function (data) {
       $scope.signup(data)
   } 



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
 /*                                        facrbook Auth                                        */
 //===============================================================================================

    $scope.wrong=true;
    $scope.signin = function (user) {
        console.log(user,"ooooooooooooooooooooooooooooooooooooooooooooooooo")
      UserAuth.signUser(user)
      .then(function (data) {
        $scope.wrong=false;
        $window.localStorage['token'] = data.token;
        $window.localStorage['userId'] = data.userId;
        $window.localStorage['isLogin'] = true;
        $location.path('/home');
        $window.location.reload();
      })
      .then(function () {
        $scope.islogin();
        $location.path('/');
        })
      .catch(function (err) {
        console.log(err);
        $scope.wrong=false;
        $scope.username="";
        $scope.password="";
      })
    };


    $scope.signup = function (newUser) {
        UserAuth.addNewUser(newUser)
        .then(function (user) {
            $scope.signin({
                            username:newUser.username,
                            password:newUser.password});
        })
        .catch(function (err) {
            console.log(err);
        })
    }

   

    $scope.islogin = function () {
   
      if($window.localStorage['token']  || $window.localStorage['facebookState'] === "connected"){
        $window.islogin = true;
      }else{
        $window.islogin = false;
      }
      console.log($window.islogin)
    }
})
