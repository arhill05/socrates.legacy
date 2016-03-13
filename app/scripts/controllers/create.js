angular.module('angularfireApp')
  .controller('CreateCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.sessions = $firebaseArray(Ref.child('sessions').limitToLast(10));
    // display any errors
    $scope.sessions.$loaded().catch(alert);
    $scope.id = "testing456";
    // provide a method for adding a message
    $scope.addSession = function(){
        var session = {
            id: $scope.id,
            questions: {}
        }
        Ref.child("sessions/" + session.id).set(session);
        $location.path('/chat');
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });