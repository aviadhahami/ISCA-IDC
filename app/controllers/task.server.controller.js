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

var listHandler = {
    getTypes: function() {
        var deferred = Q.defer()
        Tasks.distinct('type').exec(function(err, types) {
            if (err) {
                deferred.resolve({ success: false, err: err });
            } else {
                deferred.resolve({ success: true, data: types });
            }
        });

        return deferred.promise;
    },
    getByGeneric: function(key, value) {
        var deferred = Q.defer();
        var filterObject = {};
        filterObject[key] = value;
        Tasks.find(filterObject).sort('-created').exec(function(err, tasks) {
           if (err) {
               deferred.resolve({ success: false, err: err });
           } else {
               deferred.resolve({ success: true, data: tasks });
           }
        });
        return deferred.promise;
    }
};

/**
 * List of tasks by dynamic
 */
exports.list = function(req, res) {

    // Get types
    var action = req.param('action');

    if (action == 'types') {
        listHandler.getTypes().then(function(response) {
           if (response.success) {
               res.status(200).json({ types: response.data });
           } else {
               res.status(403).json({ err: "Error getting types"});
           }
        });
    } else {
        // TODO SANITIZE THIS!
        // http://stackoverflow.com/questions/28710345/sanitize-user-input-in-mongoose
        var searchString = req.param('value');

        if (searchString) {
            if (action == 'type') {
                listHandler.getByGeneric('type', searchString).then(function(response) {
                   if (response.success) {
                       res.status(200).json({ tasks: response.data });
                   } else {
                       res.status(403).json({ err: "Error getting tasks"});
                   }
                });
            } else if (action == 'status') {
                listHandler.getByGeneric('status', searchString).then(function(response) {
                    if (response.success) {
                        res.status(200).json({ tasks: response.data });
                    } else {
                        res.status(403).json({ err: "Error getting tasks"});
                    }
                });
            } else { // Unrecognized
                res.status(403).json({ err: "Unknown action field"});
            }
        } else {
            res.status(403).json({ err: "Cannot perform action, value field is empty"});
        }
    }
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

