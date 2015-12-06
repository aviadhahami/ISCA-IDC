'use strict';

angular.module('tasks').controller('TaskReviewController', ['$scope', 'Authentication', 'Userroleasenumservice', 'task', '$http',
    function ($scope, Authentication, Userroleasenumservice, task, $http) {
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
                mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Woops!')
                    .content('Something went wrong, updates weren\'t saved')
                    .ok('ok');
                $scope.editMode = !$scope.editMode;
            });


        };

        $scope.takeTask = function () {

        };

        $scope.closeTask = function () {

        };

        $scope.removeRecord = function () {
            $http({}).then(function (res) {
                console.log(res);
            },function(err){
                console.log(err);
            });
        };


        console.log(task);


    }
]);
