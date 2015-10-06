'use strict';


angular.module('academic-signup').controller('academic-signup', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        var user = angular.copy(Authentication.user);
        console.log(user)

    }
]);
