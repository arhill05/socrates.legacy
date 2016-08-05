'use strict'

angular.module('angularfireApp')
.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        var ref = new Firebase("https://burning-heat-1866.firebaseio.com");
        return $firebaseAuth(ref);
    }
])