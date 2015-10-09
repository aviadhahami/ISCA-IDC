'use strict';

angular.module('rolespanel').controller('rolespanelController', ['$scope', 'Authentication','Userroleasenumservice','Users','$http','$location','$q',
    function($scope, Authentication,Userroleasenumservice,Users, $http,$location,$q) {
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

        console.log($scope.user);

        // Navigate user out if not authorized
        if($scope.userLevel !== 4){
            $location.path('/');
        }


        // Init process
        var getRecordsFromDB = function(){
            $http({
                method : 'get',
                url: '/users/getRecords'
            }).then(function(res){
                console.log(res);
                $scope.recievedUsers = angular.copy(res.data);
            });
        };
        var initSelectionData = function(){
            $scope.selectionData = {};
        };
        var updateUserRole = function(_id,requestedRole){
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url:'/users/updateRole',
                data : {
                    requestedRole : requestedRole,
                    idToPromote: _id
                }
            }).then(function(res){
                deferred.resolve(res.data);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };


        getRecordsFromDB();
        initSelectionData();
        $scope.searchbox = {
            input : ' '
        };
        $scope.roles= {
            0: {
                name:'volunteer'
            },
            1: {
                name:'participant'

            },
            2: {
                name:'manager'
            },
            3: {
                name:'admin'
            }
        };

        $scope.$watch('selectionData',function(newVal,oldVal){
            for(var k in newVal){
                updateUserRole(k,newVal[k]).then(function(data){
                    initSelectionData();
                    getRecordsFromDB();
                });
            }

        },true);
    }]);
