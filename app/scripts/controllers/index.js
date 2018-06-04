'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('IndexCtrl', ['$scope', '$rootScope', '$uibModal', function ($scope, $rootScope, $uibModal) {
        $rootScope.$on('alert', function (e, message) {
            if (message) {
                if(typeof message === 'string'){
                    message = {
                        message: message
                    };
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/simplemodal.html',
                    size: 'md',
                    controller: 'SimpleModalCtrl',
                    resolve: {
                        message: function () {
                            return message;
                        }
                    }
                });
            }
        });
        
        $scope.globalLoading = 0;
        $rootScope.$on('loadingOn', function(){
            $scope.globalLoading++;
        });
        $rootScope.$on('loadingOff', function(){
            $scope.globalLoading--;
            if($scope.globalLoading<0) $scope.globalLoading = 0;
        });
  }]);
