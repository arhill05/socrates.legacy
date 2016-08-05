'use strict'

angular.module('angularfireApp')

    .factory("User", ["Ref", "Auth", '$firebaseArray', function (Ref, Auth,
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
        userSessions.$loaded().then(function (x) { console.log("Success", userSessions) })
        .catch(function(error) {console.error("Error", error)});
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