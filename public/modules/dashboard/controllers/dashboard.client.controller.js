'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http',
    function($scope, Authentication,Userroleasenumservice,Users, $http) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        if ($scope.user)
            $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

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
