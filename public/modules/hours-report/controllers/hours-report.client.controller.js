'use strict';

angular.module('hoursReport').controller('HoursReportController', ['$scope', 'Authentication', 'Userroleasenumservice',
    function ($scope, Authentication, Userroleasenumservice) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        var appendTasks = function (hoursObj) {
            var tasks = [];
            for (var year in hoursObj)
                for (var month in year)
                    for (var task in month)
                        tasks.push(task);
            return tasks;
        }
        if ($scope.user.hasOwnProperty("iscaData") && $scope.user.iscaData.hasOwnProperty("hours"))
            $scope.taskList = appendTasks($scope.user.iscaData.hours);
        else
            $scope.taskList = null;
    }
]);
