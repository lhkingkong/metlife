'use strict';

/**
 * @ngdoc function
 * @name metLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metLifeApp
 */
angular.module('metLifeApp')
    .controller('MainFormCtrl', ['$rootScope', '$timeout', '$scope', '$location', '$filter', '$uibModal', 'applicationInfo', 'webServices', function ($rootScope, $timeout, $scope, $location, $filter, $uibModal, applicationInfo, webServices) {
        $scope.loading = true;
        $scope.section = 0;
        $scope.editing = false;
        $scope.showingPersonalInformation = false;
        console.log('applicationInfo', applicationInfo);
        if (applicationInfo) {
            $scope.application = applicationInfo;
            $scope.editing = true;
        } else {
            $scope.application = {};
            $scope.showingPersonalInformation = true;
        }
        $scope.dateOptions = {
            dateDisabled: 'disabled',
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.format = 'dd/MM/yyyy';
        $scope.paymentDeductions = [];
        $scope.additionalBenefits = [];

        $scope.basicBenefitOptions = ['1,000,000', '900,000', '800,000', '500,000'];
        $scope.banks = ['Banamex', 'Bancomer', 'Banorte', 'Scotiabank'];

        webServices.getApplicationForm({}, function (resp) {
            console.log('getApplicationForm', resp);
            $scope.applicationForm = resp;
            $scope.loading = false;
            $scope.section = 1;
        });

        $scope.openAdditionalBenefitModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/addadditionalbenefit.html',
                size: 'lg',
                controller: 'AddAdditionalBenefitCtrl'
            });

            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem)
            }, function () {
                console.log('modal-component dismissed at: ' + new Date());
            });
        };

        $scope.getApplicationFormValues = function (id) {
            if ($scope.applicationForm) {
                return $scope.applicationForm[id];
            } else {
                return [];
            }
        };

        $scope.showPersonalInformation = function (e) {
            e.preventDefault();
            if ($scope.application.applicationId) {
                if (!$scope.showingPersonalInformation) {
                    $rootScope.$on('loadingOn');
                    webServices.showPersonalInformation({
                        cutomerId: $scope.application.customerId,
                        applicationId: $scope.application.applicationId
                    }, function (resp) {
                        $rootScope.$on('loadingOff');
                        console.log(resp);
                        $scope.showingPersonalInformation = !$scope.showingPersonalInformation;
                    }, function () {
                        $rootScope.$on('loadingOff');
                    });
                }

            }
            //$scope.showingPersonalInformation = !$scope.showingPersonalInformation;
        };

        $scope.getOccupations = function (query) {
            return webServices.getOccupations({
                query: query
            });
        };

        $scope.getEmployers = function (query) {
            return webServices.getEmployers({
                query: query
            });
        };
        
        $scope.changeSection = function(e, section){
            e.preventDefault();
            $scope.section = section;
        };

        $scope.updateZipCodeInfo = function (e) {
            console.log('$scope.application.zipCode', $scope.application.zipCode, $scope.application.zipCode.length);
            if (typeof $scope.application.zipCode !== 'undefined' && $scope.application.zipCode.length === 5) {
                webServices.getZipInformation($scope.application.zipCode, function (resp) {
                    resp.colonias.push('-- Otra --');
                    $scope.neighborhoods = resp.colonias;
                    $scope.application.municipality = resp.municipio;
                    $scope.application.city = resp.municipio;
                    $scope.application.state = resp.estado;
                });
            }
        };

        $scope.saveNeighborhood = function () {
            if ($scope.selectedNeighborhood !== '-- Otra --') {
                $scope.application.neighborhood = $scope.selectedNeighborhood;
            }
        };
        
        $scope.changePlan = function(){
            delete $scope.application.additionalBenefits;
            var addBenefits = $scope.getApplicationFormValues('additionalBenefits');
            if (Array.isArray(addBenefits)) {
                $scope.additionalBenefits = addBenefits.filter(function (benefit) {
                    for (var i = 0, len = benefit.plan.length; i < len; i++) {
                        if ($scope.application.plan && benefit.plan[i] === $scope.application.plan.planId) {
                            return true;
                        }
                    }
                    return false;
                });
            }else{
                $scope.additionalBenefits = [];
            }
        };

        $scope.makeJSON = function (string) {
            try {
                return JSON.parse(string);
            } catch (err) {
                return [];
            }
        }

        $scope.calculatePremium = function (value) {
            value += '';
            value = value.replace(/,/g, "");
            value = parseFloat(value, 10) * 0.002;
            return $filter('currency')(value, '$', 2);
        };

        $scope.calculateTotalPremium = function () {
            var total = 0,
                value;
            if ($scope.application.basicBenefit) {
                value = $scope.application.basicBenefit + '';
                value = value.replace(/,/g, "");
                value = parseFloat(value, 10) * 0.002;
                total += value;
            }
            if ($scope.application.additionalBenefits) {
                console.log('sdfsdf',$scope.additionalBenefits);
                for (var i = 0, len = $scope.additionalBenefits.length; i < len; i++) {
                    if ($scope.application.additionalBenefits[$scope.additionalBenefits[i].additionalBenefitId
]) {
                        value = $scope.application.additionalBenefits[$scope.additionalBenefits[i].additionalBenefitId
] + '';
                        value = value.replace(/,/g, "");
                        value = parseFloat(value, 10) * 0.002;
                        total += value;
                    }
                }
            }
            return $filter('currency')(total, '$', 2);
        };

        $scope.addPaymentDeduction = function () {
            if ($scope.paymentType) {
                $scope.paymentDeductions.push({
                    paymentType: $scope.paymentType
                });
                $scope.paymentType = null;
            } else {
                $scope.$broadcast('invalidField', 'paymentType');
            }
        };

        $scope.removePaymentDeduction = function (index) {
            if ($scope.paymentDeductions.length > 1) {
                $scope.paymentDeductions.splice(index, 1);
            }
        };

        $scope.validateForm = function () {
            $scope.section = 1;
            $timeout(function () {
                $scope.$broadcast('invalidField', 'application.name');
            });
        };

        $scope.cancelApplication = function (e) {
            e.preventDefault();
            $location.path('/');
        };

        $scope.submitForm = function () {
            console.log("Submit", $scope.application, $scope.applicationHTMLForm, $scope.paymentDeductions);
            $scope.validateForm();
        };


  }]);
