'use strict';
angular.module('angularfireApp')
  .controller('PostLoginCtrl', function($scope, $location, $rootScope, $timeout,
    $firebaseArray, Ref, Auth, User, currentAuth) {
    var auth = currentAuth;
    $scope.hideSessions = false;
    $timeout(function() {
      var userSessions = User.getUserSessions(auth.uid);
      $scope.userSessions = userSessions;
      $scope.hideSessions = true;
    }, 500)



    // userSessions.$loaded().then(function(data) {
    //     $scope.userSessions = data;
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   });


    // userSessions.$loaded().then(function(userSessions) {
    //   $scope.userSessions = userSessions;
    // }).catch(function(error) {
    //   console.log(error)
    // })

    $scope.logout = function() {
      Ref.unauth();
      $rootScope.username = "not logged in"
      toastr.success('Logged out successfully!');
      $location.path('/')
    }
  })
