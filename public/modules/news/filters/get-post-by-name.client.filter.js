'use strict';

angular.module('news').filter('getPostByName', [
    function() {
        return function(input,data) {
            if (input) {

                return input.filter(function (item) {
                    return item.name.indexOf(data) > -1
                })
            }else{
                return true;
            }
        }
    }
]);
