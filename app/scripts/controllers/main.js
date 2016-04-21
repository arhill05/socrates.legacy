'use strict';

/**
 * @ngdoc function
 * @name angularfireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, Auth, Ref) {
    
    $scope.auth = Auth.$getAuth();

    $scope.anonymousLogin = function () {
      Auth.$authAnonymously().then(function (authData) {
        $scope.randomNames = ['Plato', 'Aristotle', 'Aedesia', 'Atticus', 'Colotes', 'Euphrates', 'Protagoras', 'Pyrrho', 'Thales', 'Xenophilus', 'Theano'];
        $scope.randomColors = ['Blue', 'Red', 'Purple', 'Orange', 'Yellow', 'Green'];
        $scope.authData = authData;
        var randomColor = $scope.randomColors[Math.floor(Math.random() * $scope.randomColors.length)];
        var randomName = $scope.randomNames[Math.floor(Math.random() * $scope.randomNames.length)]
        var email = "Anonymous " + randomColor + " " + randomName;
        Ref.child("Users").push({
          uid: authData.uid,
          email: email,
          upvotedQuestions: {},
          anonymous: true
        });
        $rootScope.username = email;
        $location.path('/sessions');
      })
      .catch(function(error){
        console.log(error)
      })
    };





  });
