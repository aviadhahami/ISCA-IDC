'use strict';

// News controller
angular.module('news').controller('NewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'News','Userroleasenumservice',
    function($scope, $stateParams, $location, Authentication, News,Userroleasenumservice) {
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        $scope.types = ['magazine','blog'];
        $scope.filter = {
            text : ''
        };

        // Create new News
        $scope.create = function() {
            // Create new News object
            var news = new News ({
                name: this.name,
                content : this.content,
                type: this.type,
                imageData : this.image
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
                    $location.path('/blogAndMagazine');
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
            $scope.loadingNews = true;
            News.query(function (data) {

                // Remove loader
                $scope.loadingNews = false;
                // Populate data
                $scope.news = data;
            })
        };


        // Find existing News
        $scope.findOne = function() {
            $scope.loadingNews = true;
            if(!$stateParams.newsId){
                $location.path('/blogAndMagazine')
            }
            News.get({
                newsId: $stateParams.newsId
            },function(data){
                $scope.loadingNews = false;
                // Populate news
                $scope.news =data;
            },function(err){
                console.log(err);
                $scope.err = true;
            });

        };
    }
]);
