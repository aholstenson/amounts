'use strict';

module.exports = require('./quantity')('energy')
    .base('joule', {
        names: [ 'J', 'j', 'joule', 'joules' ],
        prefix: true,
		exposePrefixes: [ 'kilo', 'mega' ]
    })
    .add('wh', {
        names: [ 'Wh', 'wh', 'watt hour', 'watt hours' ],
        scale: 3600,
        prefix: true,
        exposePrefixes: [ 'kilo', 'mega' ]
    })
    .build();
