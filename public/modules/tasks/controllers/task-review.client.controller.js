'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice', 'task', '$http', '$mdDialog', '$location',
    function ($scope, Authentication, Userroleasenumservice, task, $http, $mdDialog, $location) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        $scope.task = task;
        $scope.editMode = false;

        $scope.stringifyDate = function (date) {
            var time = new Date(date);
            var yyyy = time.getFullYear().toString();
            var mm = (time.getMonth() + 1).toString();
            var dd = time.getDate().toString();
            return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy;
        };

        $scope.edit = function () {
            $scope.editMode = !$scope.editMode;
        };
        $scope.updateRecord = function () {
            console.log($scope.task)
            $http({
                method: 'PUT',
                url: '/tasks/' + task._id,
                data: {
                    task: $scope.task
                }
            }).then(function (res) {
                console.log(res);
                $scope.editMode = !$scope.editMode;
            }, function (err) {
                console.log(err);

                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Woops')
                        .content('Something went wrong, updates weren\'t saved')
                        .ok('ok')
                ).then(function () {
                    $scope.editMode = !$scope.editMode;
                });

            });


        };

        $scope.takeTask = function () {
            $scope.task.taken = {
                name: $scope.user.displayName,
                date: Date.now(),
                id: $scope.user._id
            };
            $scope.task.status = 'active';
            $http({
                method: 'PUT',
                url: '/tasks/' + task._id,
                data: {
                    task: $scope.task
                }
            }).then(function (res) {
                console.log(res);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Good luck')
                        .content('You\'ve taken property of this task')
                        .ok('thanks')
                ).then(function () {

                });
            }, function (err) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Woops')
                        .content(err.message)
                        .ok('ok')
                ).then(function () {
                    $location.path('/tasks');
                });
            });
        };

        $scope.closeTask = function () {
            $mdDialog.show({
                    controller: function ($scope, $mdDialog) {
                        $scope.answer = function () {
                            if (!!$scope.value) {
                                $mdDialog.hide($scope.value);
                            } else {
                                $scope.err = 'Please specify amount of hours';
                            }
                        };
                        $scope.close = function () {
                            $mdDialog.hide();
                        }
                    },
                    templateUrl: 'modules/tasks/views/task-hours-dialog.client.view.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                })
                .then(function (answer) {
                    if (!!answer) {
                        // Prepare object data
                        $scope.task.closed = {
                            name: $scope.user.displayName,
                            date: Date.now(),
                            id: $scope.user._id
                        };
                        $scope.task.status = 'done';

                        // XHR
                        $http({
                            method: 'PUT',
                            url: '/tasks/' + task._id,
                            data: {
                                task: $scope.task
                            }
                        }).then(function (res) {
                            console.log(res);
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(false)
                                    .title('Great job!')
                                    .content('You\'ve completed this task')
                                    .ok('ok')
                            ).then(function () {
                            });
                        }, function (err) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(false)
                                    .title('Woops')
                                    .content(err.message)
                                    .ok('ok')
                            ).then(function () {
                                $location.path('/tasks');
                            });
                        });
                    }
                });


        };

        $scope.removeRecord = function () {
            if ($scope.userLevel < 4) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('WARNING')
                        .content('You are not authorized to do this action')
                        .ok('ok')
                ).then(function () {
                    $location.path('/tasks');
                });
            } else {

                $http({
                    method: 'DELETE',
                    url: '/tasks/' + $scope.task._id
                }).then(function (res) {
                    console.log(res);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('Task deleted')
                            .content('This task has been removed')
                            .ok('ok')
                    ).then(function () {
                        $location.path('/tasks');
                    });
                }, function (err) {
                    console.log(err);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('Error')
                            .content(err.message)
                            .ok('ok')
                    ).then(function () {
                        $location.path('/tasks');
                    });
                });
            }
        };


        console.log(task);


    }
]);
