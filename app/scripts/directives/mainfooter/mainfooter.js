'use strict';

/**
 * @ngdoc directive
 * @name metLifeApp.directive:mainFooter
 * @description
 * # mainFooter
 */
angular.module('metLifeApp')
    .directive('mainFooter', function () {
        return {
            templateUrl: 'views/mainfooter.html',
            replace: true,
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
