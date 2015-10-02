'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides access to user data.
		$scope.authentication = Authentication;
	}
]);