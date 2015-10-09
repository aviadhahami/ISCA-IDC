'use strict';

angular.module('rolespanel').controller('rolespanelController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','$location','$q','$mdDialog','$interval','$timeout',
    function($scope, Authentication,Userroleasenumservice,Users, $http,$location,$q,$mdDialog,$interval,$timeout) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        console.log($scope.user);

        // Navigate user out if not authorized
        if ($scope.userLevel !== 4) {
            $location.path('/');
        }


        // Init process
        var getRecordsFromDB = function () {
            $http({
                method: 'get',
                url: '/users/getRecords'
            }).then(function (res) {
                console.log(res);
                $scope.recievedUsers = angular.copy(res.data);
            });
        };
        var initSelectionData = function () {
            $scope.selectionData = {};
        };
        var updateUserRole = function (_id, requestedRole) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/users/updateRole',
                data: {
                    requestedRole: requestedRole,
                    idToPromote: _id
                }
            }).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        var showLoadingModal = function () {
            var tpl = '<md-dialog><md-dialog-content>' +
                '<h2 flex>Updating...</h2>' +
                '<div layout="row" layout-sm="column" layout-align="space-around">' +
                '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
                '</div> </md-dialog-content></md-dialog>';
            $mdDialog.show({
                clickOutsideToClose: false,
                template: tpl
            });

        };
        var showSuccessModal = function () {
            $mdDialog.show($mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Updated role!')
                    .content('Great success !')
                    .ok('Got it!')
            );
        };


        getRecordsFromDB();
        initSelectionData();
        $scope.searchbox = {
            input: ' '
        };
        $scope.roles = {
            0: {
                name: 'volunteer'
            },
            1: {
                name: 'participant'

            },
            2: {
                name: 'manager'
            },
            3: {
                name: 'admin'
            }
        };

        $scope.$watch('selectionData', function (newVal, oldVal) {
            if (newVal === oldVal) return;
            for (var k in newVal) {
                showLoadingModal();
                updateUserRole(k, newVal[k]).then(function (data) {
                    $mdDialog.hide();
                    initSelectionData();
                    getRecordsFromDB();
                    showSuccessModal();
                });
            }

        }, true);


    }
]);
