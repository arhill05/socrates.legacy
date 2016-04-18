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
    ])
    .run(function($rootScope){
      $rootScope.username = "testing";
    })
    .factory("globalUser", function(){
      var username = "not logged in";
      var globalUserService = {};
      globalUserService.changeName = function(newUser){
        username = newUser;
      }

      globalUserService.name = function(){
        return username;
      }
      return globalUserService;
    })
