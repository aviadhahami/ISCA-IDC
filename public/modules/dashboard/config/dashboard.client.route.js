'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/views/dashboard.client.view.html'
            })
            .state('applicationsReview', {
                url: '/dashboard/applicationReview',
                templateUrl: 'modules/dashboard/views/applicationsReview.client.view.html'
            });
    }
]);
