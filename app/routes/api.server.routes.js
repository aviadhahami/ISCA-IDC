'use strict';

module.exports = function(app) {

	var dashboard = require('../../app/controllers/dashboard.server.controller');
	var timeToApply = require('../../app/controllers/time-to-apply.server.controller');
	app.route('/api/dashboard/pending').get(dashboard.pending);

	// Time to apply routes
	app.route('/api/timeToApply').get(timeToApply.get);
	app.route('/api/timeToApply').post(timeToApply.set);
};
