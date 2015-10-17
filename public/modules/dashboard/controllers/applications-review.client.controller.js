'use strict';

angular.module('dashboard').controller('applicationsReviewController', ['$scope', 'Authentication','Users',
    function($scope, Authentication, Users) {
        var APPLICATION_TABLE = 0,
            APPLICATION_VIEW  = 1;
        $scope.selectedTab = APPLICATION_TABLE;
        $scope.selectedApplication = undefined;

        // Remove duplicates from language arrary
        var uniq = function (a) {
            return a.sort().filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            })
        };

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

        $scope.resetApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = false;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = true;
            Users.update(selectedApplication);
            $scope.backToTable();
        }

    }]);
