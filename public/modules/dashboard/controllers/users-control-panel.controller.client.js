'use strict';
angular.module('dashboard').controller('userControlPanelController', ['$scope', 'Authentication','Users','Userroleasenumservice',
        function($scope, Authentication, Users,Userroleasenumservice) {

            // Remove duplicates from language array
            var uniq = function (a) {
                return a.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                })
            };
            var APPLICATION_TABLE = 0,
                APPLICATION_VIEW  = 1;
            $scope.selectedTab = APPLICATION_TABLE;
            $scope.selectedUser = undefined;

            $scope.displayApplication = function(user) {
                $scope.selectedTab = APPLICATION_VIEW;
                $scope.selectedUser = user;
                var bday = new Date(user.iscaData.applicationForm.form.birthday);
                $scope.selectedUser.birthday = bday.getDate() + '/' + (bday.getMonth() + 1) + '/' + bday.getFullYear();
                bday = undefined;
                $scope.selectedUser.languages = uniq(user.iscaData.applicationForm.form.academicInfo.languages.split(','));
                console.log($scope.selectedUser);

            };

            $scope.backToTable = function() {
                $scope.selectedTab = APPLICATION_TABLE;
                $scope.selectedUser = undefined;
            };


            // TODO: delete user function
        }
    ]
);
