'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:SimplemodalCtrl
 * @description
 * # SimplemodalCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('SimpleModalCtrl', ['$scope', '$uibModalInstance', 'message', function ($scope, $uibModalInstance, message) {
        $scope.message = message;
        $scope.ok = function () {
            $uibModalInstance.close();
        };
  }])
