'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$location','Timetoapply',
    function($scope, Authentication,Userroleasenumservice,Users, $location,Timetoapply) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        Timetoapply.getTime().then(function(res){
            $scope.applicationEndDate=res.data.date;
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
