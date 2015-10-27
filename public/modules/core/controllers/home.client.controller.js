'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Userroleasenumservice','$q','NewsGetterService',
	function($scope, Authentication, Userroleasenumservice,$q,NewsGetterService) {
		// This provides Authentication context.
		$scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
		$scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

		// Facebook Graph API init
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=541429809365422";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		// End Facebook init

		// TODO: Get Facebook page posts (ISCAorg) using Graph API

		//console.log($scope.userLevel);
		// Controls the participant / volunteer overview tabs
		$scope.participationType = 'participant';
		$scope.changeParticipationType = function (type) {
			if (type !== 'participant' && type !== 'volunteer')
				type = 'participant';
			$scope.participationType = type;
		};

		// Content for FAQ section
		$scope.faqEntries = [
			{
				index:    1,
				question: "Why should my university get in on this?",
				answer:   "This  program was introduced to the academic world so that there could be a strong and  unimpaired backbone to our cause. Higher education institutes have been working to promote community service and extracurricular activities for the past decade, believing that students can benefit both themselves and their environment by taking part in such actions. With the rise of the virtual world, hatred now spreads faster and in a more destructive way - disguising itself as freedom of speech and mostly comes from anonymous sources. Nevertheless, we are now capable of facing global scale issues. We have the option of researching into how hatred is spread through viral propaganda, disproof prejudice and even establish legal clinics that can help cope with ongoing violations. Antisemetism is on a constant rise. Jews are being beaten in streets and are forced to move in order to avoid ongoing discrimination. We hope to expand into other academic institutions, enroll students that can help with combating these occurrences while gaining academic knowledge that will eventually create a rise in awareness and a decline in unfortunate instances."
			},
			{
				index:    2,
				question: "Why should my university get in on this?",
				answer:   "This  program was introduced to the academic world so that there could be a strong and  unimpaired backbone to our cause. Higher education institutes have been working to promote community service and extracurricular activities for the past decade, believing that students can benefit both themselves and their environment by taking part in such actions. With the rise of the virtual world, hatred now spreads faster and in a more destructive way - disguising itself as freedom of speech and mostly comes from anonymous sources. Nevertheless, we are now capable of facing global scale issues. We have the option of researching into how hatred is spread through viral propaganda, disproof prejudice and even establish legal clinics that can help cope with ongoing violations. Antisemetism is on a constant rise. Jews are being beaten in streets and are forced to move in order to avoid ongoing discrimination. We hope to expand into other academic institutions, enroll students that can help with combating these occurrences while gaining academic knowledge that will eventually create a rise in awareness and a decline in unfortunate instances."
			}
		];

		// Returns true if using mobile device (phone / tablet / etc.)
		// based on WURFL.js service from http://web.wurfl.io/ 
		$scope.isMobile = function () {
			return WURFL.is_mobile;
		};

		$q.all([NewsGetterService.getMagazinePosts(),NewsGetterService.getBlogPosts()]).then(function(values){
			console.log(values);

			$scope.sections[1].data=values[0].data;
			$scope.sections[2].data = values[1].data;
			console.log($scope.sections)
		});

		// Sections implementation
		$scope.sections = [
			{
				title:'News feed',
				data:[]
			},
			{
				title:'Magazine',
				data:[]
			},
			{
				title:'Blog',
				data:[]
			}

		]
	}
]);
