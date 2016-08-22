angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, facebook, $routeParams, $location, $window, $interval, Category, Comment, $mdDialog, Notification){
	$scope.game={};
	$scope.owner ={};
	$scope.category ={};
	$scope.game.plyersObjs =[];
	$scope.numberOfPlayer;
	$scope.joinButton="join";
	$scope.closed =false;
	$scope.joinButtonIf=true;
	$scope.show = false;
	$scope.comments={};
	$scope.userComments=[];
	$scope.commentText="";
	$scope.joined=false;
	$scope.editIf=false;





	$scope.toggle = function() {
        $scope.show = !$scope.show;
    };

    $scope.editGame = function () {
    	$location.path('game/'+$scope.game._id+'/edit')
    }

	$scope.initlize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;
			if($scope.game.players.indexOf($window.localStorage.userId)>-1)
				$scope.joined=true;
			if($scope.game.owner===$window.localStorage.userId)
				$scope.editIf=true;
			User.getUser(game.owner)
			.then(function (user) {
				$scope.owner=user
			})
			.catch(function (err) {
				console.log(err)
			})
			User.getUser($window.localStorage.userId)
			.then(function (user) {
				$scope.currentUser=user;
			})
			.catch(function (err) {
				console.log(err)
			})
			Category.getCategory(game.category)
			.then(function (category) {
				$scope.category=category
			})
			.catch(function (err) {
				console.log(err)
			})
			Comment.getComment($routeParams.id)
			.then(function (data) {
				$scope.comments=data.data.allComment;
				$scope.userComments=data.data.players;
			})
			if($scope.game.players.indexOf($window.localStorage.userId)!==-1){
				$scope.joinButton="leave";
				if($scope.game.numOfPlayers===$scope.game.players.length){
					$scope.closed=true;
				}
			}
			else{
				if($scope.game.numOfPlayers===$scope.game.players.length){
					$scope.closed=true;
					$scope.joinButtonIf=false;
				}
			}
			User.getPlayers({playerIds :$scope.game.players})
			.then(function (data) {
				$scope.game.plyersObjs=data.data;
				$scope.numberOfPlayer=$scope.game.plyersObjs.length;
			})
			.then($scope.showCount())
			.catch(function (err) {
				console.log(err);
			})
		})

		.catch(function (err) {
			console.log(err);
		})

	};
	

	$scope.fbshare = function(){
		facebook.share($routeParams.id, $scope.game.picture, $scope.game.name);	
	};

	$scope.joinGame =function () {
		if($window.localStorage.userId===undefined){
			$location.path('/signin');
			return;
		}
		if($scope.game.players.indexOf($window.localStorage.userId)===-1){
			var newNotification = {
				from : $window.localStorage.userId,
				type : 'Join',
				text : $scope.currentUser.username + " Join " + $scope.game.name
			}
			Notification.insertNotification($routeParams.id,newNotification)
			.then(function (notif) {
				console.log(notif.data)
			})
			.catch(function (err) {
				console.log(err)
			})
			$scope.joinButton="Leave"
			$scope.joined=true;
			Game.insertPlayer($scope.game._id,$window.localStorage.userId)
			.then(function (game) {
				$scope.game=game;
				$scope.initlize()
			})
			.catch(function (err) {
				console.log(err)
			})
		}
		else {
			var newNotification = {
				from : $window.localStorage.userId,
				type : 'Leave',
				text : $scope.currentUser.username + " Leave " + $scope.game.name
			}
			Notification.insertNotification($routeParams.id,newNotification)
			.then(function (notif) {
				console.log(notif.data)
			})
			.catch(function (err) {
				console.log(err)
			})
			$scope.closed=false;
			$scope.joinButton="Join";
			$scope.joined=false;
			Game.removePlayer($scope.game._id,$window.localStorage.userId)
			.then(function(game) {
				$scope.initlize();
			})
			.catch(function (err) {
				console.log(err)
			})
		}
	}
	$scope.showCount = function(){
	    var _second = 1000;
	    var _minute = _second * 60;
	    var _hour = _minute * 60;
	    var _day = _hour * 24;

	    function showRemaining() {
	        var now = new Date();
	        var distance = Date.parse($scope.game.date) - Date.parse(now);
	        if (distance < 0) {
	            clearInterval($scope.timer);
	            $scope.countdown = 'EXPIRED!';
	            return;
	        }
	        var days = Math.floor(distance / _day);
	        var hours = Math.floor((distance % _day) / _hour);
	        var minutes = Math.floor((distance % _hour) / _minute);
	        var seconds = Math.floor((distance % _minute) / _second);

	        $scope.countdown = days + 'days ';
	        $scope.countdown += hours + 'hrs ';
	        $scope.countdown += minutes + 'mins ';
	        $scope.countdown += seconds + 'secs';
	    }
	    $scope.timer = $interval(showRemaining, 1000);		
	}

	$scope.postComment = function () {
		if($window.localStorage.userId){
			if($scope.commentText!==""){
				Comment.insertComment({game:$routeParams.id,text : $scope.commentText , userId : $window.localStorage.userId})
				.then(function (comment) {
					$scope.commentText="";
					$scope.initlize();
				})
				.catch(function (err) {
					console.log(err)
				})
			}
		}
		else {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('Comment Alert')
		        .textContent('You have to login to make comment.')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Got it!')
		    );
		}
	}

	$scope.getMessages = function () {
		pubnub.history({
		    channel : "TeamUp"+game._id,
		    callback : function(m){
		        console.log(m[0])
		    },
		    count : 100, // 100 is the default
		    reverse : false // false is the default
		});
	}

	$scope.showAdvanced = function(ev) {
	    $mdDialog.show({
	    controller: DialogController,
	    templateUrl: 'app/game/chat.html',
	    parent: angular.element(document.body),
	    locals: {game : $scope.game},
	    targetEvent: ev,
	    clickOutsideToClose:true,
	    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
		  $scope.status = 'You said the information was "' + answer + '".';
		}, function() {
		  $scope.status = 'You cancelled the dialog.';
		});

		function DialogController($scope, $mdDialog,game) {

			$scope.currentUser={};
			$scope.game=game;

			User.getUser($window.localStorage.userId)
			.then(function (user) {
				$scope.currentUser=user;
			})
			.catch(function (err) {
				console.log(err)
			})

			$scope.messages=[];
				pubnub.history({
			    channel : "TeamUp"+game._id,
			    callback : function(m){
			        $scope.messages=m[0];
			    },
			    count : 100, // 100 is the default
			    reverse : false // false is the default
			});

			pubnub.subscribe({
			    channel : "TeamUp"+game._id,
			    message : function(m){
			        $scope.messages.push(m);
			    },
			    error : function (error) {
			        // Handle error here
			        console.log(JSON.stringify(error));
			    }
			});

			$scope.sendMessage = function () {
				var newMessage = {
					from : $scope.currentUser,
					text : $scope.messageText,
					date : new Date()
				}
				pubnub.publish({
				    channel : "TeamUp"+game._id,
				    message : newMessage,
				    callback : function(m){
				    }
				});
			}				

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };
		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };
		    $scope.answer = function(answer) {
		      $mdDialog.hide(answer);
		    };
		  }
	};

	$scope.initlize();
	

});

