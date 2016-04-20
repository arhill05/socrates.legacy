'use strict';
angular.module('angularfireApp')
  .controller('PostLoginCtrl', function($scope, $location, $rootScope, Ref)
{
    $scope.logout = function(){
      Ref.unauth();
      toastr.success('Logged out successfully!');
      $location.path('/')
    }
})
