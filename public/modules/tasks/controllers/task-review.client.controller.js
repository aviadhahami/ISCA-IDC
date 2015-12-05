'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice','task',
    function($scope, Authentication, Userroleasenumservice,task) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        $scope.task = task;
        console.log(task);
        $scope.takeClicked = function() {};
        $scope.closeClicked = function() {};



    }
]);
