angular.module('TeamUp.game',[])

.controller('gameController',function($scope, Game, User, facebook, $routeParams, $location, $window, $interval, Category, Comment, $mdDialog){
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


	$scope.toggle = function() {
        $scope.show = !$scope.show;
    };

	$scope.initlize = function () {
		Game.getOne($routeParams.id)
		.then(function (game) {
			$scope.game=game;
			User.getUser(game.owner)
			.then(function (user) {
				$scope.owner=user
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
			.catch(function (err) {
				console.log(err)
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
			console.log('signin')
			$location.path('/signin');
			return;
		}
		if($scope.game.players.indexOf($window.localStorage.userId)===-1){
			$scope.joinButton="Leave"
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
			$scope.closed=false;
			$scope.joinButton="Join";
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

	$scope.initlize();
	

});

