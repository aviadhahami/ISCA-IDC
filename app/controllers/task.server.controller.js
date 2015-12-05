'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Tasks = mongoose.model('Tasks'),
    _ = require('lodash');

/**
 * Create a task
 */
exports.create = function(req, res) {
    var tasks = new Tasks(req.body);
    tasks.save(function(err) {
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
exports.read = function(req, res) {
    res.jsonp(req.task);
};

/**
 * Update a task
 */
exports.update = function(req, res) {
    var task = req.task ;

    task = _.extend(task , req.body);

    task.save(function(err) {
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
exports.delete = function(req, res) {
    var tasks = req.task ;

    tasks.remove(function(err) {
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
 * List of tasks
 */
exports.list = function(req, res) {
    Tasks.find().sort('-created').populate('user', 'displayName').exec(function(err, tasks) {
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
 * News middleware
 */
exports.tasksByID = function(req, res, next, id) {
    Tasks.findById(id).populate('user', 'displayName').exec(function(err, task) {
        if (err) return next(err);
        if (! task) return next(new Error('Failed to load Task' + id));
        req.task = task ;
        next();
    });
};

/**
 * Task authorization middleware
 */

// TODO : VERIFY
exports.hasAuthorization = function(req, res, next) {
    if(req.task.user){
        if (req.task.user.id !== req.user.id && req.user.roles !== 'admin' && req.user.roles !== 'manager') {
            return res.status(403).send('first,User is not authorized');
        }
    }else{
        if( req.user.roles !== 'admin' && req.user.roles !== 'manager'){
            return res.status(403).send('admin error,User is not authorized');
        }
    }

    next();
};

