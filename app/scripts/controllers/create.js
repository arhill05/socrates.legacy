angular.module('angularfireApp')
  .controller('CreateCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location) {
    // get sessions, limit to last 10
    $scope.sessions = $firebaseArray(Ref.child('sessions').limitToLast(10));

    // display any errors
    $scope.sessions.$loaded().catch(alert);
    $scope.id = "";
    
    // provide a method for adding a session
    $scope.addSession = function(){
        var session = {
            id: $scope.id,
            questions: {}
        }
        Ref.child("sessions/" + session.id).set(session);
        $location.path('/sessions/' + session.id);
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
