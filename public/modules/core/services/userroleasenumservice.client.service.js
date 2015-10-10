'use strict';

angular.module('core').factory('Userroleasenumservice', [
	function() {
		var rolesEnum = {
			'volunteer': 1,
			'participant' : 2,
			'manager' : 3,
			'admin' : 4
		};

		return {
			getValue: function (rolesArr) {
				return rolesEnum.hasOwnProperty(rolesArr) ? rolesEnum[rolesArr] : 0;
				// var maxLevel = 0;
				
				// for (var role in rolesArr) {
				// 	console.log("role: " + role);
				// 	if (rolesEnum.hasOwnProperty(role) && rolesEnum[role] > maxLevel)
				// 		console.log("maxLevel++");
				// 		maxLevel = rolesEnum[role];
				// }
				// return maxLevel;
			}
		};
	}
]);
