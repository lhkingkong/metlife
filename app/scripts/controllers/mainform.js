'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('MainFormCtrl', ['$timeout', '$scope', '$location', 'applicationInfo', 'webServices', function ($timeout, $scope, $location, applicationInfo, webServices) {
        $scope.section = 1;
        console.log(applicationInfo, 'applicationInfo');
        $scope.editing = false;
        if (applicationInfo) {
            $scope.application = applicationInfo;
            $scope.editing = true;
        } else {
            $scope.application = {};
        }
        $scope.dateOptions = {
            dateDisabled: 'disabled',
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.format = 'dd/MM/yyyy';

        $scope.additionalBenefits = [
            {
                id: 1,
                label: 'Accidental Death',
                type: 'int',
                code: 'CMA'
          },
            {
                id: 2,
                label: 'Triple Accidental Death',
                type: 'options',
                code: 'TAD',
                options: ['$ 900,000.00', '$ 800,000.00', '$ 700,000.00']
          }
      ];

        $scope.updateZipCodeInfo = function (e) {
            console.log('$scope.application.zipCode', $scope.application.zipCode, $scope.application.zipCode.length);
            if (typeof $scope.application.zipCode !== 'undefined' && $scope.application.zipCode.length === 5) {
                webServices.getZipInformation($scope.application.zipCode, function (resp) {
                    console.log('POBox', resp);
                    resp.colonias.push('-- Otra --');
                    $scope.neighborhoods = resp.colonias;
                    $scope.application.municipality = resp.municipio;
                    $scope.application.state = resp.estado;
                });
            }
        }

        $scope.saveNeighborhood = function () {
            if($scope.selectedNeighborhood !== '-- Otra --'){
                $scope.application.neighborhood = $scope.selectedNeighborhood;
            }
        };

        $scope.cancelApplication = function (e) {
            e.preventDefault();
            $location.path('/');
        };

        $scope.submitForm = function () {
            console.log("Submit", $scope.application);
            $scope.section = 1;
            $timeout(function () {
                $scope.$broadcast('invalidField', 'application.name');
            });
        };


  }]);
