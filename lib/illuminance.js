'use strict';

module.exports = require('./quantity')('illuminance')
    .base('lux', {
        names: [ 'lx', 'lux' ],
		prefix: true
    })
	.add('phot', {
		names: [ 'ph', 'phot' ],
		scale: 1000
	})
	.add('nox', {
		names: [ 'nx', 'nox' ],
		scale: 0.001
	})
	.add('foot-candle', {
		names: [ 'fc', 'lm/ft²', 'ft-c', 'foot-candle', 'foot-candles', 'foot candle', 'foot candles' ],
		scale: 10.764
	})
    .build();
