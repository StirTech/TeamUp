'use strict';

describe('Services', function () {
  beforeEach(module('TeamUp.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('User Factory', function () {
    var $httpBackend, User;

    beforeEach(inject(function (_$httpBackend_, _User_) {
      $httpBackend = _$httpBackend_;
      User = _User_;
    }));

    it('should exist', function () {
      expect(User).to.exist;
    });

    it('should have a method `getUser`', function () {
      expect(User.getUser).to.be.a('function');
    });

    it('should have a method `editUser`', function () {
      expect(User.editUser).to.be.a('function');
    });

    it('should have a method `getPlayers`', function () {
      expect(User.getPlayers).to.be.a('function');
    });

    it('should get User by id with `getUser`', function () {
      var mockResponse = { 
            id: '123',
            username: 'test' 
          };

      $httpBackend.expect('GET', '/api/user/'+mockResponse.id).respond(mockResponse);

      User.getUser(mockResponse.id).then(function (User) {
        expect(User).to.deep.equal(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should edit User by id with `editUser`', function () {
      var mockResponse = { 
            id: '123',
            username: 'test' 
          };
      var mockEdit = {
            username: 'testing' 
          };    

      $httpBackend
        .expect('PUT', '/api/user/'+mockResponse.id+'/edit', JSON.stringify(mockEdit))
        .respond(201, {
          id: '123',
          username: 'testing'
        });

      User.editUser(mockEdit, mockResponse.id).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data.username).to.equal('testing');
      });

      $httpBackend.flush();
    });

    it('should get players after being provided with an array of ids with `getPlayers`', function () {
      var mockResponse = [
        {id: '123', username: 'test'},
        {id: '124', username: 'tester'},
        {id: '125', username: 'testest'},
      ];

      $httpBackend
        .expect('POST', '/api/game/players', JSON.stringify(["123","124","125"]))
        .respond(201, mockResponse);

      User.getPlayers(['123', '124', '125']).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data[0].username).to.equal('test');
      });

      $httpBackend.flush();
    });

  });

});