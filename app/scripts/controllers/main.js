'use strict';

/**
 * @ngdoc function
 * @name angularfireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('MainCtrl', function ($scope, Auth, Ref) {

    $scope.anonymousLogin = function () {
      Auth.$authAnonymously().then(function (authData) {
        $scope.randomNames = ['Plato', 'Aristotle', 'Aedesia', 'Atticus', 'Colotes', 'Euphrates', 'Protagoras', 'Pyrrho', 'Thales', 'Xenophilus', 'Theano'];
        $scope.randomColors = ['Blue', 'Red', 'Purple', 'Orange', 'Yellow', 'Green'];
        $scope.authData = authData;
        var randomColor = $scope.randomColors[Math.floor(Math.random() * $scope.randomColors.length)];
        var randomName = $scope.randomNames[Math.floor(Math.random() * $scope.randomNames.length)]
        Ref.child("Users").push({
          uid: authData.uid,
          email: "Anonymous " + randomColor + " " + randomName,
          upvotedQuestions: {}
        });
      })
      .catch(function(error){
        console.log(error)
      })
    };





  });
