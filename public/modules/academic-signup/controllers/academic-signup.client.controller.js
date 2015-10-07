'use strict';


angular.module('academic-signup').controller('academic-signup-controller', ['$scope', 'Authentication','$interval','Upload','Users','$http',
    function($scope, Authentication,$interval,Upload,Users,$http) {
        // This provides Authentication context.
        $scope.user = angular.copy(Authentication.user);
        console.log($scope.user);
        function init(){
            var loadSavedData = function(){
                return JSON.parse(localStorage.getItem('academic-application-data'));
            };

            var savedData = loadSavedData();

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
                    'cv':$scope.user.cv || ''
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
        $scope.submit = function(file) {
            console.log(file);
            if (file) {
                if(file.type){
                    if (file.type.toString().indexOf('pdf') > -1){
                        console.log(true);
                        $scope.upload(file);
                    }
                }
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
            }).then(function (res) {

                console.log(res.data);
                console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);

                // Update objects with fresh data
                $scope.user.cv = res.data.URI;
                $scope.applicationFormData.cv = res.data.URI;

                // Update user in DB
                Users.update($scope.user);


            }, function (err) {

                console.log('Error status: ' + err.status);

            }, function (evt) {

                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

            });
        };

    }
]);
