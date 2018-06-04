'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('MainCtrl', ['$scope', 'webServices', function ($scope, webServices) {
        $scope.searchText = '';
        $scope.lastSearchText = '';
        $scope.applications = [];

        $scope.checkEnter = function (e) {
            if (e.which === 13) {
                $scope.search();
            }
        };

        $scope.search = function () {
            if ($scope.searchText.length > 0) {
                webServices.getApplications({
                    query: $scope.searchText
                }, function (resp) {
                    $scope.lastSearchText = $scope.searchText;
                    $scope.applications = resp;
                });
            } else {
                $scope.$broadcast('invalidField', 'searchText');
            }
        };

  }]);
