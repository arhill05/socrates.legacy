angular.module('angularfireApp')
  .controller('AdminQuestionsCtrl', function ($scope, Ref, $firebaseArray, $timeout, $routeParams) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.questions = $firebaseArray(Ref.child('sessions/' + $routeParams.sessionID + '/Questions'));  
    // display any errors
   
    //$scope.questions = $scope.sessions.child($routeParams.sessionID).child('questions');
    $scope.questions.$loaded().catch(alert);
    // provide a method for adding a message
    $scope.addQuestion = function(){
        var question = {
            text: $scope.text,
            upvotes: 0,
            disabled: false
        }
        $scope.questions.$add(question);
        $scope.text = "";
        //Ref.child("sessions/" + session.id).set(session);
    }
    
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