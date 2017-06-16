'use strict';

const amount = require('./lib/amount');
const angle = require('./lib/angle');
const duration = require('./lib/duration');
const energy = require('./lib/energy');
const illuminance = require('./lib/illuminance');
const length = require('./lib/length');
const mass = require('./lib/mass');
const power = require('./lib/power');
const pressure = require('./lib/pressure');
const speed = require('./lib/speed');
const temperature = require('./lib/temperature');
const volume = require('./lib/volume');

module.exports = {
	amount, generic: amount,
	angle, duration, energy, illuminance, length, mass, power, pressure, speed,
	temperature, volume
};
