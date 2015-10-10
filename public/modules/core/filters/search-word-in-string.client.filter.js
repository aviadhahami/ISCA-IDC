// Searches a given string in a given input, will search ONLY sequential strings
angular.module('core').
	filter('searchWordInString', function() {
		return function(input,whatWeSearch) {
			if (whatWeSearch && input) {
				var res = [];
				input.forEach(function(obj){
					if (obj.hasOwnProperty('displayName')) {
						if (obj.displayName.indexOf(whatWeSearch) > -1) {
							res.push(obj);
						}
					}
				});
				return res;
			}
			return input;
		}
	});
