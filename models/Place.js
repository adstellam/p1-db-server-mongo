const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});

const placeSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	stateN: {
		type: Number
	},
	county: {
		type: String,
		required: true
	},
	countyN: {
		type: Number
	},
	latDms: {
		type: Number,
		required: true
	},
	lngDms: {
		type: Number,
		required: true
	},
	latDec: {
		type: Number,
		required: true
	},
	lngDec: {
		type: Number,
		required: true
	},
	geoJson: {
		type: pointSchema,
		required: true
	},
	elM: {
		type: Number
	},
	elFt: {
		type: Number
	},
	mapName: {
		type: String
	},
	dateCreated: {
		type: String,
		required: true
	},
	dateEdited: {
		type: String,
		required: true
	}
});

module.exports = mongoose.models.Place || mongoose.model('Place', placeSchema);
