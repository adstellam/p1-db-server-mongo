const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	cid: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	licenseNumber: {
		type: String
	},
	licenseState: {
		type: String
	},
	phone: {
		type: String,
	},
	email: {
		type: String
	},
	eldExemptionStatus: {
		type: String
	},
	pictureFileName: {
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
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Driver', driverSchema);
