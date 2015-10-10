'use strict';


angular.module('academic-signup').controller('academic-signup-controller', ['$scope', 'Authentication','$interval','Upload','Users','$timeout','$mdDialog','$location',
    function($scope, Authentication,$interval,Upload,Users,$timeout,$mdDialog,$location) {
        // This provides Authentication context.
        $scope.user = angular.copy(Authentication.user);
        function init(){
            if($scope.user.iscaData.hasOwnProperty('applicationForm')){
                $location.path('/dashboard');
            }

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
                    'birthday': new Date(),
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

                // Super important!! otherwise it is not date object and fucks us up
                $scope.applicationFormData.birthday = new Date($scope.applicationFormData.birthday);
            }
        }

        init();

        $scope.userReadTerms = false;
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
            if (file) {
                if(file.type){
                    if (file.type.toString().indexOf('pdf') > -1){
                        $scope.upload(file);
                    }
                }
            }
        };

        // upload on file select or drop
        var initUpload= function(){
            $scope.uploadStatus = {
                progress : 0,
                uploading : false
            };
        }
        $scope.upload = function (file) {
            initUpload();
            $scope.uploadStatus.uploading = true;
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
                $timeout(function(){
                    initUpload();
                },3000);

            }, function (err) {

                console.log('Error status: ' + err.status);

            }, function (evt) {

                // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.uploadStatus.progress = parseInt(100.0 * evt.loaded / evt.total);
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

            });

        };

        // Recursively test for empty fields within the application object
        var checkEmptyObjectsRecursively = function(obj){
            var temp = true;
            if (obj === null) {
                temp = false;
            }
            for (var k in obj){
                if (!obj[k]){
                    temp = false;
                }
                if(typeof obj[k] === 'object'){
                    temp = temp & checkEmptyObjectsRecursively(obj[k]);
                }
            }
            return temp;
        };

        var showAlert = function(ev) {

            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Can not submit application')
                    .content('We believe that some things are missing in your application, please review it.')
                    .ok('OK')
                    .targetEvent(ev)
            );
        };

        $scope.submitApplication = function(){
            console.log($scope.applicationFormData);

            if(checkEmptyObjectsRecursively($scope.applicationFormData)){
                // Form is legit
                $scope.user.iscaData['applicationForm'] = {
                    formPending : true,
                    form : angular.copy($scope.applicationFormData)
                };

                Users.update($scope.user);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Thank you!')
                        .content('We have received your application and will process it soon. Good luck!')
                        .ok('ok')
                ).then(function(){


                        // Clear localStorage
                        localStorage.clear();

                        // Redirect to dashboard
                        $location.path('/dashboard/myApplication');
                    });

            }else{
                showAlert(null);
                // Form missing
            }
        };
    }
]);
