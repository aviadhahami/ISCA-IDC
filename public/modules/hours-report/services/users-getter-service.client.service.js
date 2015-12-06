'use strict';

angular.module('hoursReport').factory('UsersGetterService', ['$http',
        function($http) {
            return {
                getUsers: function () {
                    return $http({
                        method : 'GET',
                        url: 'users/getRecords'
                    });
                }
            }
        }
    ]
);