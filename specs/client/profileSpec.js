//'use strict';

describe('profileController', function () {
  var $scope, $rootScope, createController, User, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('TeamUp'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $routeParams = $injector.get('$routeParams');
    User = $injector.get('User');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('profileController', {
        $scope: $scope,
        $location: $location,
        $window: $window,
        $routeParams: $routeParams,
        User: User
      });
    };

  }));

  it('should have a user property on the $scope', function () {
    createController();
    expect($scope.user).to.be.an('object');
  });

  xit('should call `User.getUser()` when controller is loaded', function () {
    sinon.spy(User, 'getUser');
    $httpBackend.expectGET('/api/user/undefined').respond(200);
    
    createController();
    //$httpBackend.flush();

    expect(User.getUser.called).to.equal(true);
    User.getUser.restore();
  });

  xit('should populate the user property after the call to `User.getUser()`', function () {
    var mockUser = {username: 'test'};
    $httpBackend.expectGET('/api/user/undefined').respond(200, mockUser);
    
    createController();
    //$httpBackend.flush();
    
    //expect($scope.user).to.deep.equal(mockUser);
  });
});