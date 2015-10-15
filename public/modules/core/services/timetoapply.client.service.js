'use strict';

angular.module('core').factory('Timetoapply', ['$http',
	function($http) {

		// Public API
		return {
			setTime: function(time) {
				return $http({
					method:'post',
					url:'api/timeToApply',
					data:{
						'time':time
					}
				})
			},
			getTime: function(){
				return $http({
					method: 'get',
					url: 'api/timeToApply'
				})
			}
		};
	}
]);
