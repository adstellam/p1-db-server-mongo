const express = require('express');
const bcrypt = require('bcrypt');
const VedasUser = require('../models/VedasUser');

const router = express.Router();

router.get('/', function(req, res, next) {
	const filter = req.query;
	VedasUser.find(filter).exec(function(err, docs) { 
		if (err) 
			next(new Error(err));
		res.status(200).json(docs);
	});
});

router.get('/:id', function(req, res, next) {
	const filter = { username: req.params.id };
	VedasUser.findOne(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.put('/:id', (req, res, next) => {
	const filter = { username: req.params.id };
	const user = req.body;
	VedasUser.findOneAndReplace(filter, user).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(user);
	});
});

router.patch('/:id', function(req, res, next) {
	const filter = { username: req.params.id };
	const update = req.body;
	if (req.body.password) 
		bcrypt.hash(req.body.password, 10).then(hash => {
			update.password = hash;
			VedasUser.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
				if (err)
					next(new Error(err));
				res.status(200).json(doc);
			});
		})
	else
		VedasUser.findOneAndUpdate(filter, { $set: update }, { new: true }).exec(function(err, doc) {
			if (err)
				next(new Error(err));
			res.status(200).json(doc);
		});
});

router.delete('/:id', function(req, res, next) {
	let filter = { username: req.params.id };
	VedasUser.findOneAndDelete(filter).exec(function(err, doc) {
		if (err) 
			next(new Error(err));
		res.status(200).json(doc);
	});
});

router.post('/', (req, res, next) => {
	const user = new VedasUser(req.body);
	bcrypt.hash(user.password, 10).then(hash => {
		user.password = hash;
		user.save(function(err, user) {
			if (err) 
				next(new Error(err));
			res.status(201).json(user);
		});
	});
});

module.exports = router;
