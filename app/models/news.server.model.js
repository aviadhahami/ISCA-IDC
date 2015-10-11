'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * News Schema
 */
var NewsSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill News name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	imageData:{
		type: Schema.Types.Mixed,
		default : {
			0:''
		}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	content :{
		type: String,
		default : ''
	}
});

mongoose.model('News', NewsSchema);
