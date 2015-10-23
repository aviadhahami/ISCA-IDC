'use strict';

angular.module('dashboard').controller('applicationsReviewController', ['$scope', 'Authentication', '$http',
    function($scope, Authentication, $http) {
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
        };

        $scope.backToTable = function() {
            $scope.selectedTab = APPLICATION_TABLE;
            $scope.selectedApplication = undefined;
        };

        function updateUser(user) {
            return $http.post('/users/updateAdmin', user).then(function(response) {
                return (response)
            }, function(err) {
                return (err);
            });
        }

        function updateUserAndBack(user) {
            updateUser(user).then(function(response) {
                //console.log(response)
                $scope.backToTable();
            });
        }


        $scope.starApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.starred = !selectedApplication.iscaData.applicationForm.starred;
            updateUserAndBack(selectedApplication);
        };

        $scope.acceptApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = true;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = false;
            updateUserAndBack(selectedApplication);
        };

        $scope.denyApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = false;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = false;
            updateUserAndBack(selectedApplication);
        };

        $scope.resetApplicant = function(selectedApplication) {
            selectedApplication.iscaData.applicationForm.accepted = false;
            selectedApplication.iscaData.applicationForm.starred = false;
            selectedApplication.iscaData.applicationForm.formPending = true;
            updateUserAndBack(selectedApplication);
        };

    }]);
