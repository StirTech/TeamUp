//'use strict';

describe('profileController', function () {
  var $scope, $rootScope, createController, Links, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('TeamUp'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    User = $injector.get('User');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('profileController', {
        $scope: $scope,
        User: User
      });
    };

  }));

  it('should have a user property on the $scope', function () {
    createController();
    expect($scope.user).to.be.an('object');
  });

  it('should call `User.getUser()` when controller is loaded', function () {
    sinon.spy(User, 'getUser');
    $httpBackend.expectGET('/api/user/123').respond(200);
    User.getUser('123')
    //createController();
    $httpBackend.flush();

    expect(User.getUser.called).to.equal(true);
    User.getUser.restore();
  });

  it('should populate the user property after the call to `User.getUser()`', function () {
    var mockUser = {id: '123', username: 'test'};
    $httpBackend.expectGET('/api/user/123').respond(mockUser);
    User.getUser('123')

    createController();
    expect($scope.user).to.deep.equal(mockUser);
    $httpBackend.flush();
  });
});