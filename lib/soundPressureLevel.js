'use strict';

module.exports = require('./quantity')('SoundPressure')
    .base('Decibel', {
        names: [ 'db', 'dbs', 'decibel', 'decibels' ],
        prefix: true,
    })
    .build();
