'use strict';

angular.module('hoursReport').controller('HoursReportTotalController', ['$scope', 'Authentication', 'Userroleasenumservice', 'UsersGetterService',
    function ($scope, Authentication, Userroleasenumservice, UsersGetterService) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        $scope.appendTasks = function (hoursObj) {
            var tasks = [];
            for (var year in hoursObj)
                for (var month in year)
                    for (var task in month)
                        tasks.push(task);
            return tasks;
        }

        var populateUsers = function () {
            UsersGetterService.getUsers()
                .then(function (data) {
                    $scope.users = data.data;
                });
        };
        populateUsers();
    }
]);
