'use strict';

module.exports = require('./quantity')('area')
    .base('squareMetre', {
        names: [ 'm²', 'm^2', 'm2', 'square metre', 'square metres', 'square meter', 'square meters' ],
        prefix: 2,
        exposePrefixes: [ 'centi', 'kilo' ]
    })
    .add('squareInch', {
		names: [ 'sq in', 'square inch', 'square inches' ],
		scale: 0.00064516
	})
	.add('squareFoot', {
		names: [ 'sq ft', 'square foot', 'square feet' ],
		scale: 0.092903
	})
	.add('squareYard', {
		names: [ 'sq yard', 'square yard', 'square yards' ],
		scale: 0.836127
	})
	.add('squareMile', {
		names: [ 'sq mi', 'square mile', 'square miles' ],
		scale: 2589988.10
	})
	.add('hectare', {
		names: [ 'ha', 'hectare', 'hectares' ],
		scale: 10000
	})
	.add('acre', {
		names: [ 'acre', 'acres' ],
		scale: 4046.86
	})
    .build();
