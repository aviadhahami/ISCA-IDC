'use strict';
angular.module('dashboard').controller('userControlPanelController', ['$scope', 'Authentication','Users','Userroleasenumservice', '$http', '$mdDialog', '$timeout',
        function($scope, Authentication, Users,Userroleasenumservice, $http, $mdDialog, $timeout) {

            var alert = undefined;


            // Remove duplicates from language array
            var uniq = function (a) {
                return a.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                })
            };
            var APPLICATION_TABLE = 0,
                APPLICATION_VIEW  = 1;
            $scope.selectedTab = APPLICATION_TABLE;
            $scope.selectedUser = undefined;

            $scope.displayApplication = function(user) {
                $scope.selectedTab = APPLICATION_VIEW;
                $scope.selectedUser = user;
                if (user.iscaData.applicationForm) {
                    var bday = new Date(user.iscaData.applicationForm.form.birthday);
                    $scope.selectedUser.birthday = bday.getDate() + '/' + (bday.getMonth() + 1) + '/' + bday.getFullYear();
                    bday = undefined;
                    $scope.selectedUser.languages = uniq(user.iscaData.applicationForm.form.academicInfo.languages.split(','));
                }
            };

            $scope.backToTable = function() {
                $scope.selectedTab = APPLICATION_TABLE;
                $scope.selectedUser = undefined;
            };

            $scope.showConformationDialog = function() {

                $scope.credentials = {
                    username: $scope.user.username,
                    password: ''
                };

                $mdDialog.show({
                    clickOutsideToClose: true,
                    template:
                    '<md-dialog>' +
                        '<md-dialog-content>' +
                            '<h4 flex>Enter your password</h4>' +
                            '<div layout="column" layout-sm="column" layout-align="space-around">' +
                                '<md-input-container>' +
                                    '<label>Password</label>' +
                                    '<input type="password" id="password" name="password" ng-model="credentials.password">' +
                                '</md-input-container>' +
                                '<div class="md-actions">' +
                                    '<md-button class="md-raised" ng-click="deleteUser()">' +
                                        '<i class="fa fa-ban" title="Reset any previous marks"></i>' +
                                        ' Delete' +
                                    '</md-button>' +
                                '</div>' +
                            '</div>' +
                        '</md-dialog-content>' +
                    '</md-dialog>',
                    scope: $scope,
                    preserveScope: true
                });

            };

            $scope.showAlert = function(title, content) {
                alert = $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(title)
                    .content(content)
                    .ok('OK');

                return $mdDialog.show(alert);
            };

            $scope.deleteUser = function() {
                $mdDialog.hide().finally(function() {
                    if (!$scope.credentials.password) {
                        $scope.credentials.password = '';
                    }

                    $http.post('/auth/signin', $scope.credentials).then(function(response) {
                        var promise = Users.remove($scope.selectedUser);
                        promise.$promise.then(function(success) {

                            $scope.showAlert('Success', $scope.selectedUser.displayName + ' was deleted').finally(function() {

                                $http.get('/users/getRecords').then(function(response) {
                                    if (!response.data.err) {
                                        $scope.users = response.data;
                                    }

                                    alert = undefined;
                                    $scope.backToTable();
                                });
                            });

                        }, function(error){
                            $scope.showAlert('Error', 'There was an error deleting the user').finally(function() {
                                alert = undefined;
                                $scope.backToTable();
                            });
                        });
                    },function(response) {
                        $scope.showAlert('Error', 'Password incorrect').finally(function() {
                            alert = undefined;
                        });
                    });
                });
            };
        }
    ]
);
