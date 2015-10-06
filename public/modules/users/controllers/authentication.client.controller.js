'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };


        // Custom stuff for us
        $scope.programOptions = [
            {
                'id': 'A',
                'name' : 'Academic Participant'
            },
            {
                'id':'V',
                'name':'Volunteer'
            }
        ];
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

        $scope.selectedOption = $scope.programOptions[1].name;
        console.log($scope.selectedOption);
        $scope.selectedVolunteer = '';


        var updateSelectedProgram = function(){
            $scope.selectedVolunteer = $scope.selectedOption === $scope.programOptions[0].id;
        };

        // Should be changed to ng-change but currently md-select doesn't support it
        $scope.$watch('selectedOption',updateSelectedProgram);


    }
]);
