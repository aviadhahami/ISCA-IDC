'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        console.log($scope.user);
    }]);
