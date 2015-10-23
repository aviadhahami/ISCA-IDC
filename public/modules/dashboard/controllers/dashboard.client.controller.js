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
            }
        ];
    }]);
