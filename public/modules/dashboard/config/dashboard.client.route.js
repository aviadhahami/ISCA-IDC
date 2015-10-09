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
                templateUrl: 'modules/dashboard/views/applicationsReview.client.view.html',
                controller: ['$scope', 'applications', function($scope, applications) {
                    // TODO What if applications is empty
                    if (applications == undefined || applications.length == 0)
                        $scope.applications = undefined;
                    else
                        $scope.applications = applications;
                }],
                resolve: {
                    applications: ['$q', '$http', function($q, $http) {
                        var deferred = $q.defer();
                        $http.get('/api/dashboard/pending').then(function(response) {
                            if (!response.data.err) {
                                deferred.resolve(response.data);
                            } else {
                                deferred.resolve({});
                                // deferred.reject() & stateError
                            }
                        });
                        return deferred.promise;
                    }]
                }
            });
    }
]);
