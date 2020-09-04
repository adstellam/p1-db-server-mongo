const mongoose = require('mongoose');

/**
 * Create Schema
 */
const vedasUserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	cid: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['sysop', 'super', 'admin', 'driver'],
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	createdAt: {
		type: String
	},
	createdBy: {
		type: String
	},
	editedAt: {
		type: String
	},
	editedBy: {
		type: String
	},
	active: {
		type: Boolean
	}
});

/**
 * Export Model
 */
module.exports = mongoose.model('VedasUser', vedasUserSchema);
