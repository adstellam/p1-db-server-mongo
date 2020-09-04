const express = require('express');
const EldRecord = require('../models/EldRecord');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	EldRecord.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	EldRecord.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const record = req.body;
	EldRecord.findOneAndReplace(filter, record).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const update = req.body;
	EldRecord.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	EldRecord.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const record = new EldRecord(req.body);
	record.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
