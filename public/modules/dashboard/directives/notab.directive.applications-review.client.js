'use strict';
/**
 * Removes the tab wrapper for the application review state
 */
angular.module('dashboard').directive('noTabsWrapper', function($timeout) {
    return {
        restrict: 'A', // Element only
        replace: true,
        terminal: false,
        compile: function(scope, elem, attrs) {
            elem.$$element[0].children[0].style.display = 'none';
        }
    };
});
