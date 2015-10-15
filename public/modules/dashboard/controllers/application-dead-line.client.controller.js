'use strict';

angular.module('dashboard').controller('ApplicationDeadLineController', ['$scope','$http','$mdDialog',
	function($scope,$http,$mdDialog) {
		// Application dead line controller logic
		// ...
		$scope.currentTime;
		$http({
			method:'get',
			url:'api/timeToApply'
		}).then(function(res){
			$scope.currentTime = res.data.date;
		})
	}
]);
