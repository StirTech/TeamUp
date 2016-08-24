describe('AuthController', function () {
  var $scope, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('TeamUp'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    UserAuth = $injector.get('UserAuth');
    $scope = $rootScope.$new();
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $route = $injector.get('$route');
    userID = 1

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $location: $location,
        $window: $window,
        $route: $route,
        FB: {
          login: function(callback){
                    response = {
                      authResponse: {userID: userID},
                      status: 'connected'
                    }
                    callback(response)
                  },
          api: function(){}
          },
        UserAuth: UserAuth
      });
    };

  }));

  it('should have a facebookUser property on the $scope', function () {
    createController();
    expect($scope.facebookUser).to.be.an('object');
  });

  it('should have a facebookUserId on scope.facebookUser', function () {
    createController();
    $scope.fbLogin()

    expect($scope.facebookUser.fb_ID).to.equal(userID);
  })


});