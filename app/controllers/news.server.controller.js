'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	News = mongoose.model('News'),
	_ = require('lodash');

/**
 * Create a News
 */
exports.create = function(req, res) {
	var news = new News(req.body);
	news.user = req.user;
	news.content = req.body.content;

	news.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * Show the current News
 */
exports.read = function(req, res) {
	res.jsonp(req.news);
};

/**
 * Update a News
 */
exports.update = function(req, res) {
	var news = req.news ;

	news = _.extend(news , req.body);

	news.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * Delete an News
 */
exports.delete = function(req, res) {
	var news = req.news ;

	news.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * List of News
 */
exports.list = function(req, res) {
	News.find().sort('-created').populate('user', 'displayName').exec(function(err, news) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};


/**
 * News middleware
 */
exports.newsByID = function(req, res, next, id) {
	News.findById(id).populate('user', 'displayName').exec(function(err, news) {
		if (err) return next(err);
		if (! news) return next(new Error('Failed to load News ' + id));
		req.news = news ;
		next();
	});
};

/**
 * News authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if(req.news.user){
		if (req.news.user.id !== req.user.id && req.user.roles !== 'admin' && req.user.roles !== 'manager') {
			return res.status(403).send('first,User is not authorized');
		}
	}else{
		if( req.user.roles !== 'admin' && req.user.roles !== 'manager'){
			return res.status(403).send('admin error,User is not authorized');
		}
	}

	next();
};


exports.getBlogPosts = function(req,res){
	News.find({'type' : 'blog'}).sort('-created').exec(function(err,posts){
		if (err){
			res.status(400).send(err);
		}
		res.jsonp(posts);
	})
};

exports.getMagazinePost = function(req,res){
	News.find({'type' : 'magazine'}).sort('-created').exec(function(err,posts){
		if (err){
			res.status(400).send(err);
		}
		res.jsonp(posts);
	})
};
