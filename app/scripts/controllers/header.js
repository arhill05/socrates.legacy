'use strict';
angular.module('angularfireApp')
  .controller('HeaderCtrl', function($scope, $location, $rootScope)
{
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


})
