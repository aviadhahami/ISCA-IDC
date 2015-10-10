'use strict';

angular.module('dashboard').controller('myApplicationController', ['$scope', 'Authentication','Userroleasenumservice',
    function($scope, Authentication,Userroleasenumservice) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        if ($scope.user)
            $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);
        console.log($scope.user);
        console.log($scope.application);
    }]);
