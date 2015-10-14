'use strict';
angular.module('dashboard').controller('userControlPanelController', ['$scope', 'Authentication','Users','Userroleasenumservice',
        function($scope, Authentication, Users,Userroleasenumservice) {

            var APPLICATION_TABLE = 0,
                APPLICATION_VIEW  = 1;
            $scope.selectedTab = APPLICATION_TABLE;
            $scope.selectedApplication = undefined;

            $scope.displayApplication = function(application) {
                $scope.selectedTab = APPLICATION_VIEW;
                $scope.selectedApplication = application;

                var bday = new Date(application.iscaData.applicationForm.form.birthday);
                $scope.selectedApplication.birthday = bday.getDate() + '/' + (bday.getMonth() + 1) + '/' + bday.getFullYear();
                bday = undefined;
                $scope.selectedApplication.languages = uniq(application.iscaData.applicationForm.form.academicInfo.languages.split(','));
                console.log($scope.selectedApplication);

            };

            $scope.backToTable = function() {
                $scope.selectedTab = APPLICATION_TABLE;
                $scope.selectedApplication = undefined;
            };


            // TODO: delete user function
        }
    ]
);
