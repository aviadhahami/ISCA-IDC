'use strict';

// Setting up route
angular.module('tasks').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Home state routing
        $stateProvider.
            state('tasks', {
                url: '/tasks',
                templateUrl: 'modules/tasks/views/task-list.client.view.html'
            })
            .state('taskNew', {
                url: '/task/new',
                templateUrl: 'modules/tasks/views/task-new.client.view.html'
            })
            .state('taskReview', {
                url: '/task/:taskId',
                templateUrl: 'modules/tasks/views/task-review.client.view.html',
                controller: 'TaskReviewController',
                resolve: {
                    task: ['$http', '$stateParams', function ($http, $stateParams) {
                        return $http.get('/tasks/' + $stateParams.taskId).then(function (res) {
                            return res.data;
                        }, function (err) {
                            return err;
                        });
                    }]
                }
            });
    }
]);
