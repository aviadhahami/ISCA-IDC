'use strict';

// Setting up route
angular.module('academic-signup').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
			state('academic-signup', {
				url: '/academic-signup',
				templateUrl: 'modules/academic-signup/views/signup.client.view.html'
			});
	}
]);