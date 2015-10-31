'use strict';

angular.module('news').filter('getPostByName', [
	function() {
		return function(input,data) {
			return input.filter(function(item){
                return item.name.indexOf(data) > -1
            })
		};
	}
]);
