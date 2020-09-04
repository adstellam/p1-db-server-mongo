const express = require('express');
const Device = require('../models/Device');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	if (req.query.vehicleId == 'null')
		filter.vehicleId = { $type: 10 };
	Device.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Device.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const device = req.body;
	Device.findOneAndReplace(filter, device).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const update = req.body;
	Device.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Device.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const device = new Device(req.body);
	device.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
