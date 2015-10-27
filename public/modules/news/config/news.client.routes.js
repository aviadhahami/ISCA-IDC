'use strict';

//Setting up route
angular.module('news').config(['$stateProvider',
	function($stateProvider) {
		// News state routing
		$stateProvider.
		state('listNews', {
			url: '/blogAndMagazine',
			templateUrl: 'modules/news/views/list-news.client.view.html'
		}).
		state('createNews', {
			url: '/blogAndMagazine/create',
			templateUrl: 'modules/news/views/create-news.client.view.html'
		}).
		state('viewNews', {
			url: '/blogAndMagazine/:newsId',
			templateUrl: 'modules/news/views/view-news.client.view.html'
		}).
		state('editNews', {
			url: '/blogAndMagazine/:newsId/edit',
			templateUrl: 'modules/news/views/edit-news.client.view.html'
		});
	}
]);
