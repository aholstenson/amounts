
const { expect } = require('chai');
const Length = require('../lib/length');

describe('Sanity check', function() {
	it('Can create length', function() {
		const value = new Length('30 m');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
		expect(value.unit).to.equal('m');
	});

	it('Can convert length', function() {
		const value = new Length(30);

		expect(value.as('ft')).to.be.closeTo(98.42, 0.01);
	});
});
