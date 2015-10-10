'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Return all of the current pending applications
 */
exports.pending = function(req, res) {
    User.find({ 'iscaData.applicationForm': { $exists: true } }, function(err, users) {

        // TODO Error map?
        if (err)
            res.status(500).json({ error: 'DAS0' });

        var usersFound = [];

        users.forEach(function(user) {
            usersFound.push(user.sanitize());
        });

        res.status(200).send(usersFound);
    });
};
