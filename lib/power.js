'use strict';

module.exports = require('./quantity')('power')
    .base('watt', {
        names: [ 'w', 'W', 'watt', 'watts' ],
        prefix: true,
        exposePrefixes: [ 'kilo', 'mega' ]
    })
    .add('hp', {
        names: [ 'hp', 'horsepower', 'horsepowers' ],
        scale: 745.69987158227022
    })
    .build();
