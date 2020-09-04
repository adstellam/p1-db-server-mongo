const mongoose = require('mongoose');

const driverStatusSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	signedIn: {
		type: Boolean,
		required: true
	},
	signedInAsCodriver: {
		type: Boolean,
		required: true
	},
	dutyStatus: {
		type: String,
		enum: ["1", "2", "3", "4"],
		required: true
	},
	intentIndication: {
		type: String,
		enumb: ["1", "2", "3"],
		required: true
	}
});

module.exports = mongoose.model('DriverStatus', driverStatusSchema);
