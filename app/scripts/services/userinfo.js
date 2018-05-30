'use strict';

/**
 * @ngdoc service
 * @name metLifeApp.userInfo
 * @description
 * # userInfo
 * Service in the metLifeApp.
 */
angular.module('metLifeApp')
  .factory('userInfo', function () {
    var set = function(user){
      this.user = user;
    };

    var get = function(){
      return this.user;
    };

    var clean = function(){
      delete this.user;
    };

    // Public API here
    return {
      set: set,
      get: get,
      clean: clean
    };
  });
