'use strict';

angular.module('tasks').controller('TaskNewController', ['$scope', 'Authentication', 'Userroleasenumservice', '$http', '$mdDialog',
    function ($scope, Authentication, Userroleasenumservice, $http, $mdDialog) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        // Instance for new task object
        $scope.newTask = {
            type: '',
            title: '',
            createdBy: $scope.user._id,
            description: '',
            content: ''
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
                // TODO: handle errors
            });
        };

    }
]);
