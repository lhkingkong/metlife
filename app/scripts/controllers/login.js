'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('LoginCtrl', ['$scope', '$location', 'webServices', function ($scope, $location, webServices) {

        webServices.generateTokens({
            headers: {
                "Authorization": "client_id:a18500c145bb80b0ddbf560fede8f68095c895691d41fb4da9b392e5234090bb, client_secret:18146625cb8101a2f02a5df755ae395764fad81be446f203018afd22b86af21e",
                "Content-Type": "application/json"
            },
            params: {
                "grant_type": "client_credentials"
            }
        }, function(resp){
            console.log(resp);
        });

        $scope.logInUser = function (e) {
            e.preventDefault();
            console.log('Logging in', $scope.userName, $scope.password);
            $location.path('/');
        };
}]);
