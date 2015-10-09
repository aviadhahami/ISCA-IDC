'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http',
    function($scope, Authentication,Userroleasenumservice,Users, $http) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        if ($scope.user)
            $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);



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
