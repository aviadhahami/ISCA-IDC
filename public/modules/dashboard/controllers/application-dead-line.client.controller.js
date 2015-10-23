'use strict';

angular.module('dashboard').controller('ApplicationDeadLineController', ['$scope','$http',
	function($scope,$http) {
		// Application dead line controller logic
		// ...
		var init = function(){
			$scope.requiredDate = '';
			$http({
				method:'get',
				url:'api/timeToApply'
			}).then(function(res){
				console.log(res.data);
				$scope.currentTime = new Date(res.data.date);
			});
		};
		init();

		$scope.changeDeadline = function(){
			$http({
				method:'post',
				url:'api/timeToApply',
				data:{
					date :$scope.requiredDate
				}
			}).then(function(res){
				console.log(res.data);
				$scope.success = 'updated date!'

			},function(err){
				$scope.error = 'didn\'t work this time...';
			});
		}
	}
]);
