'use strict';


angular.module('academic-signup').controller('academic-signup-controller', ['$scope', 'Authentication','$interval','$http',
    function($scope, Authentication,$interval,$http) {
        // This provides Authentication context.
        $scope.user = angular.copy(Authentication.user);
        function init(){
            var loadSavedData = function(){
                return JSON.parse(localStorage.getItem('academic-application-data'));
            };

            var savedData = loadSavedData();
            console.log('savedData',savedData);

            if(savedData === null){
                $scope.applicationFormData = {
                    'name': $scope.user.displayName,
                    'email':$scope.user.email,
                    'id':'',
                    'sex':'',
                    'birthday': '',
                    'phone':'',
                    'academicInfo':{
                        'currentYear':'',
                        'degree':'',
                        'fieldOfStudy':'',
                        'languages' : '',
                        'reasonToCome':''
                    },
                    'essay':{
                        'topic':'',
                        'content':''
                    },
                    'cv':''




                };
            }else{
                $scope.applicationFormData = angular.copy(savedData);
            }
        }

        init();

        $scope.userReadTerms = true; // TODO: CHANGE TO FALSE
        $scope.toggleUserReadTerms = function(){
            $scope.userReadTerms = !$scope.userReadTerms;
        };

        $scope.saveData = function(){
            localStorage.setItem('academic-application-data',JSON.stringify($scope.applicationFormData));
        };

        $scope.studyOptions = [
            'Computer Science',
            'Law',
            'Psychology',
            'Sustainability',
            'Economics',
            'Communication',
            'Government'
        ];

        $interval(function(){
            $scope.saveData();
            console.log('saved');
        },3000);

        $http({
            method: 'POST',
            url: '/api/cv',
            data: 'test', // your original form data,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function(data){
            console.log(data);
        });
    }
]);
