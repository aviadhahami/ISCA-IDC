'use strict';

module.exports = function(app) {

	var dashboard = require('../../app/controllers/dashboard.server.controller');
	app.route('/api/dashboard/pending').get(dashboard.pending);

};
