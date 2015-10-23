'use strict';

angular.module('dashboard').controller('ApplicationDeadLineController', ['$scope','$http','deadline',
	function($scope,$http,deadline) {


		var init = function(){
			$scope.requiredDate,
				$scope.currentTime,
				$scope.currentTimeStringObj;
			deadline.getDeadlineTime()
			deadline.getDateAsStringObj()
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
