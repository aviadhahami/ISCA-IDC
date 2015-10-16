'use strict';

// Setting up route
angular.module('academic-signup').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
			state('academic-signup', {
				url: '/academic-signup',
				templateUrl: 'modules/academic-signup/views/signup.client.view.html',
				controller:['$scope','deadLinePassed',function($scope,deadLinePassed){
					if(deadLinePassed){
						console.log('registartion closed',deadLinePassed)
					}
				}],
				resolve:{
					deadLinePassed:['Timetoapply',function(Timetoapply){
						return Timetoapply.isPassed();
					}]

				}
			});
	}
]);
