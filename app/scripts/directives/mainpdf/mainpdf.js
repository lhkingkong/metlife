'use strict';

/**
 * @ngdoc directive
 * @name metLifeApp.directive:mainPdf
 * @description
 * # mainPdf
 */
angular.module('metLifeApp')
    .directive('mainPdf', function () {
        return {
            templateUrl: 'views/mainpdf.html',
            restrict: 'E',
            scope:{
                application:'=?',
                paymentDeductions:'=?',
                calculateTotalPremium: '=?',
                calculateBasicPremium: '=?'
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
            }
        };
    });