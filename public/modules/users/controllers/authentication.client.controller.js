'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).then(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page

                window.location.reload();
                $location.path('/');
            },function(response) {
                $scope.error = response.data.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).then(function(response) {

                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                window.location.reload();
                $location.path('/dashboard');
            },function(response) {
                $scope.error = response.data.message;
            });
        };


        // Custom stuff for us
        $scope.degreeOptions = [
            {
                'id':'cs',
                'name': 'Computer Science'
            },
            {
                'id':'psy',
                'name': 'Psychology'
            },
            {
                'id':'gov',
                'name': 'Government'
            },
            {
                'id':'law',
                'name': 'Law'
            },
            {
                'id':'eco',
                'name': 'Economics'
            },
            {
                'id':'com',
                'name': 'Communications'
            },
            {
                'id':'sus',
                'name': 'Sustainability'
            }
        ];

        $scope.selectedVolunteer = '';

        $scope.selectedOption= '';
        var updateSelectedProgram = function(){
            $scope.VolunteerIsSelected = $scope.selectedOption.toLowerCase() === 'volunteer';
        };

        // Should be changed to ng-change but currently md-select doesn't support it
        $scope.$watch('selectedOption',updateSelectedProgram);


    }
]);
