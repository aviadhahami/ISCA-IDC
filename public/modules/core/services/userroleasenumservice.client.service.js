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
				// rolesArr is just a string.. don't worry about it..
				return rolesEnum.hasOwnProperty(rolesArr) ? rolesEnum[rolesArr] : 0;
			}
		};
	}
]);
