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
			getValue: function(rolesArray) {
				if (rolesArray.length === 0) return 0;
				var max =0 ;
				for (var i =0; i<rolesArray.length;i++){
					if (rolesEnum.hasOwnProperty(rolesArray[i])){
						max = max < rolesEnum[rolesArray[i]] ? rolesEnum[rolesArray[i]] : max;
					}
				}
				return max;
			}
		};
	}
]);
