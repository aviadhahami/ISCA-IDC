'use strict';

angular.module('dashboard').controller('myApplicationController', ['$scope', 'Authentication','Userroleasenumservice',
    function($scope, Authentication,Userroleasenumservice) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        if ($scope.user){
            $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);
            console.log($scope.user);
            console.log($scope.application);

            var bday = new Date($scope.application.birthday);
            var dd = bday.getDate();
            var mm = bday.getMonth()+1; //January is 0!
            var yyyy = bday.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            $scope.formattedBirthday = dd +'/'+ mm +'/'+yyyy;

            // Remove duplicates from arr
            var uniq = function (a) {
                return a.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                })
            };
            $scope.languages =uniq($scope.application.academicInfo.languages.split(','));

        }

    }]);
