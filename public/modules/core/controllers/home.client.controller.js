'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides access to user data.
		$scope.authentication = Authentication;

		// Controls the participant / volunteer overview tabs
		$scope.participationType = 'participant';
		$scope.changeParticipationType = function (type) {
			if (type !== 'participant' && type !== 'volunteer')
				type = 'participant';
			$scope.participationType = type;
		};
	}
]);
