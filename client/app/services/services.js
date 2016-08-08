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
	    .then(function(res){
	      return res.data;
	    })
	}

	// this function to sign user
	var signUser = function (user) {
		return $http({
			method:'POST',
			url:'/api/users/signin',
			data:user
		})
		.then(function (res) {
			return res.data;
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
		.then(function (res) {
			return res.data;
		})
	}


	var editUser = function (user) {
		return $http({
			method:'PUT',
			url:'/api/user/'+user._id+'/edit',
			data:{user:user}
		})
		.then(function (res) {
			return res.data
		});
	};

	var getPlayers = function (playerIds) {
		return $http({
			method:'POST',
			url: '/api/game/players',
			data: { playerIds:playerIds }
		})
		.then(function (res) {
			return res.data
		})
	}
	return {
		getUser:getUser,
		editUser:editUser,
		getPlayers:getPlayers
	}
})

//========================================================================
/*                        Game Factory                                   */
//========================================================================
.factory('Game',function ($http, $window) {
	return {
		getAll : function () {
			return $http({
				method : 'GET',
				url : '/api/games'
			})
			.then(function (res) {
				return res.data;
			});
		},
		getOne : function (gameId) {
			return $http({
				method : 'GET',
				url : '/api/game/'+gameId
			})
			.then(function (res) {
				return res.data;
			});
		},
		addOne : function (game) {
			return $http({
				method : 'POST',
				url : '/api/game',
				data : game
			})
			.then(function (res) {
				return res.data
			})
		},
		editOne : function (gameId, game) {
			return $http({
				method : 'PUT',
				url : '/api/game/'+gameId+'/edit',
				data : game
			})
			.then(function (res) {
				return res.data
			});
		},
		insertPlayer : function (gameId, userId) {
			return $http({
				method : 'POST',
				url : '/api/game/'+gameId,
				data : { userId : userId}
			})
			.then(function (res) {
				return res.data
			});
		},
		removePlayer : function (gameId, userId) {
			return $http({
				method : 'DELETE',
				url : '/api/game/'+gameId,
				data : { userId : userId}
			})
			.then(function (res) {
				return res.data
			});
		}
	}
})