'use strict';

angular.module('rolespanel').controller('rolespanelController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','$location',
    function($scope, Authentication,Userroleasenumservice,Users, $http,$location) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        console.log($scope.user);
        if($scope.userLevel !== 4){
            $location.path('/');
        }


    }]);
