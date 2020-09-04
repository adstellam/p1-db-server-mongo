const express = require('express');
const Driver = require('../models/Driver');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;	
	Driver.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Driver.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const driver = req.body;
	Driver.findOneAndReplace(filter, driver).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const update = req.body;
	Driver.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Driver.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const driver = new Driver(req.body);
	driver.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
