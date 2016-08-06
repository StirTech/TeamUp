angular.module('TeamUp.services',[])
.factory('UserAuth',function ($http, $window) {

	//this function to add new user 
	var addNewUser=function (user) {
		return $http({
	      method:'POST',  
	      url:'/api/users/signup',
	      data: user
	     })
	    .then(function(resp){
	      return resp.data;
	    })
	}

	// this function to sign user
	var signUser= function (user) {
		return $http({
			method:'GET',
			url:'/api/users/signin',
			data:user
		})
		.then(function (resp) {
			return resp.data;
		})
	}

	return{
		addNewUser:addNewUser,
		signUser:signUser
	}
})

//========================================================================
.factory('User',function ($http,$window) {
	return {}
}

//========================================================================
.factory('Game',function ($http, $window) {
	return{}
})