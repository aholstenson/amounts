
const { expect } = require('chai');
const length = require('../lib/length');
const area = require('../lib/area');

describe('Sanity check', function() {
	it('Can create length', function() {
		const value = length(30);
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
		expect(value.unit).to.equal('m');
	});

	it('Can parse length', function() {
		const value = length('30 m');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
		expect(value.unit).to.equal('m');
	});

	it('Can parse length without unit', function() {
		const value = length('30');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
		expect(value.unit).to.equal('m');
	});

	it('Can parse length with long name', function() {
		const value = length('30 metres');
		expect(value).to.not.be.null;
		expect(value.value).to.equal(30);
		expect(value.unit).to.equal('m');
	});

	it('Can check if known unit', function() {
		const value = length(30);

		expect(value.is('meters')).to.equal(true);
	});

	it('Can check if unknown unit', function() {
		const value = length(30);

		expect(value.is('sticks')).to.equal(false);
	});

	it('Can convert length', function() {
		const value = length(30);

		expect(value.as('ft')).to.be.closeTo(98.42, 0.01);
	});

	it('Can convert length to other value', function() {
		const ft = length(30).to('feet');
		expect(ft.value).to.be.closeTo(98.42, 0.01);
		expect(ft.unit).to.equal('ft');
	});

	it('Create with SI-prefix', function() {
		const value = length(100, 'cm');
		expect(value.value).to.equal(100);
		expect(value.unit).to.equal('cm');

		expect(value.as('m')).to.equal(1);
	});

	it('Parse with SI-prefix', function() {
		const value = length('100 cm');
		expect(value.value).to.equal(100);
		expect(value.unit).to.equal('cm');

		expect(value.as('m')).to.equal(1);
	});

	it('Create with long SI-prefix', function() {
		const value = length('100 centimetre');
		expect(value.value).to.equal(100);
		expect(value.unit).to.equal('cm');

		expect(value.as('m')).to.equal(1);
	});

	it('Parse with long SI-prefix', function() {
		const value = length(100, 'centimetre');
		expect(value.value).to.equal(100);
		expect(value.unit).to.equal('cm');

		expect(value.as('m')).to.equal(1);
	});

	it('Parse with unknown SI-prefix', function() {
		expect(() => length('100 mum')).to.throw();
		expect(() => length('100 megagigameter')).to.throw();
	});

	it('Parse unknown', function() {
		expect(() => length('3 thingies')).to.throw(/Unsupported/);
		expect(() => length('3 cookiemeters')).to.throw(/Unsupported/);
		expect(() => length('3 im')).to.throw(/Unsupported/);
		expect(() => length('3 megafeet')).to.throw(/support prefixes/);
		expect(() => length('3 Mft')).to.throw(/support prefix/);
	});

	it('Parse units case insensitive', function() {
		const value = length('2 Meters');
		expect(value.unit).to.equal('m');
		expect(value.value).to.equal(2);
	});

	it('Parse units with spaces', function() {
		const value = area('2 sq in');
		expect(value.unit).to.equal('sq in');
		expect(value.value).to.equal(2);
	});

	it('Parse units with spaces case insensitive', function() {
		const value = area('2 Square metre');
		expect(value.unit).to.equal('m²');
		expect(value.value).to.equal(2);
	});

	it('Units with spaces get proper getters', function() {
		const value = area('2 m2');
		expect(() => value.squareInches).to.not.throw();
	});
});
