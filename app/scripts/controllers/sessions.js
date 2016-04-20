'use strict';
/**
 * @ngdoc function
 * @name angularfireApp.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Get Sessions
 */
angular.module('angularfireApp')
  .controller('SessionsCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location) {
    // get sessions, limit to last 10
    $scope.sessionsRef = Ref.child('sessions');
    $scope.sessions = $firebaseArray($scope.sessionsRef);

    // display any errors
    $scope.sessions.$loaded().catch(alert);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    };

    $scope.joinSession = function () {
       $scope.sessionsRef.orderByChild("pinNumber").equalTo($scope.enteredPIN).on("child_added", function(snapshot){
         var session = snapshot.val().id;
         if(snapshot.exists()){
           console.log("Found", session);
           $scope.session = session;
           $location.path('/sessions/' + session)
         }
         else{console.warn("Not found");}
          
          
       })
    }
  });
