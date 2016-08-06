angular.module('TeamUp.services',[])

//========================================================================
/*                        UserAuth Factory                                   */
//========================================================================
.factory('UserAuth',function ($http, $window) {

	//this function to add new user 
	var addNewUser = function (user) {
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
	var signUser = function (user) {
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
/*                        User Factory                                   */
//========================================================================
.factory('User',function ($http,$window) {

	var getUser=function (userId) {
		return $http({
			method:'GET',
			url:'/api/user/'+userId
		})
		.then(function (resp) {
			return resp.data;
		})
	}


	var editUser = function (user) {
		return $http({
			method:'PUT',
			url:'/api/user/'+user.id+'/edit',
			data:{user:user}
		})
		.then(function (resp) {
			return resp.data.user
		});
	};

	var getPlayers = function (userArray) {
		return $http({
			method:'POST',
			url:,
			data:{userArray:userArray}
		})
		.then(function (resp) {
			return resp.data
		})
	}
	return {
		getUser:getUser,
		editUser:editUser,
		getPlayers:getPlayers
	}
}

//========================================================================
/*                        Game Factory                                   */
//========================================================================
.factory('Game',function ($http, $window) {
	return{}
})