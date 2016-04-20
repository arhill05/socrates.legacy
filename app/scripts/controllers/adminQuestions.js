'use strict';
angular.module('angularfireApp')
  .controller('AdminQuestionsCtrl', function ($scope, Ref, $firebaseArray, $timeout, $routeParams) {
    // Get questions from current session
    $scope.questions = $firebaseArray(Ref.child('sessions/' + $routeParams.sessionID + '/Questions'));
    Ref.child('sessions').orderByKey().equalTo($routeParams.sessionID).on("child_added", function (snapshot) {
        $scope.currentSession = snapshot.val();
        $scope.pinNumber = $scope.currentSession.pinNumber;
    })
    
    // display any errors
    $scope.questions.$loaded().catch(alert);

    // provide a method for adding a question
    $scope.addQuestion = function(){
        var question = {
            text: $scope.text,
            upvotes: 0,
            disabled: false
        }
        $scope.questions.$add(question);
        $scope.text = "";
    }

    // provide a method for upvoting a question. Disable the question after
    // being clicked (client side only at the moment)
    $scope.upvoteQuestion = function(question){
        //var questionToUpvote = $scope.questions.$getRecord(question.$key)
        var key = $scope.questions.$indexFor(question.$id)
        $scope.questions[key].disabled = true;
        question.upvotes = question.upvotes + 1;
        $scope.questions.$save(question);
        this.disabled = true;
        $('#' + question.$id).css("pointer-events", "none");
        $('#' + question.$id).css("color", "blue");
        $('#' + question.$id).css("font-weight", "bolder");


    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
