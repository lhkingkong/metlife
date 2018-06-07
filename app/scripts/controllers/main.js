'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('MainCtrl', ['$scope', '$rootScope', 'webServices', function ($scope, $rootScope, webServices) {
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
                $rootScope.$emit('loadingOn');
                webServices.getApplications({
                    query: $scope.searchText
                }, function (resp) {
                    $rootScope.$emit('loadingOff');
                    $scope.lastSearchText = $scope.searchText;
                    $scope.applications = resp.data;
                }, function(){
                    $rootScope.$emit('loadingOff');
                });
            } else {
                $scope.$broadcast('invalidField', 'searchText');
            }
        };

  }]);
