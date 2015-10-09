'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http',
    function($scope, Authentication,Userroleasenumservice,Users, $http) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
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

        //$http({
        //    method : 'post',
        //    url : 'users/updateRole',
        //    data : {
        //        idToPromote : '55e73ce69e0de4d82619fda6',
        //        requestedRole : 'manager'
        //    }
        //}).then(function(data){
        //    console.log(data);
        //});

    }]);
