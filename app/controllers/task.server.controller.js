'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Tasks = mongoose.model('Tasks'),
    _ = require('lodash'),
    q = require('q');

/**
 * Create a task
 */
exports.create = function (req, res) {
    var tasks = new Tasks(req.body);

    tasks.type = tasks.type.toLowerCase();
    tasks.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(tasks);
        }
    });
};

/**
 * Show the current task
 */
exports.read = function (req, res) {
    res.jsonp(req.task);
};

/**
 * Update a task
 */
exports.update = function (req, res) {
    var task = req.task;

    task = _.extend(task, req.body.task);
    task.type = task.type.toLowerCase();

    task.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Delete task
 */
exports.delete = function (req, res) {

    if (req.user.roles === 'admin') {
        var tasks = req.task;

        tasks.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(tasks);
            }
        });
    } else {
        res.status(403).send({message: 'Not an admin'});
    }
};

var listHandler = {
    getTypes: function () {
        var deferred = q.defer();
        Tasks.distinct('type').exec(function (err, types) {
            if (err) {
                deferred.resolve({success: false, err: err});
            } else {
                deferred.resolve({success: true, data: types});
            }
        });

        return deferred.promise;
    },
    getByGeneric: function (key, value) {
        var deferred = q.defer();
        var filterObject = {};
        filterObject[key] = value;
        Tasks.find(filterObject).sort('-created').exec(function (err, tasks) {
            if (err) {
                deferred.resolve({success: false, err: err});
            } else {
                deferred.resolve({success: true, data: tasks});
            }
        });
        return deferred.promise;
    }
};

/**
 * List of tasks by dynamic
 */
exports.list = function (req, res) {

    // Get types
    var action = req.param('action');

    if (action) {

        if (action == 'types') {
            listHandler.getTypes().then(function (response) {
                if (response.success) {
                    res.status(200).json({types: response.data});
                } else {
                    res.status(403).json({err: "Error getting types"});
                }
            });
        } else {

            // TODO SANITIZE THIS!
            // http://stackoverflow.com/questions/28710345/sanitize-user-input-in-mongoose
            var searchString = req.param('value');

            if (searchString) {
                if (action == 'type') {
                    listHandler.getByGeneric('type', searchString).then(function (response) {
                        if (response.success) {
                            res.status(200).json({tasks: response.data});
                        } else {
                            res.status(403).json({err: "Error getting tasks"});
                        }
                    });
                } else if (action == 'status') {
                    listHandler.getByGeneric('status', searchString).then(function (response) {
                        if (response.success) {
                            res.status(200).json({tasks: response.data});
                        } else {
                            res.status(403).json({err: "Error getting tasks"});
                        }
                    });
                } else { // Unrecognized
                    res.status(403).json({err: "Unknown action field"});
                }
            } else {
                res.status(403).json({err: "Cannot perform action, value field is empty"});
            }
        }
    } else {
        res.status(403).json({err: "No action field"});
    }
};


/**
 * News middleware
 */
exports.tasksByID = function (req, res, next, id) {
    Tasks.findById(id).populate('user', 'displayName').exec(function (err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load Task' + id));
        req.task = task;
        next();
    });
};

/**
 * Task authorization middleware
 */

exports.hasAuthorization = function (req, res, next) {
    if (req.task) {

        // Check if the task got picked
        if (req.task.hasOwnProperty('id')) {

            // if yes -> Check for id or role permission
            if (req.task.taken.id !== req.user.id && req.user.roles !== 'admin' && req.user.roles !== 'manager') {
                return res.status(403).send('User is not authorized');
            }
        }
    } else {
        if (req.user.roles !== 'admin' && req.user.roles !== 'manager') {
            return res.status(403).send('admin error,User is not authorized');
        }
    }

    next();
};

