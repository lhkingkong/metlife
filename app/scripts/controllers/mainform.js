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
            $scope.application.emailConfirm = $scope.application.email;
            $scope.application.birthDate = Date.parse($scope.application.birthDate);
            $scope.editing = true;
            $scope.planEditing = true;
        } else {
            $scope.application = {};
            $scope.showingPersonalInformation = true;
            $scope.application.birthDate = new Date('2018/10/05');
        }
        $scope.datePickerOptions = {
            datepickerMode: 'year'
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

        $scope.openAdditionalBenefitModal = function (e) {
            e.preventDefault();
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
            /*if ($scope.application.applicationId) {
                if (!$scope.showingPersonalInformation) {
                    $rootScope.$emit('loadingOn');
                    webServices.showPersonalInformation({
                        cutomerId: $scope.application.customerId,
                        applicationId: $scope.application.applicationId
                    }, function (resp) {
                        $rootScope.$emit('loadingOff');
                        console.log(resp);
                        $scope.showingPersonalInformation = !$scope.showingPersonalInformation;
                    }, function () {
                        $rootScope.$on('loadingOff');
                    });
                }

            }*/
            $scope.showingPersonalInformation = !$scope.showingPersonalInformation;
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

        $scope.changeSection = function (e, section) {
            e.preventDefault();
            $scope.section = section;
        };

        $scope.updateZipCodeInfo = function (e) {
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

        $scope.changePlan = function () {
            if ($scope.planEditing) {
                $scope.planEditing = false;
            } else {
                //delete $scope.application.additionalBenefits;
            }
            var addBenefits = $scope.getApplicationFormValues('additionalBenefits');
            if (Array.isArray(addBenefits)) {
                $scope.application.additionalBenefitsJsonKv = addBenefits.filter(function (benefit) {
                    for (var i = 0, len = benefit.plan.length; i < len; i++) {
                        if ($scope.application.plan && benefit.plan[i] === $scope.application.plan.planId) {
                            return true;
                        }
                    }
                    return false;
                });
            } else {
                $scope.application.additionalBenefitsJsonKv = [];
            }
        };

        $scope.makeJSON = function (str) {
            try {
                str += '';
                str = '[' + str.replace(/[{}]/g, '').replace(/[[\]]/g, '') + ']';
                return JSON.parse(str);
            } catch (err) {
                return [];
            }
        }

        $scope.calculateBasicPremium = function (value) {
            value += '';
            value = value.replace(/,/g, "");
            value = parseFloat(value, 10) * 0.002;
            return $filter('currency')(value, '$', 2);
        };

        $scope.calculatePremium = function (benefit) {
            var value = benefit.benefitAmmount + '';
            value = value.replace(/,/g, "");
            if (isNaN(benefit.formula)) {
                value = parseFloat(value, 10) * 0.002;
            } else {
                value = parseFloat(value, 10) * benefit.formula;
            }
            if (!isNaN(value)) {
                benefit.benefitPremium = value;
            }
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
            if ($scope.application.additionalBenefitsJsonKv) {
                for (var i = 0, len = $scope.application.additionalBenefitsJsonKv.length; i < len; i++) {
                    if ($scope.application.additionalBenefitsJsonKv[i].benefitPremium) {
                        if (!isNaN($scope.application.additionalBenefitsJsonKv[i].benefitPremium)) {
                            total += $scope.application.additionalBenefitsJsonKv[i].benefitPremium;
                        }

                    }
                }
            }
            return $filter('currency')(total, '$', 2);
        };

        $scope.addPaymentDeduction = function (e) {
            e.preventDefault();
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

        $scope.test = function () {
            console.log("Test", $scope.application, $scope.applicationHTMLForm, $scope.paymentDeductions);
        };

        $scope.cancelApplication = function (e) {
            e.preventDefault();
            $location.path('/');
        };

        $scope.submitForm = function (e, isDraft) {
            e.preventDefault();
            $scope.toBeSaved = angular.copy($scope.application);

            $scope.validateForm();
            if ($scope.toBeSaved.occupation) {
                $scope.toBeSaved.occupation = {
                    occupationId: $scope.toBeSaved.occupation.occupationId
                };
            }
            if ($scope.toBeSaved.additionalBenefitsJsonKv) {
                $scope.toBeSaved.additionalBenefitsJsonKv = JSON.stringify($scope.toBeSaved.additionalBenefitsJsonKv);
            }
            if ($scope.toBeSaved.plan) {
                $scope.toBeSaved.plan = $scope.toBeSaved.plan.planId;
            }
            if (isDraft) {
                $scope.toBeSaved.applicationStatus = 'DRAFT';
            } else {
                $scope.toBeSaved.applicationStatus = 'REGISTERED';
            }

            var dd = $scope.toBeSaved.birthDate.getDate();
            var mm = $scope.toBeSaved.birthDate.getMonth() + 1; //January is 0!
            var yyyy = $scope.toBeSaved.birthDate.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            $scope.toBeSaved.birthDate = yyyy + '/' + mm + '/' + dd;

            if ($scope.paymentDeductions.length > 0) {
                $scope.toBeSaved.billingInformations = angular.copy($scope.paymentDeductions);
                for (var i = 0, len = $scope.toBeSaved.billingInformations.length; i < len; i++) {
                    $scope.toBeSaved.billingInformations[i].employer = {
                        employerId: $scope.toBeSaved.billingInformations[i].employer.employerId
                    };
                }
            }

            console.log("Submit", $scope.toBeSaved, $scope.applicationHTMLForm, $scope.paymentDeductions);
            webServices.saveApplication($scope.toBeSaved, function (resp) {
                console.log(resp);
            }, function (error) {
                console.log(error);
            })
        };


  }]);
