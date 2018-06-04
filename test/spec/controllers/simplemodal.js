'use strict';

describe('Controller: SimplemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('metLifeApp'));

  var SimplemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SimplemodalCtrl = $controller('SimplemodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SimplemodalCtrl.awesomeThings.length).toBe(3);
  });
});
