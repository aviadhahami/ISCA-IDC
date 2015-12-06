'use strict';

angular.module('hoursReport').controller('HoursReportTotalController', ['$scope', 'Authentication', 'Userroleasenumservice', 'UsersGetterService',
    function ($scope, Authentication, Userroleasenumservice, UsersGetterService) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        console.log($scope.user)
        $scope.appendTasks = function (hoursObj) {
            var tasks = [];
            for (var year in hoursObj) {
                for (var month in hoursObj[year]) {
                    for (var i = 0; i < hoursObj[year][month].length; i++) {
                        tasks.push(hoursObj[year][month][i]);
                    }
                }
            }
            return tasks;
        }

        var populateUsers = function () {
            UsersGetterService.getUsers()
                .then(function (data) {
                    $scope.users = data.data;
                    console.log(data);
                });
        };
        populateUsers();
    }
]);
