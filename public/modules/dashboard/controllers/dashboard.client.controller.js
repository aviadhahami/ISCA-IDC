'use strict';

angular.module('dashboard').controller('dashboardController', ['$scope', 'Authentication','Userroleasenumservice','Users','$location','Timetoapply',
    function($scope, Authentication,Userroleasenumservice,Users, $location,Timetoapply) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        Timetoapply.getTime().then(function(res){
            //console.log(res.data);
            var time = res.data.date;
            $scope.applicationEndDate=time;
            var time = new Date(time);
            $scope.endDateAsString = {
                hours : time.getHours(),
                dayInMonth : time.getDate(),
                month : monthNames[time.getMonth()]
            }
            console.log($scope.endDateAsString);
        });


        $scope.openLink = function(link) {
            $location.url(link.url);
        };

        $scope.links = [
            {
                level : 4,
                url: '/dashboard/users',
                title : 'Users',
                icon: 'fa-users'
            },
            {
                level : 4,
                url: '/dashboard/applicationReview',
                title : 'Applications',
                icon: 'fa-file-o'
            },
            {
                level : 1,
                url: '/dashboard/myApplication',
                title : 'My application',
                icon: 'fa-file-text-o'
            },
            {
                level : 0,
                url: '/',
                title : 'Home',
                icon: 'fa-home'
            },
            {
                level : 4,
                url: '/dashboard/application-dead-line',
                title : 'Edit application deadline',
                icon: 'fa-clock-o'
            }
        ];
    }]);
