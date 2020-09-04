const express = require('express');
const DeviceSeqNumber = require('../models/DeviceSeqNumber');

const router = express.Router();

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	DeviceSeqNumber.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	DeviceSeqNumber.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const deviceSeqNumber = new DeviceSeqNumber(req.body);
	deviceSeqNumber.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
