'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
  .controller('MainCtrl', ['$scope',function ($scope) {
      $scope.applications = [];
      $scope.search = function(){
          $scope.applications = [
              {
                  id: 10001,
                  plan: 'Provida ML99',
                  insuranceAmmount: 500000,
                  paymentMethod: 'Payroll Deduction'
              },
              {
                  id: 10002,
                  plan: 'Provida ML99 B',
                  insuranceAmmount: 400000,
                  paymentMethod: 'Bank Collection'
              }
          ];
      };
      
  }]);
