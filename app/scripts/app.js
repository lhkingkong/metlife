'use strict';

/**
 * @ngdoc overview
 * @name metLifeApp
 * @description
 * # metLifeApp
 *
 * Main module of the application.
 */
angular
    .module('metLifeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'htmlToPdfSave'
  ])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                resolve: {
                    user: ['webServices', '$q', '$location', '$resource', 'userInfo', function (webServices, $q, $location, $resource, userInfo) {
                        var dfd = $q.defer();
                        var user = userInfo.get();
                        if (!user) {
                            /*webServices.verifyUser({}, function (response) {
                              if (!response.user) {
                                $location.path('/login');
                                dfd.reject('Not logged');
                              } else {*/
                            userInfo.set({
                                name: 'testuser'
                            });
                            dfd.resolve();
                            /*    }
                              });*/
                        } else {
                            dfd.resolve();
                        }
                        return dfd.promise;
          }]
                }
            })
            .when('/form/:appId?', {
                templateUrl: 'views/mainform.html',
                controller: 'MainFormCtrl',
                controllerAs: 'mainform',
                resolve: {
                    user: ['webServices', '$q', '$location', '$resource', 'userInfo', function (webServices, $q, $location, $resource, userInfo) {
                        /*var dfd = $q.defer();
                        var user = userInfo.get();
                        if (!user) {
                            webServices.verifyUser({}, function (response) {
                                if (!response.user) {
                                    $location.path('/login');
                                    dfd.reject('Not logged');
                                } else {
                                    userInfo.set({
                                        name: 'testuser'
                                    });
                                    dfd.resolve();
                                }
                            });
                        } else {
                            dfd.resolve();
                        }
                        return dfd.promise;*/
                        return true;
                    }],
                    applicationInfo: ['webServices', '$q', '$location', '$resource', '$route', function (webServices, $q, $location, $resource, $route) {
                        var dfd = $q.defer();

                        if ($route.current.params.appId) {
                            
                          webServices.getApplicationInfo($route.current.params.appId, function (response) {
                              console.log(response);
                              dfd.resolve(response);
                          });
                        } else {
                          dfd.resolve(false);
                        }
                        return dfd.promise;
                    }]
                }
            })
            /*.when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                resolve: {
                    user: ['webServices', '$q', '$location', '$resource', 'userInfo', function (webServices, $q, $location, $resource, userInfo) {
                        var dfd = $q.defer();
                        var user = userInfo.get();
                        if (!user) {
                            webServices.verifyUser({}, function (response) {
                                if (!response.user) {
                                    $location.path('/login');
                                    dfd.reject('Not logged');
                                } else {
                                    dfd.resolve();
                                }
                            });
                        } else {
                            dfd.resolve();
                        }
                        return dfd.promise;
                    }]
                }
            })*/
            .otherwise({
                redirectTo: '/login'
            });
  }]);
