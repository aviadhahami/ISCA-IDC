'use strict';

//News service used to communicate News REST endpoints
angular.module('news').factory('NewsGetterService', ['$http','$q',
        function($http,$q) {
            return {
                getTen: function () {
                    return $http({
                        method : 'GET',
                        url : 'news/limitedPosts'
                    });
                },
                getAll :function(){
                    return $http({
                        method:'GET',
                        url: 'news'
                    })
                },
                getMagazinePosts : function(){
                    return $http({
                        method : 'GET',
                        url : 'magazine'
                    })
                },
                getBlogPosts : function(){
                    return $http({
                        method : 'GET',
                        url : 'blog'
                    })
                }
            }
        }
    ]
);
