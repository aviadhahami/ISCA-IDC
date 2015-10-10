'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http',
    function($scope, Authentication,Userroleasenumservice,Users, $http) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        $scope.links = [
            {
                'level' : 1,
                'url': '/dashboard/applicationReview',
                'title' : 'Applications'
            },
            {
                'level' : 1,
                'url': '/dashboard/myApplication',
                'title' : 'My application'
            },
            {
                'level' : 1,
                'url': '/',
                'title' : 'Home'
            },
            {
                'level' : 4,
                'url': '/dashboard/rolespanel',
                'title' : 'Roles panel'
            }
        ];
    }]);
