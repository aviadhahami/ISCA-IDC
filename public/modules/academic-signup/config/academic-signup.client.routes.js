'use strict';

// Setting up route
angular.module('academic-signup').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
			state('academic-signup', {
				url: '/academic-signup',
				templateUrl: 'modules/academic-signup/views/signup.client.view.html',
				controller:['$scope','deadLinePassed','$mdDialog','$location',
					function($scope,deadLinePassed,$mdDialog,$location){
						if(!deadLinePassed){
							$mdDialog.show(
								$mdDialog.alert()
									.clickOutsideToClose(false)
									.title('We\'re sorry!')
									.content('The application form is now closed! Please try next year ')
									.ok('Got it!')
							).then(function(){
									$location.path('/dashboard');
								});
						}
					}],
				resolve:{
					deadLinePassed:['deadlineService',function(deadlineService){
						return deadlineService.isPassed();
					}]

				}
			});
	}
]);
