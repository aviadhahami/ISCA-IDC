'use strict';

angular.module('tasks').controller('TaskNewController', ['$scope', 'Authentication', 'Userroleasenumservice', '$http', '$mdDialog','$location',
    function ($scope, Authentication, Userroleasenumservice, $http, $mdDialog,$location) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        // Instance for new task object
        $scope.newTask = {
            type: '',
            title: '',
            description: '',
            content: '',
            created: {
                name: $scope.user.displayName
            }
        };

        $scope.createNewTask = function () {
            console.log($scope.newTask);
            $http({
                method: 'POST',
                url: '/tasks',
                data: $scope.newTask
            }).then(function (data) {

                // Worked
                console.log(data);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Task added')
                        .content('Task was added, you will now move to the tasks list')
                        .ok('ok')
                ).then(function () {
                    $location.path('/tasks');
                });
            }, function (err) {
                // Err
                console.log(err);
                if (err.data.hasOwnProperty('message')) {
                    console.log(err.data.message);
                    $mdDialog.show($mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Attention')
                        .content(err.data.message)
                        .ok('OK')
                    );
                }
            });
        };

    }
]);
