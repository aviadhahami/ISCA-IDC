'use strict';

angular.module('dashboard').controller('ApplicationDeadLineController', ['$scope','$http','deadlineService','$q',
	function($scope,$http,deadlineService,$q) {


		var init = function(){

			$q.all([deadlineService.getDeadlineTime(),deadlineService.getDateAsStringObj()])
				.then(function(resolutions){
					$scope.currentTime = resolutions[0];
					$scope.requiredDate =resolutions[0];
					$scope.currentTimeStringObj= resolutions[1];
				});
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
