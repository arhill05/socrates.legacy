'use strict'

angular.module('angularfireApp')
  .controller('LoginCtrl', function($rootScope, $scope, Ref, $firebaseArray,
    $timeout, $firebaseAuth, $location, Auth, globalUser) {

    $scope.login = function() {

      var email = $scope.email;
      var password = $scope.password;

      Auth.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        }).then(function(authData) {
          $scope.authData = authData;
          toastr.success('Logged in successfully!');
          $scope.userPath = Ref.child('Users');
          $scope.userPath.orderByChild('uid').equalTo($scope.authData.uid)
            .on("child_added", function(snapshot) {
              $rootScope.username = snapshot.val().email
            })
          $location.path('/postLogin');
        })
        .catch(function(error) {
          console.log(error);
          if (error.code == "INVALID_PASSWORD")
            toastr.error('Oops! Your password appears to be wrong.');
          else {
            toastr.error('Oops! There was an error...' + error)
            console.log('Login Failed!', error)
          }
        })
    }

    $("#username-input").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#login-button").click();
        }
    });

    $("#password-input").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#login-button").click();
        }
    });



    $scope.signUp = function() {
      Auth.$createUser({
          email: $scope.email,
          password: $scope.password,
        },
        function(error, userData) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                toastr.error('Oops! That email is already in use.');
                console.log(
                  "The new user account cannot be created because the email is already in use."
                );
                break;
              case "INVALID_EMAIL":
                toastr.error('Oops! Your email appears to be invalid.');
                console.log("The specified email is not a valid email.");
                break;
              case "INVALID_PASSWORD":

                console.log("The specified email is not a valid email.");
                break;
              default:
                toastr.error(
                  "Oops! Something went wrong. Here's some nerdy info: ",
                  error);
                console.log("Error creating user:", error);
            }
          } else {
            console.log("Successfully created user account with uid:",
              userData.uid);
            Ref.child("Users").push({
              uid: userData.uid,
              email: $scope.email,
              upvotedQuestions: {}
            });
            toastr.success('Successfully created your user account!');
          }

        });
    }
  })
