'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tasks = require('../../app/controllers/task.server.controller');

	// Tasks Routes
	app.route('/tasks')
			.get(tasks.list)
			.post(users.requiresLogin, tasks.create);

	// Access specific task
	app.route('/tasks/:taskId')
			.get(tasks.read)
			.put(users.requiresLogin, tasks.hasAuthorization, tasks.update)
			.delete(users.requiresLogin, tasks.hasAuthorization, tasks.delete);

	// Finish by binding the Tasks middleware
	app.param('taskId', tasks.tasksByID);
};
