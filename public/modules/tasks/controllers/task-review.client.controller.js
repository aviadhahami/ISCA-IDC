'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice','task',
    function($scope, Authentication, Userroleasenumservice,task) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        $scope.task = task;


        $scope.stringifyDate = function(date){
            var time = new Date(date);
            var yyyy = time.getFullYear().toString();
            var mm = (time.getMonth()+1).toString();
            var dd = time.getDate().toString();
            return (dd[1]?dd:"0"+dd[0]) +'/' +  (mm[1]?mm:"0"+mm[0]) +'/' + yyyy;
        };

        $scope.takeTask = function() {

        };
        $scope.closeTask = function() {

        };


        console.log(task);


    }
]);
