angular.module('angularfireApp')
    .controller('QuestionsCtrl', function($scope, Ref, $firebaseArray, $timeout, $routeParams) {
        // synchronize a read-only, synchronized array of messages, limit to most recent 10
        $scope.questions = $firebaseArray(Ref.child('sessions/' + $routeParams.sessionID + '/Questions'));
        // display any errors
        $scope.questions.$loaded().catch(alert);

        // provide a method for adding a question
        $scope.addQuestion = function() {
            var question = {
                text: $scope.text,
                upvotes: 0,
                disabled: false
            }
            $scope.questions.$add(question);
            $scope.text = "";
        }

        // provide method for upvoting questions
        $scope.upvoteQuestion = function(question) {
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

          // Generate a unique QR code for this session
           $scope.callQR = function (){ var url = document.URL;
            var url = encodeURIComponent($routeParams.sessionID);
            var fullUrl = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://www.socratesapp.co/%23/sessions/"+ url;
            $("#QR").attr("src", fullUrl);
          }           

        function alert(msg) {
            $scope.err = msg;
            $timeout(function() {
                $scope.err = null;
            }, 5000);
        }
    });
