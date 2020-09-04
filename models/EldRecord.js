const mongoose = require('mongoose');

const eldRecordSchema = new mongoose.Schema({
	driverId: {
		type: String,
		required: true
	},
	dateStr: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: true
	},
	eldEventSeqStr: {
		type: String,
		required: true
	},
	urlPdfFile: {
		type: String
	},
	certifiedAt: {
		type: Date
	},
	certifiedBy: {
		type: String
	},
	certifiedCount: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('EldRecord', eldRecordSchema);
