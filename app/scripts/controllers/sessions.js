'use strict';
/**
 * @ngdoc function
 * @name angularfireApp.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Get Sessions
 */
angular.module('angularfireApp')
  .controller('SessionsCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // get sessions, limit to last 10
      $scope.sessions = $firebaseArray(Ref.child('sessions').limitToLast(10));

    // display any errors
    $scope.sessions.$loaded().catch(alert);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
