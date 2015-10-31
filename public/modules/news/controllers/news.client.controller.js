'use strict';

// News controller
angular.module('news').controller('NewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'News','Userroleasenumservice',
    function($scope, $stateParams, $location, Authentication, News,Userroleasenumservice) {
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        $scope.types = ['magazine','blog'];


        // Create new News
        $scope.create = function() {
            // Create new News object
            var news = new News ({
                name: this.name,
                content : this.content,
                type: this.type
            });

            // Redirect after save
            news.$save(function(response) {
                $location.path('blogAndMagazine/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing News
        $scope.remove = function(news) {
            if ( news ) {
                news.$remove();

                for (var i in $scope.news) {
                    if ($scope.news [i] === news) {
                        $scope.news.splice(i, 1);
                    }
                }
            } else {
                $scope.news.$remove(function() {
                    $location.path('listNews');
                });
            }
        };

        // Update existing News
        $scope.update = function() {
            var news = $scope.news;

            news.$update(function() {
                $location.path('blogAndMagazine/' + news._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of News
        $scope.find = function() {
            $scope.news = News.query();
        };

        // Find existing News
        $scope.findOne = function() {
            if(!$stateParams.newsId){
                $location.path('/blogAndMagazine')
            }
            $scope.news = News.get({
                newsId: $stateParams.newsId
            });
        };
    }
]);
