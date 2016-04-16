angular.module('angularfireApp')
    .controller('LoginCtrl', function ($scope, Ref, $firebaseArray, $timeout, $firebaseAuth, Auth) {
        
        function authHandler(error, authData) {
            if (error) {
                if (error.code = "INVALID_PASSWORD")
                     toastr.error('Oops! Your password appears to be wrong.');
                else
                     console.log('Login Failed!', error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }

        $scope.login = function () {

            var email = $scope.email;
            var password = $scope.password;

            Auth.$authWithPassword({
                email: $scope.email,
                password: $scope.password
            }).then(function(authData) {
                $scope.authData = authData;
                console.log("Successfully logged in with payload:", $scope.authData);
            }).catch(function(error) {
                console.log(error)});
            
        };

        $scope.signUp = function () {
            Auth.$createUser({
                email: $scope.email,
                password: $scope.password,
            },
                function (error, userData) {
                    if (error) {
                        switch (error.code) {
                            case "EMAIL_TAKEN":
                                toastr.error('Oops! That email is already in use.');
                                console.log("The new user account cannot be created because the email is already in use.");
                                break;
                            case "INVALID_EMAIL":
                                toastr.error('Oops! Your email appears to be invalid.');
                                console.log("The specified email is not a valid email.");
                                break;
                            case "INVALID_PASSWORD":
                               
                                console.log("The specified email is not a valid email.");
                                break;
                            default:
                                toastr.error("Oops! Something went wrong. Here's some nerdy info: ", error);
                                console.log("Error creating user:", error);
                        }
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                        Ref.child("Users").push({
                            uid: userData.uid,
                            email: $scope.email,
                            upvotedQuestions: {}
                        });
                        toastr.success('Successfully created your user account!');
                    }

                });
        }
    });