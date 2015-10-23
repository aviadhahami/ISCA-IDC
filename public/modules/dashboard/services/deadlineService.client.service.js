'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('dashboard').factory('deadlineService', ['$http',
    function($http) {
        //logic here
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var getAMorPM = function(hour){
            return hour > 12 ? hour-12 + 'PM' : (hour === 0 ? 12 : hour)+ 'AM';
        };
        var getDateExtension = function(time){
            switch(time) {
                case(1):
                    time += 'st';
                    break;
                case(2):
                    time += 'nd';
                    break;
                case(3):
                    time += 'rd';
                    break;
                default :
                    time += 'th';
            }
            return time;
        };
        // API here
        return {
            getDateAsStringObj :function(){
                return this.getDeadlineTime().then(function(time){
                    if(typeof time !== 'object'){
                        time = new Date(time);
                    }
                    return  {
                        hour : getAMorPM(time.getHours()),
                        month : monthNames[time.getMonth()],
                        day : getDateExtension(time.getDate())
                    }
                });

            },
            getDeadlineTime : function(){
                return $http({
                    method:'get',
                    url:'api/timeToApply'
                }).then(function(res){
                    return new Date(res.data.date);
                });
            },
            updateDate : function(date){
                return $http({
                    method:'post',
                    url:'api/timeToApply',
                    data:{
                        date :date
                    }
                }).then(function(res){
                    return {
                        message : 'ok',
                        res: res}
                },function(err){
                    return {
                        message : 'error',
                        err : err}
                });
            },
            isPassed: function(){
                return this.getDeadlineTime().then(function(res){
                    var now = Date.now();
                    return (res - now > 0);
                });
            }
        }
    }
]);
