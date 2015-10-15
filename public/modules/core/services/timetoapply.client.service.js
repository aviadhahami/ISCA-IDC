'use strict';

angular.module('core').factory('Timetoapply', ['$http',
	function($http) {
		// Timetoapply service logic
		// ...

		// Public API
		return {
			setTime: function(time) {
				$http({
					method:'post',
					url:'api/timeToApply',
					data:{
						'time':time
					}
				}).then(function(res){
					if (res.data.message === 'done'){
						return true;
					}
				},function(err){
					console.log(err);
					return false;
				});
			},
			getTime: function(){
				$http({
					method:'get',
					url:'api/timeToApply',
				}).then(function(res){
					return res.data;
				},function(err){
					return err;
				});
			}
		};
	}
]);
