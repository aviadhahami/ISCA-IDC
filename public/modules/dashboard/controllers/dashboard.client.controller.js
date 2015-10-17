'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','Timetoapply',
    function($scope, Authentication,Userroleasenumservice,Users, $http,Timetoapply) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        Timetoapply.getTime().then(function(res){
            console.log(res.data);
            $scope.applicationEndDate=res.data.date;
        });
        $scope.links = [
            {
                'level' : 4,
                'url': '/dashboard/applicationReview',
                'title' : 'Applications'
            },
            {
                'level' : 1,
                'url': '/dashboard/myApplication',
                'title' : 'My application'
            },
            {
                'level' : 0,
                'url': '/',
                'title' : 'Home'
            },
            {
                'level' : 4,
                'url': '/dashboard/rolespanel',
                'title' : 'Roles panel'
            },
            {
                'level' : 4,
                'url': '/dashboard/application-dead-line',
                'title' : 'Edit application deadline'
            },
            {
                'level' : 1,
                'url': '/news',
                'title' : 'News archive'
            }
        ];
    }]);
