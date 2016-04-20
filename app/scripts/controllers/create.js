'use strict';
angular.module('angularfireApp')
  .controller('CreateCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location, Auth) {
    // get sessions, limit to last 10
    $scope.sessions = $firebaseArray(Ref.child('sessions').limitToLast(10));

      
    $scope.sessions.$loaded().catch(alert);
    $scope.id = "";
    var authData = Auth.$getAuth();
     $scope.userPath.orderByChild('uid').equalTo($scope.auth.uid).on("child_added", function (snapshot) {
            $scope.user = snapshot.key();
            $scope.username = snapshot.val().email;
            var userSessionsPath = Ref.child('Users/' + $scope.user).child('userSessions');
     })
    
    
    // provide a method for adding a session
    $scope.addSession = function(){
        var session = {
            id: $scope.id,
            questions: {},
            pinNumber: Math.floor(1000 + Math.random() * 9000),
            adminUser: ""
            
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
