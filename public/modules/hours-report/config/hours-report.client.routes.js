'use strict';

// Setting up route
angular.module('hoursReport').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Home state routing
        $stateProvider.
            state('hoursReportTotal', {
                url: '/hours/total',
                templateUrl: 'modules/hours-report/views/hours-report-total.client.view.html'
            })
            .state('hoursReport', {
                url: '/hours/:userId',
                templateUrl: 'modules/hours-report/views/hours-report.client.view.html',
                controller: 'HoursReportController'
            });
    }
]);
