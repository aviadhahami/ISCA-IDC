'use strict';

angular.module('dashboard').controller('applicationsReviewController', ['$scope', 'Authentication','Users',
    function($scope, Authentication, Users) {
        var APPLICATION_TABLE = 0,
            APPLICATION_VIEW  = 1;
        $scope.selectedTab = APPLICATION_TABLE;
        $scope.selectedApplication = undefined;
        console.log($scope.applications);

        function normalizeDescription(selectedApplication) {
            var suffix = '';

            switch (selectedApplication.iscaData.applicationForm.form.academicInfo.currentYear) {
                case "1": {
                    suffix = 'st';
                    break;
                }
                case "2": {
                    suffix = 'nd';
                    break;
                }
                case "3": {
                    suffix = 'rd';
                    break;
                }
                case "4": {
                    suffix = 'th';
                    break;
                }
                case "5": {
                    suffix = 'th';
                    break;
                }
                case "6": {
                    suffix = 'th';
                    break;
                }
                case "7": {
                    suffix = 'th';
                    break;
                }
                case "8": {
                    suffix = 'th';
                    break;
                }
                case "9": {
                    suffix = 'th';
                    break;
                }

            }

            return selectedApplication.iscaData.applicationForm.form.academicInfo.currentYear + suffix +
                ' year ' + selectedApplication.iscaData.applicationForm.form.academicInfo.fieldOfStudy + ' student, '
                + selectedApplication.iscaData.applicationForm.form.sex;
        }

        $scope.displayApplication = function(application) {
            $scope.selectedTab = APPLICATION_VIEW;
            $scope.selectedApplication = application;
            $scope.selectedApplication.description = normalizeDescription(application);

            var bday = new Date(application.iscaData.applicationForm.form.birthday);
            $scope.selectedApplication.birthday = bday.getDate() + '/' + (bday.getMonth() + 1) + '/' + bday.getFullYear();
            bday = undefined;

        };

        $scope.backToTable = function() {
            $scope.selectedTab = APPLICATION_TABLE;
            $scope.selectedApplication = undefined;
        };

        $scope.starApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.starred = !selectedApplication.iscaData.applicationForm.starred;
            Users.update(selectedApplication);
            $scope.backToTable();
        };

        $scope.acceptApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = true;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = false;
            Users.update(selectedApplication);
            $scope.backToTable();
        };

        $scope.denyApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = false;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = false;
            Users.update(selectedApplication);
            $scope.backToTable();
        };

    }]);
