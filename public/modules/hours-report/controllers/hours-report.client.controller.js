'use strict';

angular.module('hoursReport').controller('HoursReportController', ['$scope', 'Authentication', 'Userroleasenumservice',
    function ($scope, Authentication, Userroleasenumservice) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        var appendTasks = function (hoursObj) {
            //console.log(hoursObj)
            var tasks = [];
            for (var yearKey in hoursObj) {
                for (var monthKey in hoursObj[yearKey]) {
                    // console.log(hoursObj[yearKey][monthKey]);
                    for (var taskKey in hoursObj[yearKey][monthKey]) {
                        console.log(hoursObj[yearKey][monthKey][taskKey]);
                        tasks.push(hoursObj[yearKey][monthKey][taskKey]);
                        $scope.totalHours += hoursObj[yearKey][monthKey][taskKey]['timeTaken'];
                    }
                }
            }
            return tasks;
        };

        $scope.totalHours = 0;
        if ($scope.user.iscaData && $scope.user.iscaData.hours)
            $scope.taskList = appendTasks($scope.user.iscaData.hours);
        else
            $scope.taskList = null;
    }
]);
