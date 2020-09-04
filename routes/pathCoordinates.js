const express = require('express');
const VedasMetrics = require('../models/VedasMetrics');

const router = express.Router();

router.get('/:id', function(req, res, next) {
	const pathStart = Date.now() - req.query.pathDuration*3600*1000;
	const filter = { 
		deviceId: req.params.id,
		t: { $gt: pathStart }
	};
	VedasMetrics.find(filter).select('lat lng').sort({ t: -1 }).exec(function(err, docs) {
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

module.exports = router;