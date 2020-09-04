const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	cid: {
		type: String,
		required: true
	},
	type: {
		type: String
	},
	length: {
		type: Number
	},
	width: {
		type: Number
	},
	height: {
		type: String
	},
	weight: {
		type: String
	},
	shipper: {
		type: String
	},
	origin: {
		type: String
	},
	destination: {
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

module.exports = mongoose.model('Asset', assetSchema);
