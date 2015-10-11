'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Userroleasenumservice',
	function($scope, Authentication, Userroleasenumservice) {
		// This provides Authentication context.
		$scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
		if ($scope.user)
			$scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);

		// Toggles mobile menu
		$scope.isCollapsed = false;
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		$scope.clearLocalStorage = function(){
			localStorage.clear();
		}
	}
]);
