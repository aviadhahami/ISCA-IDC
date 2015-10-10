'use strict';

// Setting up route
angular.module('rolespanel').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('rolespanel', {
                url: '/dashboard/rolespanel',
                templateUrl: 'modules/rolespanel/views/rolespanel.client.view.html'
            });
    }
]);
