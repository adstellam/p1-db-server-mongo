const express = require('express');
const VedasMetrics = require('../models/VedasMetrics');
const EldEvent = require('../models/EldEvent');
const Device = require('../models/Device');
const Vehicle = require('../models/Vehicle');
const Place = require('../models/Place');
const DeviceSeqNumber = require('../models/DeviceSeqNumber');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	EldEvent.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { _id: req.params.id };
	EldEvent.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { _id: req.params.id };
	const event = req.body;
	EldEvent.findOneAndReplace(filter, event).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { _id: req.params.id };
	const update = req.body;
	EldEvent.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	let filter = { _id: req.params.id };
	EldEvent.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const event = new EldEvent(req.body);
	getEldEventSeqNumber(req.body.deviceId).then(
		seq => {
			event.seqNumber = seq;
		}
	);
   /*
	*
	*
	const pipeline = [
		{
			$match: { 
				operationType: 'insert',
				'fullDocument.deviceId': req.body.deviceId
			}
		}
	];
    VedasMetrics.watch(pipeline).on('change', next => {
		event.lat = next.fullDocument.lat;
		event.lng = next.fullDocument.lng;
		getPlaceFromLatLng(next.fullDocument.lat, next.fullDocument.lng).then(
			place => {
				event.location = Object.keys(place).length ? `${place.distanceInMile} + " mi " + ${place.direction} + " of " + ${place.name} +", " + ${place.state}` : null;
			}
		);
		getMilesAtMilClear(req.body.deviceId).then(
			miles => {
				event.vehicleMiles = next.fullDocument.miles + miles;
			}
		);
		getEngineHours(req.body.deviceId).then(
			hours => {
				event.engineHours = hours;
			}
		);
		setTimeout(() => {
			event.save(function(err, doc) {
				if (err) 
					next(new Error(err));
				res.status(201).json(doc);
			});
		}, 1000);
	});
	*
	*
	*/
	//
	setTimeout(() => {
			event.save(function(err, doc) {
				if (err) 
					next(new Error(err));
				res.status(201).json(doc);
			});
		}, 5000);
	//
});

function getEldEventSeqNumber(deviceId) {
	return new Promise((resolve, reject) => {
		DeviceSeqNumber.findOne({ id: deviceId })
			.exec(function(err, doc) {
				if (err)
					reject(err);
				const seqNumber = doc.seqNumber + 1;
				DeviceSeqNumber.findOneAndUpdate({ id: doc.id }, { $set: { seqNumber: seqNumber }}, { new: true })
					.exec(function(err, doc) {
						if (err) 
							reject(err);
						resolve(seqNumber);
					})
			});
	});
}

function getPlaceFromLatLng(lat, lng, range=50000) {
	return new Promise((resolve, reject) => {
		let place = {};
		Place.find({ geoJson: { $near: { $geometry: { type: "Point", coordinates: [ lng, lat ] } }, $maxDistance: range } })
			.select({ name: 1, state: 1 })
			.exec(function(err, docs) {
				if (err) 
					reject(err);
				if (docs.length > 0) {
					place.name = docs[0].name;
					place.state = docs[0].stateAlpha;
					place.distanceInMile = calculateDistanceInMile(docs[0].geoJson.coordinates[1], docs[0].geoJson.coordinates[0], data.lat, data.lng);
					place.direction = calculateDirection(docs[0].geoJson.coordinates[1], docs[0].geoJson.coordinates[0], lat, lng);
				}
				resolve(place);
		});
	});
}

function calculateDistanceInMile(latPlace, lngPlace, latDevice, lngDevice) {
	let latPlaceRad = latPlace * Math.PI / 180;
	let latDeviceRad = latDevice * Math.PI / 180;
	let thetaRad = (lngPlace - lngDevice) * Math.PI / 180;
	var dist = Math.sin(latPlaceRad) * Math.sign(latDeviceRad) + Math.cos(latPlaceRad) * Math.cos(latDeviceRad) * Math.cos(thetaRad);
	if (dist > 1) {
		dist = 1;
	}
	distanceInKm = Math.acos(dist) * 180 / Math.PI * 111.189577;
	distanceInMile = dist / 1.609344;
	return distanceInMile;
}

function calculateDirection(latPlace, lngPlace, latDevice, lngDevice) {
	let rad = Math.atan2((lngDevice - lngPlace), (latDevice - latPlace));
	let deg = radian * 180 / Math.PI;
	let directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
	let directionIndex = Math.round(deg / 45);
	if (directionIndex < 0) {
		directionIndex = directionIndex + 8;
	}
	return directionArray[directionIndex];
}

function getMilesAtMilClear(deviceId) {
	return new Promise((resolve, reject) => {
		Device.findOne({ id: deviceId }).execute(function(err, doc) {
			if (err) 
				reject(err);
			const vehicleId = doc.vehicleId;
			Vehicle.findOne({ id: vehicleId }).execute(function(err, doc) {
				if (err) 
					reject(err);
				resolve(doc.milesAtMilClear);
			});
		});
	});
}

function getEngineHours(deviceId) {
	return new Promise((resolve, reject) => {

	});
}

module.exports = router;
