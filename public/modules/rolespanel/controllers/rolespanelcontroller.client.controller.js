'use strict';

angular.module('rolespanel').controller('rolespanelController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','$location',
    function($scope, Authentication,Userroleasenumservice,Users, $http,$location) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        console.log($scope.user);

        // Navigate user out if not authorized
        if($scope.userLevel !== 4){
            $location.path('/');
        }
        $scope.data = {
        };

        $scope.$watch('data',function(oldVal,newVal){
            console.log($scope.data);
        },true);
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

        $scope.roles= {
            0: {
                name:'volunteer'
            },
            1: {
                name:'participant'

            },
            2: {
                name:'manager'
            },
            3: {
                name:'admin'
            }
        };
    }]);
