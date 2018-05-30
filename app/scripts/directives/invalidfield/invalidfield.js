'use strict';

/**
 * @ngdoc directive
 * @name metLifeApp.directive:invalidField
 * @description
 * # invalidField
 */
angular.module('metLifeApp')
  .directive('invalidField', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          scope.$on('invalidField', function(e,fieldId){
              if(fieldId === attrs.invalidField){
                  element.addClass('invalid-field');
                  element.focus();
                  $timeout.cancel(scope.timeoutInvalid);
                  scope.timeoutInvalid = $timeout(function(){
                      element.removeClass('invalid-field');
                  }, 3000);
              }
          })
      }
    };
  }]);
