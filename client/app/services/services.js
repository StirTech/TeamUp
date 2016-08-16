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
	//
	// this function to sign user
	var fbSignin = function (facebookID) {
		return $http({
			method:'POST',
			url:'/api/users/fbSignin',
			data:facebookID
		})
		.then(function (res) {
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
		signUser:signUser,
		fbSignin:fbSignin
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


	var editUser = function (user, userId) {
		return $http({
			method:'PUT',
			url:'/api/user/'+userId+'/edit',
			data: user
		})
		.then(function (res) {
			return res
		});
	};

	var getPlayers = function (playerIds) {
		return $http({
			method:'POST',
			url: '/api/game/players',
			data: playerIds
		})
		.then(function (res) {
			return res
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
			console.log(gameId);
			console.log(userId);
			return $http({
				method : 'PUT',
				url : '/api/game/removePlayer/'+gameId,
				data: {
					userId: userId
				}
			})
			.then(function (res) {
				return res.data
			});
		}
	}
})
//========================================================================
/*                        Category Factory                                   */
//========================================================================
.factory('Category',function ($http, $window) {

	var getAll = function(){
		return $http({
				method : 'GET',
				url : '/api/categories'
			})
			.then(function (res) {
				return res.data;
		});
	}

	var getCategory = function(id){
		return $http({
				method : 'GET',
				url : '/api/category' + id
			})
			.then(function (res) {
				return res.data;
		});
	}

	var addCategory = function(category){

	}

	var editCategory = function(id, category){

	}

	var deleteCategory = function(id){

	}

	return {
		getAll: getAll,
		getCategory: getCategory,
		addCategory: addCategory,
		editCategory: editCategory,
		deleteCategory: deleteCategory
	}
}
//========================================================================
/*                        Facebook Factory                                   */
//========================================================================
.factory('facebook', function(){
	return {	
		share : function (gameId, picture, gameName) {
			FB.ui({
				method: 'share',
				display: 'popup',
				href: 'https://teamup-me.herokuapp.com/'+gameId,
				picture: picture,
	         	caption: gameName,
	          	description: 'teamup',
	          	message: ''
				}, function(response){
			}); 
		}
	}
})
