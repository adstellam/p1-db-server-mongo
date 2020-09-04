const mongoose = require('mongoose');

const deviceEngineSessionSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	code: {
		type: String,
		enum: ['on', 'off'],
		required: true
	},
	t: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('DeviceEngineSession', deviceEngineSessionSchema);
