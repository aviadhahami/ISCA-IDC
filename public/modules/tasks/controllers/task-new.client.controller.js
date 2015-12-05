'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice', '$http',
    function ($scope, Authentication, Userroleasenumservice, $http) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        // Instance for new task object
        $scope.newTask = {
            type: '',
            title: '',
            createdBy: $scope.user._id,
            description: '',
            content: ''
        };

        $scope.createNewTask = function () {
            console.log($scope.newTask);
            $http({
                method: 'POST',
                url: '/tasks',
                data: $scope.newTask
            }).then(function (data) {
                // worked
            }, function (err) {
                // err
            });
        };

    }
]);
