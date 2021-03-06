'use strict';


angular.module('academic-signup').controller('academic-signup-controller', ['$scope', 'Authentication','$interval','Upload','Users','$timeout','$mdDialog','$location',
    function($scope, Authentication,$interval,Upload,Users,$timeout,$mdDialog,$location) {
        // This provides Authentication context.
        $scope.user = angular.copy(Authentication.user);

        function init(){
            if($scope.user.iscaData.hasOwnProperty('applicationForm')){
                $location.path('/dashboard/myApplication');
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
            'Business Administration',
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

        $scope.pdfDialog = function(){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('How to create PDF files')
                    .content('If you do not know what is a PDF file, use the following links:' +
                    '<ul>' +
                    '<li><a href="https://en.wikipedia.org/wiki/Portable_Document_Format" target="_blank">What is a PDF file</a></li>' +
                    '<li><a href="https://support.office.com/en-us/article/Save-as-PDF-443b9ec2-3b9a-431f-b6f7-672550a296b7" target="_blank">How to save files as PDF</a></li>' +
                    '</ul>')
                    .ok('Got it!')
            );
        };


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

        // Holding all the missing data from the form
        $scope.formMisses = [];
        var formKeysToEnum = {
            id : 'ID or passport number',
            phone:'Phone number',
            currentYear : 'Current year of study',
            degree : 'Degree type',
            fieldOfStudy : 'Study field',
            languages:'Known languages',
            reasonToCome : 'What you can contribute',
            topic : 'Topic for the essay',
            content : 'Essay\'s content' ,
            cv : 'A copy of your CV'

        }
        // Recursively test for empty fields within the application object
        var checkEmptyObjectsRecursively = function(obj){
            var temp = true;
            if (obj === null) {
                temp = false;
            }
            for (var k in obj){
                if (!obj[k]){
                    temp = false;
                    $scope.formMisses.push(k);
                }
                if(typeof obj[k] === 'object'){
                    temp = temp & checkEmptyObjectsRecursively(obj[k]);
                }
            }
            return temp;
        };
        var generateMissingItemsList = function(missingItems){
            var closingLI = '</li>',
                openLI = '<li>',
                returnString = '';
            console.log(missingItems)
            for(var i=0;i<missingItems.length;i++){
                returnString += openLI + formKeyToString(missingItems[i])+ closingLI;
            }
            console.log(returnString);
            return returnString == null ? 'Form is empty' : returnString;
        };
        var formKeyToString = function(key){
            return formKeysToEnum[key];
        };
        var showAlert = function(missesObj) {
            var msg = 'The following things are missing in your form: <br/>' +
                '<ul>' +
                generateMissingItemsList(missesObj) +
                '</ul>';

            // Clear the object
            $scope.formMisses = [];
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Can not submit application')
                    .content(msg)
                    .ok('OK')
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
                ).then(function(data){

                        // Clear localStorage
                        localStorage.clear();

                        // Redirect to dashboard
                        window.location.reload();
                        $location.path('/dashboard');

                    });

            }else{
                showAlert($scope.formMisses);
                // Form missing
            }
        };
    }
]);
