'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Tasks Schema
 */
var TaskSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: 'Please fill name',
        trim: true
    },
    type: {
        type: String,
        default: '',
        required: 'Please fill type'
    },
    created: {
        date: {
            type: Date,
            default: Date.now
        },
        name: String,
        id: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'active', 'done']
    },
    taken: {
        name: String,
        date: {
            type: Date,
            default: 0
        },
        id: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    closed: {
        date: {
            type: Date,
            default: 0
        },
        name: String,
        id: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    description: {
        type: String,
        default: '',
        required: 'Please add description'
    },
    content: {
        type: String,
        default: '',
        required: 'Please add content'
    },
    timeTaken: {
        type: Number,
        default: 0,
        required: 'Please add time value'
    }
});

mongoose.model('Tasks', TaskSchema);
