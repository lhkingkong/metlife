'use strict';

/**
 * @ngdoc service
 * @name metLifeApp.webServices
 * @description
 * # webServices
 * Service in the metLifeApp.
 */
angular.module('metLifeApp')
    .factory('webServices', ['$resource', '$rootScope', '$http', function ($resource, $rootScope, $http) {
        //var baseUrl = 'http://'+window.location.host+'/MetlifeMexicoPOC';
        var baseUrl = 'http://localhost:9090/MetlifeMexicoPOC';

        // ----------------- user
        
        var generateTokens = function(options){
            $http({
                url: 'https://api.us.onelogin.com/auth/oauth2/token',
                method: 'GET',
                params: options.params,
                data: '',
                headers: options.headers
            }).then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });
        };

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

        // ----------------- applications

        var getApplications = function (params, callback, errorCallback) {
            
            $http({
                url: baseUrl + '/applications',
                method: 'GET',
                params: params,
                data: '',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });
            
            /*var Service = $resource(baseUrl + '/applications');

            Service = Service.query(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });*/
        };

        var getApplicationInfo = function (params, callback, errorCallback) {
            $http({
                url: baseUrl + '/applications/' + params,
                dataType: 'json',
                method: 'GET',
                data: '',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });

            /*var Service = $resource(baseUrl + '/applications/' + params,{}, {
                'get': {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            });

            Service = Service.get().$promise.then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });*/
        };

        // ----------------- form

        var getApplicationForm = function (params, callback, errorCallback) {
            var Service = $resource(baseUrl + '/applicationForm');

            Service = Service.get().$promise.then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });
        };

        var showPersonalInformation = function (params, callback, errorCallback) {
            var Service = $resource(baseUrl + '/privacyLogs');

            Service = Service.save(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });
        };

        var getZipInformation = function (params, callback) {
            var Service = $resource('https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + params);

            Service = Service.get(params).$promise.then(function (response) {
                _successResponse(response, callback);
            }, _errorResponse);
        };

        var getOccupations = function (params, callback) {
            var Service = $resource(baseUrl + '/occupations');

            return Service = Service.query(params).$promise;
        };

        var getEmployers = function (params, callback) {
            var Service = $resource(baseUrl + '/employers');

            return Service = Service.query(params).$promise;
        };
        
         var saveApplication = function (params, callback, errorCallback) {
             $http({
                url: baseUrl + '/applications/add',
                dataType: 'json',
                method: 'POST',
                data: params,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                _successResponse(response, callback);
            }, function (error) {
                _errorResponse(error, errorCallback);
            });
        };

        // ----------------- used for all
        var _successResponse = function (response, callback) {
            return callback(response);
        };

        var _errorResponse = function (error, errorCallback) {
            console.log('Service error: ', error);
            $rootScope.$emit('alert', 'Sorry, there was a problem with the service, please try again. ');
            if (typeof errorCallback === 'function') {
                errorCallback(error);
            }
        };

        return {
            generateTokens: generateTokens,
            verifyUser: verifyUser,
            signIn: signIn,
            getApplications: getApplications,
            getApplicationInfo: getApplicationInfo,
            showPersonalInformation: showPersonalInformation,
            getZipInformation: getZipInformation,
            getApplicationForm: getApplicationForm,
            getOccupations: getOccupations,
            getEmployers: getEmployers,
            saveApplication: saveApplication
        };
  }]);
