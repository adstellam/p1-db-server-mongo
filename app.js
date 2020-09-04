/**
 * Module dependencies & dotenv configuration
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJwt = require('passport-jwt');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Import models
 */
const Customer = require('./models/Customer');
const VedasUser = require('./models/VedasUser');
const Device = require('./models/Device');
const DeviceSeqNumber = require('./models/DeviceSeqNumber')
const Vehicle = require('./models/Vehicle');
const Driver = require('./models/Driver');
const DriverStatus = require('./models/DriverStatus');
const Asset = require('./models/Asset');
const EldEvent = require('./models/EldEvent');
const EldRecord = require('./models/EldRecord');
const VedasUserSession = require('./models/VedasUserSession');
const DeviceEngineSession = require('./models/DeviceEngineSession');
const DriverHosSession = require('./models/DriverHosSession');

/**
 * Import route handlers
 */
const customersRte = require('./routes/customers');
const vedasUsersRte = require('./routes/vedasUsers');
const devicesRte = require('./routes/devices');
const deviceSeqNumbersRte = require('./routes/deviceSeqNumbers');
const vehiclesRte = require('./routes/vehicles');
const driversRte = require('./routes/drivers');
const driverStatusesRte = require('./routes/driverStatuses');
const assetsRte = require('./routes/assets');
const eldEventsRte = require('./routes/eldEvents');
const eldRecordsRte = require('./routes/eldRecords');
const vedasUserSessionsRte = require('./routes/vedasUserSessions');
const deviceEngineSessionsRte = require('./routes/deviceEngineSessions');
const driverHosSessionsRte = require('./routes/driverHosSessions');
const pathCoordinatesRte = require('./routes/pathCoordinates');

/**
 * Passport configuration with Local & Jwt Strategies 
 */
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtPublicKey = fs.readFileSync('./jwtkeys/jwtpub.pem', 'utf8');
passport.use('local', new LocalStrategy(
	function(username, password, done) {
		VedasUser.findOne({ username: username }, function(err, user) {
			if (err) return done(err); 
			if (!user) return done(null, false);
			bcrypt.compare(password, user.password).then(pass => {
				if (!pass) return done(null, false);
				done(null, user)
			});
		});
	}
));
passport.use('jwt', new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: jwtPublicKey,
		algorithms: ["RS256"]
	}, 
	function(jwtPayload, done) {
		VedasUser.findOne({ username: jwtPayload.uid }, function(err, user) {
			if (err) return done(err);
			if (!user) return done(null, false);
			done(null, user); 
		});
	}
));
passport.serializeUser((user, done) => {
	done(null, user.username);
});
passport.deserializeUser((id, done) => { 
	VedasUser.findOne({ username: id }, function(err, user) {
		if (err) return done(err);
		if (!user) return done(null, false);
		done(null, user);
	});
});

/**
 * MongoDB connection
 */
mongoose.connect(
	`mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/vedas`, 
	{ poolSize: 5, socketTimeoutMS: 30000, useNewUrlParser: true, useUnifiedTopology: true }
	).catch( err => { console.log("[Mdb] Unable to establish connection"); });
mongoose.connection.on('error', err => { console.log("[Mdb] Connection lost"); });

/**
 * Express app configuration
 */
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	console.log(new Date(), req.method, req.path, req.body, req.query);
	if (req.headers.authorization)
		console.log(req.headers.authorization.slice(0, 21));
	next();
});

/**
 * Handle login requests.
 */
app.post('/api/login', (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) return next(err);
		//f (!user) res.redirect('/login');
		req.login(user, (err) => {
			if (err) return next(err);
			const jwtPayload = { iss: "CV Squared", uid: user.username, cid: user.cid, role: user.role };
			const jwtPrivateKey = fs.readFileSync('./jwtkeys/jwtkey.pem', 'utf8');
			const jwt = jsonwebtoken.sign(jwtPayload, jwtPrivateKey, { algorithm: 'RS256', expiresIn: '24h' });
			res.status(200).json({ jwt: jwt });			
		});
	})(req, res, next);
});

/**
 * Configure Express app with routes.
 */
app.use('/api/customers', passport.authenticate('jwt', { session: false }), customersRte);
app.use('/api/vedasUsers', passport.authenticate('jwt', { session: false }), vedasUsersRte);
app.use('/api/devices', passport.authenticate('jwt', { session: false }), devicesRte);
app.use('/api/deviceSeqNumbers', passport.authenticate('jwt', { session: false }), deviceSeqNumbersRte);
app.use('/api/vehicles', passport.authenticate('jwt', { session: false }), vehiclesRte);
app.use('/api/drivers', passport.authenticate('jwt', { session: false }), driversRte);
app.use('/api/driverStatuses', passport.authenticate('jwt', { session: false }), driverStatusesRte);
app.use('/api/assets', passport.authenticate('jwt', { session: false }), assetsRte);
app.use('/api/eldEvents', passport.authenticate('jwt', { session: false }), eldEventsRte);
app.use('/api/eldRecords', passport.authenticate('jwt', { session: false }), eldRecordsRte);
app.use('/api/vedasUserSessions', passport.authenticate('jwt', { session: false }), vedasUserSessionsRte);
app.use('/api/deviceEngineSessions', passport.authenticate('jwt', { session: false }), deviceEngineSessionsRte);
app.use('/api/driverHosSessions', passport.authenticate('jwt', { session: false }), driverHosSessionsRte);
app.use('/api/pathCoordinates', passport.authenticate('jwt', { session: false }), pathCoordinatesRte);

/**
 * Use default error handler.
 */
app.use(function(err, req, res, next) {
	console.log(err);
});

/**
 * Export the configured Express app.
 */
module.exports = app;
