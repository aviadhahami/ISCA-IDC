'use strict';

angular.module('core').factory('Timetoapply', ['$http',
	function($http) {

		// Public API
		return {
			setTime: function(date) {
				return $http({
					method:'post',
					url:'api/timeToApply',
					data:{
						'date':date
					}
				})
			},
			getTime: function(){
				return $http({
					method: 'get',
					url: 'api/timeToApply'
				})
			},
			isPassed: function(){
				return this.getTime().then(function(res){
					var dueDate = new Date(res.data.date);
					var now = Date.now();
					return (dueDate - now > 0);
				});
			}
		};
	}
]);
