'use strict';

/**
 * @ngdoc directive
 * @name metLifeApp.directive:mainHeader
 * @description
 * # mainHeader
 */
angular.module('metLifeApp')
  .directive('mainHeader', function () {
    return {
      templateUrl: './scripts/directives/mainheader/mainheader.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
