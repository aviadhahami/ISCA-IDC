'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users',
    function($scope, Authentication,Userroleasenumservice,Users) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);
        console.log($scope.userLevel);
        $scope.user.roles = 'admin';
        console.log($scope.user);
        Users.update($scope.user);


        $scope.links = [
            {
                'url': '/dashboard/applicationReview',
                'title' : 'Applications'
            },
            {
                'url': '/',
                'title' : 'Home'
            }
        ];


    }]);
