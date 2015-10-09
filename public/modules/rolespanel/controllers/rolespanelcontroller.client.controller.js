'use strict';

angular.module('rolespanel').controller('rolespanelController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','$location',
    function($scope, Authentication,Userroleasenumservice,Users, $http,$location) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        console.log($scope.user);
        if($scope.userLevel !== 4){
            $location.path('/');
        }

        $scope.searchbox = {
            input : ' '
        };

        $http({
            method : 'get',
            url: '/users/getRecords'
        }).then(function(res){
            console.log(res);
            $scope.recievedUsers = angular.copy(res.data);
        });
        console.log('users', $scope.recievedUsers);
        $scope.roles= {
            0: {
                name:'volunteer',
                code : 1
            },
            1: {
                name:'participant',
                code : 2
            },
            2: {
                name:'manager',
                code : 3
            },
            3: {
                name:'admin',
                code : 4
            }
        };


    }]);
