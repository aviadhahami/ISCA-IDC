'use strict';


angular.module('academic-signup').controller('academic-signup', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        console.log($scope.authentication);
    }
]);
