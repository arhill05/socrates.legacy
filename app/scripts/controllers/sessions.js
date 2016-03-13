'use strict';
/**
 * @ngdoc function
 * @name angularfireApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('angularfireApp')
  .controller('SessionsCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.sessions = $firebaseArray(Ref.child('sessions').limitToLast(10));

    // display any errors
    $scope.sessions.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
  
//   angular.module('socratesApp')
//     .controller('MainCtrl', function($scope, $firebaseObject) {
//         var urlsuffix = "";
//         var ref = new Firebase("https://burning-heat-1866.firebaseio.com/sessions/");
//         var ref2 = new Firebase("http://burning-heat-1866.firebaseio.com/sessions/" + )
//         $scope.sessions = $firebaseArray(ref);
//         $scope.questions = $firebaseArray(ref2);
//             
//             
//             
//             
//             
//             
//         });

