'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    pathToFolder = './mini-db/';

/**
 * Create a Time to apply
 */
exports.set = function(req, res) {
    if (req.user.roles !== 'admin'){
        res.status(403).send({message:'unauthorized'});
    }
    var fileName = 'timeToApply.json'
    var userId = req.user._id
    var time = req.body.time;
    var file = require(pathToFolder+fileName);

    fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) return console.log(err)
        console.log(JSON.stringify(file))
        console.log('writing to ' + fileName)
    });
};

/**
 * Show the current Time to apply
 */
exports.get = function(req, res) {

};

