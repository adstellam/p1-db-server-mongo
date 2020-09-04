const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	cid: {
		type: String,
		required: true
	},
	hardwareVersion: {
		type: String,
		required: true
	},
	softwareVersion: {
		type: String,
		required: true
	},
	optionalPeripheral: {
		type: [String],
		required: true
	},
	ipAddress: {
		type: String,
		required: true
	},
	ipAddressType: {
		type: String,
		enum: ["IP4", "IP6"],
		required: true
	},
	nsp: {
		type: String
	},
	vehicleId: {
		type: String
	},
	driverId: {
		type: String
	},
	codriverId: {
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

module.exports = mongoose.model('Device', deviceSchema);
