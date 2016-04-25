'use strict';

/**
 * @ngdoc function
 * @name angularfireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('MainCtrl', function($scope, $rootScope, $location,
    $firebaseArray, Auth, Ref) {

    $scope.$on('$locationChangeStart', function() {
      $('#pinModal').modal('hide');
    })
    $scope.auth = Auth.$getAuth();
    $scope.sessionsRef = Ref.child('sessions');
    $scope.sessions = $firebaseArray($scope.sessionsRef);
    $scope.enteredPIN = "";

    $scope.joinSession = function() {
      $scope.sessionsRef.orderByChild("pinNumber").equalTo($scope.enteredPIN)
        .on("child_added", function(snapshot) {
          var session = snapshot.val().id;
          if (snapshot.exists()) {
            console.log("Found", session);
            $scope.session = session;
            $('#pinModal').modal('hide');
            $location.path('/sessions/' + session)


          } else {
            console.warn("Not found");
          }


        })
    }


    $scope.anonymousLogin = function() {
      Auth.$authAnonymously().then(function(authData) {
          $scope.randomNames = ['Plato', 'Aristotle', 'Aedesia',
            'Atticus', 'Colotes', 'Euphrates', 'Protagoras', 'Pyrrho',
            'Thales', 'Xenophilus', 'Theano'
          ];
          $scope.randomColors = ['Blue', 'Red', 'Purple', 'Orange',
            'Yellow', 'Green'
          ];
          $scope.authData = authData;
          var randomColor = $scope.randomColors[Math.floor(Math.random() *
            $scope.randomColors.length)];
          var randomName = $scope.randomNames[Math.floor(Math.random() *
            $scope.randomNames.length)]
          var email = "Anonymous " + randomColor + " " + randomName;
          Ref.child("Users").push({
            uid: authData.uid,
            email: email,
            upvotedQuestions: {},
            anonymous: true
          });
          $rootScope.username = email;
        })
        .catch(function(error) {
          console.log(error)
        })
    };



  });
