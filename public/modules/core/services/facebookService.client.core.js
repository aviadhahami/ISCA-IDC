'use strict';

angular.module('core').factory('facebookService', ['$q','$window',
    function($q,$window) {
        var postsFromIscaURL = '1453553518200196/feed?access_token=187226808279553|lEm8JUgeZ_HhSX8pqUGIcuiG0Tk&limit=25&until=1443500856&__paging_token=enc_AdCZCZCfx0c9e5XR9sRcjhe1NRnFpOjW9pmTzyaX2TyGG1pomKO9Ii6QZATV6zwlUBhHoIDWNSs1aOKOtcgZBUtHcOZCzJmHBbOphMuPcR5gM1tCFZAwZDZD';
        return {
            getPostsFromIsca: function() {
                var deferred = $q.defer();
                if (!$window.FB){
                    deferred.reject('Error occured');
                    return deferred.promise;
                }
                $window.FB.api(postsFromIscaURL, {}, function(response) {
                    if (!response || response.error) {
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
