'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice',
    function($scope, Authentication,Userroleasenumservice) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

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
            }
        ];
    }]);
