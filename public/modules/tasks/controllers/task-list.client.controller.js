'use strict';

angular.module('tasks').controller('TaskListController', ['$scope', 'Authentication', 'Userroleasenumservice', 'TasksGetterService',
    function($scope, Authentication, Userroleasenumservice, TasksGetterService) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        // returns true if passed date is within 7 days before today
        $scope.createdThisWeek = function(date) {
        	var oneWeekAgo = new Date();
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
			if (date > oneWeekAgo) 
				return true;
			return false;
        }

       	$scope.stringifyDate = function(date){
            var time = new Date(date);
            var yyyy = time.getFullYear().toString();
            var mm = (time.getMonth()+1).toString();
            var dd = time.getDate().toString();
            return (dd[1]?dd:"0"+dd[0]) +'/' +  (mm[1]?mm:"0"+mm[0]) +'/' + yyyy;
        };

        var populateCategories = function() {
            TasksGetterService.getCategories()
            .then( function(data) {
                $scope.categories = data.data;
            });
        };
        $scope.populateTasks = function(taskType) {
            $scope.loadingTasks = true;
            TasksGetterService.getTasks(taskType)
            .then( function(data) {
            	$scope.taskList = data.data;
                $scope.loadingTasks = false;
            });
        };

        var init = function(){
            populateCategories();
            $scope.populateTasks('Facebook');
        };

        init();
    }
]);
