'use strict';
angular.module('dashboard').controller('userControlPanelController', ['$scope', 'Authentication','Users','Userroleasenumservice', '$http', '$mdDialog',
        function($scope, Authentication, Users,Userroleasenumservice, $http, $mdDialog) {

            $scope.credentials = {};
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

            $scope.conformationDialog = function() {
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
                                '<md-button class="md-raised" ng-click="deleteUser()">' +
                                    '<i class="fa fa-ban" title="Reset any previous marks"></i>' +
                                    ' Delete' +
                                '</md-button>' +
                            '</div>' +
                        '</md-dialog-content>' +
                    '</md-dialog>',
                    scope: $scope
                });
            };

            $scope.alert = function(title, content) {

                return $mdDialog.alert({
                    clickOutsideToClose: true,
                    title: title,
                    content:content,
                    ok: 'OK'
                });
            };

            $scope.deleteUser = function() {
                $mdDialog.hide();
                if (!$scope.credentials.password) {
                    $scope.credentials.password = '';
                }
                $scope.credentials.username = $scope.user.username;

                $http.post('/auth/signin', $scope.credentials).then(function(response) {
                    var promise = Users.remove($scope.selectedUser);
                    promise.$promise.then(function(success) {

                        var alert = $scope.alert('Success', $scope.selectedUser.displayName + ' was deleted');
                        $mdDialog.show().finally(function() {
                            alert = undefined;
                            $http.get('/users/getRecords').then(function(response) {
                                if (!response.data.err) {
                                    $scope.users = response.data;
                                }

                                $scope.backToTable();
                            });
                        });

                    }, function(error){
                        var alert = $scope.alert('Error', 'There was an error deleting the user');
                        $mdDialog.show(alert).finally(function() {
                            alert = undefined;
                            $scope.backToTable();
                        });
                    });
                },function(response) {
                    var alert = $scope.alert('Error', 'Password incorrect');
                    $mdDialog.show(alert).finally(function() {
                        alert = undefined;
                        $scope.backToTable();
                    });
                });
            };
        }
    ]
);
