'use strict';

//  'read more' section to be placed anywhere in the HTML.
//  should be placed like this example 
//  (otherwise, styling and functionality will not work):

//  <div>
// 		<div data-read-more-button align-to="left" theme=""></div>

// 		<anytag class="readmore-content">
// 			content to be displayed after the button is clicked.
// 		</anytag>
// 	</div>

//  NOTE 1: the button and content are required to be encapsulated 
//  under the same parent.

//  NOTE 2: the 'align-to' attribute allows us to change the 'text-align'
//  of the segment, so that we can have the button in center but the
//  appearing content aligned to the left for example.

//  Styling is controlled in core.css in the CUSTOM CLASSES FOR 
//  REPETITIVE ELEMENTS section.

//  NOTE 3: use 'theme="white-theme"' attribute when placing the 
//  button on blue / dark backgrounds.

angular.module('core').directive('readMoreButton', ['$timeout', function($timeout) {
  	return {
	    restrict: 'AE',
	    replace: 'true',
	    template: '<button class="readmore-btn" md-ink-ripple>Read More</button>',
	    link: function(scope, elem, attrs) {
	    	elem.addClass(attrs.theme);

	      	elem.bind('click', function() {
	      		$timeout(function() {
        			elem.css('display', 'none');
	      			elem.parent().css('text-align', attrs.alignTo);
		        	elem.next('readmore-content').addClass('active');
    			}, 200);
	      	});
	    }
  	};
}]);