'use strict';

angular.module('dashboard').controller('applicationsReviewController', ['$scope', 'Authentication','Userroleasenumservice',
    function($scope, Authentication,Userroleasenumservice) {
        $scope.selectedTab = 0;

        console.log($scope.applications);

    }]);
