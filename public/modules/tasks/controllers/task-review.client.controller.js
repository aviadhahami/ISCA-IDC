'use strict';

angular.module('tasks').controller('TaskNewController', ['$scope', 'Authentication', 'Userroleasenumservice',
    function($scope, Authentication, Userroleasenumservice) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;
        $scope.task = undefined;

        $scope.takeClicked = function() {};
        $scope.closeClicked = function() {};
    }
]);
