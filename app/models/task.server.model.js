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
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status:{
        type : String,
        default: 'new',
        enum:['new','active','done']
    },
    closedBy:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    description:{
        type: String,
        default : '',
        required: 'Please add description'
    },
    content :{
        type: String,
        default : '',
        required : 'Please add content'
    },
    value:{
        type: Number,
        default:0,
        required: 'Please add time value'
    }
});

mongoose.model('Tasks', TaskSchema);
