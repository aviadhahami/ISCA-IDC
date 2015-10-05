'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides access to user data.
		$scope.authentication = Authentication;

		$scope.isCollapsed = false;
		$scope.toggleCollapsibleMenu = function() {
 			$scope.isCollapsed = !$scope.isCollapsed;
 		};
	}
]);