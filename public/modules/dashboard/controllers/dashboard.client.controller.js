'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice',
    function($scope, Authentication,Userroleasenumservice) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);
        console.log($scope.userLevel);
        console.log($scope.user);
    }]);
