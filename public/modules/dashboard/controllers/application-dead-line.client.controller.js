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
			deadlineService.updateDate($scope.requiredDate).then(function(res){
				console.log(res);
				$scope.success = 'updated date!'
			},function(err){
				console.log(err);
				$scope.error = 'didn\'t work this time...';
			});
		}
	}
]);
