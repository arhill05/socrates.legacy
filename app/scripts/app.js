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
  'firebase.ref'
])

.run(function($rootScope, $location, Auth, Ref) {
    var auth = Auth.$getAuth();
    if (auth) {
      var userPath = Ref.child('Users');
      userPath.orderByChild('uid').equalTo(auth.uid)
        .on("child_added", function(snapshot) {
          $rootScope.username = snapshot.val().email;
              $rootScope.$apply();
        });
    } else {
      $rootScope.username = "not logged in";
      $rootScope.$apply();
    }

    Auth.$onAuth(function(authData) {
      auth = authData;
        $rootScope.$apply();
    });

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            event.preventDefault();
            toastr.error("You must be logged in to do that!");
        }
    })
    })
  .factory("globalUser", function() {
    var username = "not logged in";
    var globalUserService = {};
    globalUserService.changeName = function(newUser) {
      username = newUser;
    };
        globalUserService.name = function() {
      return username;
    };
        return globalUserService;
  });
