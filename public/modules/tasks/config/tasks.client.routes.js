'use strict';

// Setting up route
angular.module('tasks').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Home state routing
        $stateProvider.
            state('tasks', {
                url: '/tasks',
                templateUrl: 'modules/tasks/views/task-list.client.view.html'
            })
            .state('taskReview', {
                url: '/task/:taskId',
                templateUrl: 'modules/tasks/views/task-review.client.view.html'
            })
            .state('taskNew', {
                url: '/task/new',
                templateUrl: 'modules/tasks/views/task-new.client.view.html'
            });
    }
]);
