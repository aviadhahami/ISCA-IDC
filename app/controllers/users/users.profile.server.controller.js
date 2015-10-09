'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

exports.updateRole = function(req,res){
	var admin = req.user;
	if (admin){
		console.log(admin);
		if(admin.roles === 'admin'){
			var requestedRole = req.body.requestedRole;
			var userToPromote = req.body.idToPromote;
			console.log('before User');
			User.findById(userToPromote,function(err,foundUser){
				foundUser.roles = requestedRole;
				foundUser.save(function(err){
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						req.login(admin, function(err) {
							if (err) {
								res.status(400).send(err);
							} else {
								res.json(foundUser);
							}
						});
					}
				});
			});
		}else{
			res.status(403).send({error : 'unauthorized'});
		}
	}else{
		res.status(400).send({error: 'no user'});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
