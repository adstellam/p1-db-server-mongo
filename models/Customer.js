const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	},
	dotNumber: {
		type: String
	},
	streetAddress: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: Number
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	contactPerson: {
		type: String
	},
	logoFileName: {
		type: String
	},
	timezone: {
		type: String,
		enum: ['AST', 'EST', 'CST', 'MST', 'PST', 'AKST', 'ADT', 'EDT', 'CDT', 'MDT', 'PDT', 'AKDT']
	},
	eldDayStart: {
		type : Number,
		required: true
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
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Customer', customerSchema);
