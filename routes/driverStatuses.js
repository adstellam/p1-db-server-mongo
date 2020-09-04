const express = require('express');
const DriverStatus = require('../models/DriverStatus');

const router = express.Router();

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	DriverStatus.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const driverStatus = req.body;
	DriverStatus.findOneAndReplace(filter, driverStatus).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const update = req.body;
	DriverStatus.findOneAndUpdate(filter, { $set: update }, { new: true } ).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	DriverStatus.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const driverStatus = new DriverStatus(req.body);
	driverStatus.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
