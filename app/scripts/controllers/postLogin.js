'use strict';
angular.module('angularfireApp')
  .controller('PostLoginCtrl', function($scope, $location, $rootScope, Ref, Auth, User, currentAuth, userSessions)
{
    var auth = Auth.$getAuth();
    $scope.userSessions = userSessions;
    $scope.logout = function(){
      Ref.unauth();
      $rootScope.username = "not logged in"
      toastr.success('Logged out successfully!');
      $location.path('/')
    }
})
