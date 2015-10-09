'use strict';

//  'faq' section to be placed anywhere in the HTML.
//  should be placed like this example 
//  (otherwise, styling and functionality will not work):

//  <div faqBlock entry="entry"></div>

//  Styling is controlled in core.css in the CUSTOM CLASSES FOR 
//  REPETITIVE ELEMENTS section.

angular.module('core').directive('faqBlock', [
    function() {
        var tpl = '<div class="faq-entry"><p class="question">{{entry.question}}</p><p class="answer">{{entry.answer}}</p></div>';
        
        return {
            scope: {
                entry: '='
            },
            restrict: 'AE',
            replace: true,
            terminal: false,
            template: tpl,
            link: function(scope, elem, attrs) {
                var q = elem.children('.question');
                var a = elem.children('.answer');

                q.bind('click', function() {
                    a.toggleClass('active');
                });
            }
        };
    }
]);
