const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	Customer.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Customer.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const customer = req.body;
	Customer.findOneAndReplace(filter, customer).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	const update = req.body;
	Customer.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	const filter = { id: req.params.id };
	Customer.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', function(req, res, next) {
	const customer = new Customer(req.body);
	customer.save(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(201).json(doc);
	});
});

module.exports = router;
