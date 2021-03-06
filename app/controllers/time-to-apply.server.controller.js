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
    var fileName = 'timeToApply.json';
    var userId = req.user._id;
    var time = req.body.date;
    var file;
    fs.readFile(pathToFolder+fileName , 'utf8', function (err, data) {
        if (err) throw err;
        file = JSON.parse(data);
        file.date = time;
        file.editedBy = userId;
        fs.writeFile(pathToFolder+fileName, JSON.stringify(file), function (err) {
            if (err) {
                res.status(500).send({message:err})
            }

            res.status(200).send({message:'done'})
        });
    });



};

/**
 * Show the current Time to apply
 */
exports.get = function(req, res) {
    var fileName = 'timeToApply.json';
    fs.readFile(pathToFolder+fileName , 'utf8', function (err, data) {
        if (err) throw err;
        res.status(200).send(JSON.parse(data));
    });
};

