'use strict';


angular.module('academic-signup').controller('academic-signup-controller', ['$scope', 'Authentication','$interval','Upload',
    function($scope, Authentication,$interval,Upload) {
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


        $scope.file ='';
        $scope.submit = function() {
            if ($scope.file && !$scope.file.$error) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            console.log(file);
            Upload.upload({
                url: 'api/cv',
                data: {
                    file: file
                }
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

    }
]);
