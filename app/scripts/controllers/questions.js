angular.module('angularfireApp')
  .controller('QuestionsCtrl', function ($scope, Ref, $firebaseArray, $timeout, $routeParams) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.questions = $firebaseArray(Ref.child('sessions/' + $routeParams.sessionID + '/Questions'));  
    // display any errors
   
    //$scope.questions = $scope.sessions.child($routeParams.sessionID).child('questions');
    $scope.questions.$loaded().catch(alert);
    // provide a method for adding a message
    $scope.addQuestion = function(){
        var question = {
            text: $scope.text,
            upvotes: 0
        }
        $scope.questions.$add(question);
        //Ref.child("sessions/" + session.id).set(session);
    }
    
    $scope.upvoteQuestion = function(question){
        //var questionToUpvote = $scope.questions.$getRecord(question.$key)
        question.upvotes = question.upvotes + 1;
        $scope.questions.$save(question);
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });