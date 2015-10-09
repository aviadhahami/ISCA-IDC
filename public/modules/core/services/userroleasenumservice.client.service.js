'use strict';

angular.module('core').factory('Userroleasenumservice', [
	function() {
		var rolesEnum ={
			'volunteer':1,
			'participant' : 2,
			'manager' : 3,
			'admin' : 4
		};
		return {
			getValue: function(role) {
				return rolesEnum.hasOwnProperty(role) ? rolesEnum[role] : 0;
			}
		};
	}
]);
