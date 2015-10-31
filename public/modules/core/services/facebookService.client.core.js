'use strict';

angular.module('core').factory('facebookService', ['$q','$window',
    function($q,$window) {
        var iscaPageId = '1453553518200196';
        var accessToken = 'access_token=187226808279553|lEm8JUgeZ_HhSX8pqUGIcuiG0Tk';
        var testFB = function(){
            return !$window.FB;
        };
        return {
            getPostsFromIsca: function() {
                var deferred = $q.defer();
                if (!testFB){
                    deferred.reject('Error occured');
                    return deferred.promise;
                }
                $window.FB.api(iscaPageId + '/feed?' + accessToken,
                    {},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject(response);
                        } else {
                            deferred.resolve(response);
                        }
                    });
                return deferred.promise;
            },
            getIscaPagePicture: function(){
                var deferred = $q.defer();
                if (!testFB){
                    deferred.reject('Error occured');
                    return deferred.promise;
                }
                $window.FB.api(iscaPageId + '/picture?' + accessToken,
                    {},
                    function(response) {
                    if (!response || response.error) {
                        console.log(response)
                        deferred.reject(response);
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;

            }
        }
    }
]);
