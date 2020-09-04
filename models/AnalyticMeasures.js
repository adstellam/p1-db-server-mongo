const mongoose = require('mongoose');

const analyticMeasuresSchema = new mongoose.Schema({
	deviceId: {
		type: String,
		required: true,
		unique: true
	},
	riskScore: {
		type: Number
	},
	measure1: {
		type: Number
	},
	measure2: {
		type: Number
	},
	measure3: {
		type: Number
	},
	measure4: {
		type: Number
	},
	measure5: {
		type: Number
	},
	measure6: {
		type: Number
	},
	measure7: {
		type: Number
	},
	measure8: {
		type: Number
	},
	measure9: {
		type: Number
	},
	t: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.models.AnalyticMeasures || mongoose.model('AnalyticMeasures', analyticMeasuresSchema);
