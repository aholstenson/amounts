
const { expect } = require('chai');
const amount = require('../lib/amount');

describe('Amount', function() {
	it('Can create', function() {
		const value = amount('30');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
	});

	it('Can create with suffix', function() {
		const value = amount('30k');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30000);
	});
});
