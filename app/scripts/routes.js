'use strict';
/**
 * @ngdoc overview
 * @name angularfireApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('angularfireApp')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
    })
    .when('/sessions/:sessionID', {
      templateUrl: 'views/questions.html',
      controller: 'QuestionsCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    })
    .when('/sessions', {
      templateUrl: 'views/sessions.html',
      controller: 'SessionsCtrl'
    })
    .when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    })
    .when('/admin/sessions', {
      templateUrl: 'views/adminSessions.html',
      controller: 'AdminSessionsCtrl'
    })
    .when('/admin/sessions/:sessionID', {
      templateUrl: 'views/adminQuestions.html',
      controller: 'AdminQuestionsCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/postLogin', {
      templateUrl: 'views/postLogin.html',
      controller: 'PostLoginCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForAuth();
        }],
        "userSessions": ["User", "Auth", function(User, Auth) {
          var auth = Auth.$getAuth();
          var userSessions = User.getUserSessions(auth.uid);
          return userSessions;
        }],
      }
    })

  .otherwise({
    redirectTo: '/'
  });

}]);
