'use strict';
angular.module('angularfireApp')
  .controller('HeaderCtrl', function($scope, $location, $rootScope, globalUser)
{
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
