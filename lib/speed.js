'use strict';

module.exports = require('./quantity')('speed')
    .base('mps', {
        names: [ 'm/s', 'mps', 'metersPerSecond', 'metresPerSecond', 'metres/second', 'meters/second' ],
        prefix: true
    })
    .add('kmh', {
        names: [ 'km/h', 'kph', 'kilometersPerHour', 'kilometresPerHour', 'kilometres/hour', 'kilometers/hour' ],
        scale: 1000 / 3600
    })
    .add('mph', {
        names: [ 'mph', 'milesPerHour', 'miles/hour' ],
        scale: 0.44704
    })
    .add('fps', {
        names: [ 'ft/s', 'fps', 'footPerSecond', 'feetPerSecond', 'foot/second', 'feet/second' ],
        scale: 0.3048
    })
    .add('knot', {
        names: [ 'kt', 'knot', 'knots' ],
        scale: 0.514444
    })
    .build();
