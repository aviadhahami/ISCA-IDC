'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$location','deadlineService',
    function($scope, Authentication,Userroleasenumservice,Users, $location,deadlineService) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        deadlineService.getDeadlineTime().then(function(res){
            // Must move back to string as the directive can't handle obj
            $scope.applicationEndDate= res.toString();
        });
        deadlineService.getDateAsStringObj().then(function(res){
            $scope.applicationEndDateStringsObj = res;
        });
        $scope.openLink = function(link) {
            $location.url(link.url);
        };
        $scope.links = [
            {
                level : 4,
                url: '/dashboard/users',
                title : 'Users',
                icon: 'fa-users'
            },
            {
                level : 2,
                url: '/tasks',
                title : 'Tasks',
                icon: 'fa-list-alt'
            },
            {
                level : 4,
                url: '/dashboard/applicationReview',
                title : 'Applications',
                icon: 'fa-file-o'
            },
            {
                level : 1,
                url: '/dashboard/myApplication',
                title : 'My application',
                icon: 'fa-file-text-o'
            },
            {
                level : 0,
                url: '/',
                title : 'Home',
                icon: 'fa-home'
            },
            {
                level : 4,
                url: '/dashboard/application-dead-line',
                title : 'Edit application deadline',
                icon: 'fa-clock-o'
            },
            {
                'level' : 1,
                'url': '/blogAndMagazine',
                'title' : 'Blog and Magazine',
                icon: 'fa-newspaper-o'
            }
        ];

        // This function handles all arrays in the user's 'iscaData.hours' object
        var sumHours = function (hoursObj) {
            var sum = 0;
            for (var year in hoursObj)
                for (var month in year)
                    for (var task in month)
                        sum += task.timeTaken;
            return sum;
        }
        if ($scope.user.hasOwnProperty("iscaData") && $scope.user.iscaData.hasOwnProperty("hours"))
            $scope.totalHours = sumHours($scope.user.iscaData.hours);
        else
            $scope.totalHours = null;
    }]);
