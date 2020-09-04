const mongoose = require('mongoose');

const deviceSeqNumberSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	seqNumber: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('DeviceSeqNumber', deviceSeqNumberSchema);
