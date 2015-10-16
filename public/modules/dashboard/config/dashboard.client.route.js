'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
                controller:[,function(){

                }],
                resolve:[,function(){

                }]
            })
            .state('applicationsReview', {
                url: '/dashboard/applicationReview',
                templateUrl: 'modules/dashboard/views/applicationsReview.client.view.html',
                controller: ['$scope', 'applications','Authentication', 'Userroleasenumservice', '$location', function($scope, applications, Authentication, Userroleasenumservice, $location) {

                    $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;

                    $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

                    // Only admin are authorized on this page
                    if ($scope.userLevel !== 4) {
                        $location.path('/');
                    }

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
            })
            .state('myApplication', {
                url: '/dashboard/myApplication',
                templateUrl: 'modules/dashboard/views/myApplication.client.view.html',
                controller: ['$scope','Authentication', '$location', function($scope, Authentication, $location) {

                    $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
                    if($scope.user){
                        if (!$scope.user.iscaData.applicationForm){
                            $location.path('/academic-signup');
                        }else{
                            $scope.application = angular.copy($scope.user.iscaData.applicationForm.form);
                            // $scope.application.birthday = new Date($scope.application.birthday);
                        }
                    }else{
                        $location.path('/dashboard');
                    }
                }]
            })
            .state('application-dead-line', {
                url: '/dashboard/application-dead-line',
                templateUrl: 'modules/dashboard/views/application-dead-line.client.view.html'
            });
    }
]);
