'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice', '$http',
    function ($scope, Authentication, Userroleasenumservice, $http) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        console.log($scope.user);
        // Instance for new task object
        $scope.newTask = {
            type: '',
            title: '',
            createdBy: $scope.user._id,
            description: '',
            content: ''
        };

        $scope.taskTypes = [];
        $http.get('/tasks?action=types').then(function (data) {
            $scope.taskTypes = data.data;
        }, function (err) {
            console.log(err);

        });
    }
]);
