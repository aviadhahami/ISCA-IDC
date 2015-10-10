'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Userroleasenumservice',
	function($scope, Authentication, Userroleasenumservice) {
		// This provides Authentication context.
		$scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
<<<<<<< HEAD
       $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;
=======
		if ($scope.user)
			$scope.userLevel = Userroleasenumservice.getValue($scope.user.roles);
>>>>>>> cc494999ecf7fac14a58774632e36fb1a5a5ab39

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
