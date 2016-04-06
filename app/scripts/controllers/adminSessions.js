'use strict';
/**
 * @ngdoc function
 * @name angularfireApp.controller:AdminSessionsCtrl
 * @description
 * # AdminSessionsCtrl
 * Display ALL sessions to admin
 */
angular.module('angularfireApp')
  .controller('AdminSessionsCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // get sessions, but only get the last 10
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
