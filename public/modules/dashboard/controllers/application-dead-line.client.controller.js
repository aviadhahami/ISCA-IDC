'use strict';

angular.module('dashboard').controller('ApplicationDeadLineController', ['$scope','$http','deadlineService',
	function($scope,$http,deadlineService) {


		var init = function(){
			$scope.requiredDate,
				$scope.currentTime,
				$scope.currentTimeStringObj;
			deadlineService.getDeadlineTime()
			deadlineService.getDateAsStringObj()
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
