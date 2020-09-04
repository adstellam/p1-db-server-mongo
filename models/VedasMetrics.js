const mongoose = require('mongoose');

const vedasMetricsSchema = new mongoose.Schema({
	deviceId: {
		type: String,
		required: true,
		unique: true
	},
	vedasOn: {
		type: Boolean
	},
	engineOn: {
		type: Boolean
	},
	miles: {
		type: Number
	},
	lat: {
		type: Number
	},
	lng: {
		type: Number
	},
	speed: {
		type: Number
	},
	eyeClosure: {
		type: Number
	},
	headPose: {
		type: Number
	},
	laneAlign: {
		type: Number
	},
	t: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.models.VedasMetrics || mongoose.model('VedasMetrics', vedasMetricsSchema);
