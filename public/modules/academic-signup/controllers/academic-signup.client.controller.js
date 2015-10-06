'use strict';


angular.module('academic-signup').controller('academic-signup', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.user = angular.copy(Authentication.user);

        $scope.applicationFormData = {
            'name': $scope.user.displayName,
            'email':$scope.user.email,
            'id':'',

        };
        console.log($scope.user);
        $scope.userReadTerms = false;
        $scope.toggleUserReadTerms = function(){
            $scope.userReadTerms = !$scope.userReadTerms;
        }

    }
]);
