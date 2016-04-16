'use strict';

/**
 * @ngdoc overview
 * @name angularfireApp
 * @description
 * # angularfireApp
 *
 * Main module of the application.
 */
angular.module('angularfireApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'firebase',
    'firebase.ref',
  ])
  
      .factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
          var ref = new Firebase("https://burning-heat-1866.firebaseio.com")
            return $firebaseAuth(ref);
        }
    ]);
