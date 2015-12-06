'use strict';

angular.module('tasks').factory('TasksGetterService', ['$http',
        function($http) {
            return {
                getCategories: function () {
                    return $http({
                        method : 'GET',
                        url : 'tasks?action=types'
                    });
                },
                getTasks: function(taskType){
                    return $http({
                        method:'GET',
                        url: 'tasks?action=type&value=' + taskType
                    });
                }
            }
        }
    ]
);
