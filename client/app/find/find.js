angular.module('TeamUp.find',[])

.controller('searchController',function($scope, $window, $location, Game, User){
    $scope.data={};
    $scope.type='';
    $scope.initialize = function () {
        Game.getAll()
        .then(function (games) {
            $scope.data.games = games;
            $scope.data.types=[];
            $scope.data.types.push('All');
            for (var i = 0; i < games.length; i++) {
                if($scope.data.types.indexOf(games[i].type)===-1)
                    $scope.data.types.push(games[i].type);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
        User.getAll()
        .then(function (users) {
            $scope.data.users = users;
            $scope.getResult();
        })
        .catch(function (err) {
            console.log(err);
        })
    };
    $scope.getResult = function(){
        var users = $scope.data.users;
        var games = $scope.data.games;
        var searchStr = $window.localStorage.query.toLowerCase()
        $scope.result = {
            games:[],
            users:[]
        };
        for( var key in games){
            if(games[key].name.toLowerCase().indexOf(searchStr) !== -1){
                $scope.result.games.push(games[key]);
            }
        }
        for( var key in users){
            if(users[key].firstName.toLowerCase().indexOf(searchStr) !== -1 || users[key].username.toLowerCase().indexOf(searchStr) !== -1 || users[key].lastName.toLowerCase().indexOf(searchStr) !== -1){
                $scope.result.users.push(users[key]);
            }
        }
        console.log($scope.result)              
    }
    $scope.initialize();
})
