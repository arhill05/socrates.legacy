'use strict';
angular.module('angularfireApp')
    .controller('HeaderCtrl', function ($scope, $location, $rootScope, globalUser, Auth, Ref) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.auth = Auth;
        $scope.authData = $scope.auth.$getAuth();
        
        $scope.auth.$onAuth(function(authData){
            $scope.authData = authData;
        })

    });
