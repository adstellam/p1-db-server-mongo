const express = require('express');
const DeviceEngineSession = require('../models/DeviceEngineSession');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	if (req.query.t)
		filter.t = { $gt: req.query.t };
	DeviceEngineSession.find(filter).sort({ t: 'desc' }).exec(function(err, docs) {
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.post('/:id', function(req, res, next) {
	const session = new DeviceEngineSession(req.body);
	session.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
