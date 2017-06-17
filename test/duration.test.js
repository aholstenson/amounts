
const { expect } = require('chai');
const duration = require('../lib/duration');

describe('Duration', function() {
	it('Can parse single', function() {
		const value = duration('30 m');

		expect(value).to.not.be.null;
		expect(value.value).to.equal(30*60*1000);
		expect(value.unit).to.equal('ms');
	});

	it('Can parse multiple', function() {
		const value = duration('30 m 20 s');

		expect(value).to.not.be.null;
		expect(value.value).to.equal((30*60+20)*1000);
		expect(value.unit).to.equal('ms');
	});

	it('Can parse multiple (with comma)', function() {
		const value = duration('30 m, 20 s');

		expect(value).to.not.be.null;
		expect(value.value).to.equal((30*60+20)*1000);
		expect(value.unit).to.equal('ms');
	});
});
