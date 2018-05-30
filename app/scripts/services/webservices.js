'use strict';

/**
 * @ngdoc service
 * @name metLifeApp.webServices
 * @description
 * # webServices
 * Service in the metLifeApp.
 */
angular.module('metLifeApp')
    .factory('webServices', ['$resource', function ($resource) {
        var verifyUser = function (params, callback) {

        };

        var signIn = function (params, callback) {
            var Service = $resource(host + ':controller/sign_in', {
                controller: "user"
            });

            Service = Service.save(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, _errorResponse);
        };
        
        var getApplicationInfo = function (params, callback) {
            var Service = $resource(host + ':controller/info', {
                controller: "user"
            });

            Service = Service.get(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, _errorResponse);
        };
        
        var getZipInformation = function(params, callback){
            var Service = $resource('https://api-codigos-postales.herokuapp.com/v2/codigo_postal/'+params);

            Service = Service.get(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, _errorResponse);
        };

        //used for all
        var _successResponse = function (response, callback) {
            return callback(response);
        };

        var _errorResponse = function (error) {
            alert("Error when you call a service, please try again");
        };

        return {
            verifyUser: verifyUser,
            signIn: signIn,
            getApplicationInfo: getApplicationInfo,
            getZipInformation: getZipInformation
        };
  }]);
