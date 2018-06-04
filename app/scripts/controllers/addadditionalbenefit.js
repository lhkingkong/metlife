'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:AddAdditionalBenefitCtrl
 * @description
 * # AddAdditionalBenefitCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('AddAdditionalBenefitCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
        $scope.benefitTypes = [
            {
                label: 'options'
            }
        ];

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.createAdditionalBenefit = function () {
            $uibModalInstance.close($scope.benefit);
        };
  }]);
