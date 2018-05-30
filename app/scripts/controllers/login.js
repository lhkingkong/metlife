'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.logInUser = function (e) {
            e.preventDefault();
            console.log('Logging in', $scope.userName, $scope.password);
            $location.path('/');
        };
}]);
