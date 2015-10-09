'use strict';

angular.module('dashboard').controller('applicationsReviewController', ['$scope', 'Authentication','Userroleasenumservice', '$http',
    function($scope, Authentication,Userroleasenumservice, $http) {

        $http.get('/api/dashboard/pending').then(function(response) {
            console.log(response);
        });

    }]);
