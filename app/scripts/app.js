'use strict';

/**
 * @ngdoc overview
 * @name angularfireApp
 * @description
 * # angularfireApp
 *
 * Main module of the application.
 */
angular.module('angularfireApp', [
  'ngAnimate',
  'ngRoute',
  'ngTouch',
  'firebase',
  'firebase.ref',
])

.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      var ref = new Firebase("https://burning-heat-1866.firebaseio.com")
      return $firebaseAuth(ref);
    }
  ])
  .factory("User", ["Ref", "Auth", '$firebaseArray', function(Ref, Auth,
    $firebaseArray) {
    var username = "";
    var user = "";
    var userService = {};
    var userPath = Ref.child("Users")
    userService.getUser = function(uid) {
      userPath.orderByChild('uid').equalTo(uid).on("child_added",
        function(snapshot) {
          user = snapshot.key();
        })
      return user;
    }

    userService.getUserSessions = function(uid) {
      var user = userService.getUser(uid);
      var userSessionsPath = Ref.child('Users/' + user + '/userSessions');
      var userSessions = $firebaseArray(userSessionsPath);
      return userSessions;
    }

    userService.getUserSessionsPath = function(uid) {
      var user = userService.getUser(uid);
      var userSessionsPath = Ref.child('Users/' + user + '/userSessions');
      return userSessionsPath;
    }

    userService.getUserQuestions = function(uid) {
      userService.getUser(uid)
      var userQuestionsPath = Ref.child('Users/' + user).child(
        'upvotedQuestions');
      var userQuestions = $firebaseArray(userQuestionsPath);
      return userQuestions;
    }


    return userService;
  }])

.run(function($rootScope, Auth, Ref) {
    var auth = Auth.$getAuth();
    if (auth) {
      var userPath = Ref.child('Users');
      userPath.orderByChild('uid').equalTo(auth.uid)
        .on("child_added", function(snapshot) {
          $rootScope.username = snapshot.val().email
          $rootScope.$apply();
        })
    } else {
      $rootScope.username = "not logged in";
      $rootScope.$apply();
      // var userPath = Ref.child('Users');
      // userPath.orderByChild('uid').equalTo(auth.uid)
      //   .on("child_added", function (snapshot) {
      //     $rootScope.username = snapshot.val().email
      //     $rootScope.$apply();
      //   })
    }

    Auth.$onAuth(function(authData) {
      auth = authData
      $rootScope.$apply()
    })
  })
  .factory("globalUser", function() {
    var username = "not logged in";
    var globalUserService = {};
    globalUserService.changeName = function(newUser) {
      username = newUser;
    }

    globalUserService.name = function() {
      return username;
    }
    return globalUserService;
  })
