'use strict';

/**
 * @ngdoc directive
 * @name metLifeApp.directive:pdfTemplate
 * @description
 * # pdfTemplate
 */
angular.module('metLifeApp')
  .directive('pdfTemplate', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the pdfTemplate directive');
      }
    };
  });
