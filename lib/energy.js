'use strict';

module.exports = require('./quantity')('energy')
    .base('joule', {
        names: [ 'J', 'j', 'joule', 'joules' ],
        prefix: true,
		exposePrefixes: [ 'kilo', 'mega' ]
    })
    .add('wh', {
        names: [ 'Wh', 'wh', 'wattHour', 'wattHours' ],
        scale: 3600,
        prefix: true,
        exposePrefixes: [ 'kilo', 'mega' ]
    })
    .build();
