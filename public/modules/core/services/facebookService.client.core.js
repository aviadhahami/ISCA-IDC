'use strict';

angular.module('core').factory('facebookService', ['$q','$window',
    function($q,$window) {
        var facebookInitFlag = false;
        var iscaPageId = '1453553518200196';
        var accessToken = 'access_token=187226808279553|lEm8JUgeZ_HhSX8pqUGIcuiG0Tk';
        var testFB = function(){
            return !$window.FB;
        };
        return {
            initFacebook : function(){
                if(!facebookInitFlag) {
                    $window.fbAsyncInit = function () {
                        FB.init({
                            appId: '187226808279553',
                            status: true,
                            cookie: true,
                            xfbml: true,
                            version: 'v2.4'
                        });
                    };
                    (function (d) {
                        var js, id = 'facebook-jssdk';
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement('script');
                        js.id = id;
                        js.async = true;
                        js.src = '//connect.facebook.net/en_US/sdk.js';
                        d.getElementsByTagName('head')[0].appendChild(js);
                    }(document));
                    facebookInitFlag = true;
                }
            },
            getPostsFromIsca: function() {
                var deferred = $q.defer();
                if (!testFB || !facebookInitFlag){
                    deferred.reject('Error occured');
                    return deferred.promise;
                }
                if($window.hasOwnProperty('FB')){
                    $window.FB.api(iscaPageId + '/feed?' + accessToken,
                        {},
                        function(response) {
                            if (!response || response.error) {
                                deferred.reject(response);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                }else{
                    deferred.reject('Error occured');
                }

                return deferred.promise;
            },
            getIscaPagePicture: function(){
                var deferred = $q.defer();
                if (!testFB || !facebookInitFlag){
                    deferred.reject('Error occured');
                    return deferred.promise;
                }
                if($window.hasOwnProperty('FB')) {
                    $window.FB.api(iscaPageId + '/picture?' + accessToken,
                        {},
                        function (response) {
                            if (!response || response.error) {
                                console.log(response)
                                deferred.reject(response);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                }else{
                    deferred.reject('Error occured');
                }
                return deferred.promise;

            }
        }
    }
]);
