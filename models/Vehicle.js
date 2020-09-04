const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	cid: {
		type: String,
		required: true
	},
	vin: {
		type: String,
		required: true,
	},
	powerUnitNumber: {
		type: String
	},
	make: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	milesAtMilClear: {
		type: Number,
		required: true
	},
	trailerNumber: {
		type: [String]
	},
	shippingDocNumber: {
		type: [String]
	},
	deviceId: {
		type: String
	},
	createdAt: {
		type: Date
	},
	createdBy: {
		type: String
	},
	editedAt: {
		type: Date
	},
	editedBy: {
		type: String
	},
	active: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
