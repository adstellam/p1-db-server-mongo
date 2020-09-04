const mongoose = require('mongoose');

const eldEventSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	deviceId: {
		type: String,
		required: true
	},
	driverId: {
		type: String,
		required: true
	},
	seqNumber: {
		type: Number
	},
	version: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		enum: ["1", "2", "3", "4"],
		required: true
	},
	/*
	 *  1: Active
	 *  2: Inactive/changed
	 *  3: Inactive/changed requested
	 *  4: Inactive/changed rejected
	*/
	origin: {
		type: String,
		enum: ["1", "2", "3", "4"],
		required: true
	},
	/*  
	 *  1: Auto
	 *  2: Driver
	 *  3: Support personnel
	 *  4: Assumed from unauthentical driver profile
	*/
	type: {
		type: String,
		enum: [ "1", "2", "3", "4", "5", "6", "7" ],
		required: true
	},
	/*
	 *  1: Change in driver's duty status [codes 1 - 4]
	 *  2: Intervening logging [codes 1 - 2]
	 *  3: Change in driver's indication re personal use of vehicle [codes 1 - 3]
	 *  4: Driver's certification of event records [codes 1 - 9]
	 *  5: Login [code 1] and logout [code 2]
	 *  6: Engine powerup [code 1 or 2] and shutdown [code 3 or 4]
	 *  7: Malfuction or data diagnostic event detection
	*/
	code: {
		type: String,
		enum: [ "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		required: true
	},
	/*
	 *  For type 1
	 *  	1: OFF (Off-duty)
	 *  	2: SB (Sleeper Berth)
	 *  	3: D (Dring)
	 *  	4: ON (On-duty not driving)
	 *  For type 2
	 *      1: Intervening logging with conventional location precision (2 decimal)
	 *      2: Intervening logging with reduced location precision (1 decimal)
	 *  For type 3
	 *		1: PC (Personal use)
	 *		2: YM (Yard move)
	 *		3: CL (Personal use/yard move cleared)
	 *  For type 4
	 *      1: First certification
	 *      n: n-th (re)certification (n <= 9) 
	 *  For type 5
	 *      1: Driver login
	 *      2: Driver logout
	 *  For type 6
	 *      1: Engine power-up
	 *      2: Engine power-up with reduced precision
	 *      3: Engine power-down
	 *      4: Engine power-down with reduced precision
	 *  For type 7
	 *      1: Malfunction
	 *      2: Malfunction cleared
	 *      3: Data diagonostic event
	 *      4: Data diagonostic event cleared
	*/
	vehicleMiles: {
		type: Number
	},
	engineHours: {
		type: Number
	},
	lat: {
		type: Number
	},
	lng: {
		type: Number
	},
	location: {
		type: String
	},
	malIndicatorStatus: {
		type: String
	},
	ddeIndicatorStatus: {
		type: String
	},
	mdeCode: {
		type: String
	},
	comment: {
		type: String
	},
	dateStr: {
		type: String,
		required: true
	},
	timeStr: {
		type: String, //YYYYMMDD
		required: true
	}
});

module.exports = mongoose.model('EldEvent', eldEventSchema);
