'use strict';

function noop(value) {
    return value;
}

const prefixDefinitions = [
    {
        names: [ 'y', 'yocto' ],
        scale: 1e-24
    },
    {
        names: [ 'z', 'zepto' ],
        scale: 1e-21
    },
    {
        names: [ 'a', 'atto' ],
        scale: 1e-18
    },
    {
        names: [ 'f', 'femto' ],
        scale: 1e-15
    },
    {
        names: [ 'p', 'pico' ],
        scale: 1e-12
    },
    {
        names: [ 'n', 'nano' ],
        scale: 1e-9
    },
    {
        names: [ 'u', 'micro', 'mc', '\u03BC', '\u00B5' ],
        scale: 1e-6
    },
    {
        names: [ 'm', 'milli' ],
        scale: 1e-3
    },
    {
        names: [ 'c', 'centi' ],
        scale: 1e-2
    },
    {
        names: [ 'd', 'deci' ],
        scale: 1e-1
    },
    {
        names: [ 'da', 'deca', 'deka' ],
        scale: 1e1
    },
    {
        names: [ 'h', 'hecto' ],
        scale: 1e2
    },
    {
        names: [ 'k', 'kilo' ],
        scale: 1e3
    },
    {
        names: [ 'M', 'mega' ],
        scale: 1e6
    },
    {
        names: [ 'G', 'giga' ],
        scale: 1e9
    },
    {
        names: [ 'T', 'tera' ],
        scale: 1e12
    },
    {
        names: [ 'P', 'peta' ],
        scale: 1e15
    },
    {
        names: [ 'E', 'exa' ],
        scale: 1e18
    },
    {
        names: [ 'Z', 'zetta' ],
        scale: 1e21
    },
    {
        names: [ 'Y', 'yotta' ],
        scale: 1e24
    }
];

const prefixes = createUnits(prefixDefinitions);

const SIGN = '[+-]';
const INT = '\\d+';
const SIGNED_INT = SIGN + '?' + INT;
const FRACTION = '\\.' + INT;
const FLOAT = '(?:' + INT + '(?:' + FRACTION + ')?)' + '|(?:' + FRACTION + ')';
const EXP = '[Ee]' + SIGNED_INT;
const EXP_NUMBER = '(?:' + FLOAT + ')(?:' + EXP + ')?';
const NUMBER = SIGN + '?\\s*' + EXP_NUMBER;

function normalizeUnitName(name) {
    return name.replace(/\s+(\w|$)/g, (m, c) => c.toUpperCase());
}

function unitToLower(name) {
    return name.length > 2 ? name.toLowerCase() : name;
}

/**
 * Map a list of conversions into an object where each name is represented
 * as a key.
 */
function createUnits(conversions) {
    const result = {};
    conversions.forEach(c => c.names.forEach(name =>
        result[unitToLower(normalizeUnitName(name))] = Object.assign({ name: c.names[0] }, c)
    ));
    return result;
}

/**
 * Create a case insensitive part of a regex by taking each letter in a
 * string and turning it into `[Aa]`.
 */
function caseInsensitivePart(value) {
    let result = [];
    for(let i=0; i<value.length; i++) {
        const c = value[i];
        const l = c.toLowerCase();
        const u = c.toUpperCase();

        if(l !== u) {
            result.push('[' + l + u + ']');
        } else {
            result.push(l);
        }
    }
    return result.join('');
}

/**
 * Create a regex for the given associative object.
 */
function createUnitRegex(units) {
    return Object.keys(units)
        .sort((a, b) => b.length - a.length)
        .map(unit => unit.length > 2 ? caseInsensitivePart(unit) : unit)
        .join('|');
}

/**
 * Create a method that calls as for the given unit.
 */
function createAs(unit) {
    return function() {
        return this.as(unit);
    };
}

class Factory {
    constructor(name, base, conversions, multiple) {
        this.name = name;
        this.base = base;
        this.conversions = conversions;
        this.units = createUnits(conversions);
        this.multiple = multiple;

        let parsing = this.parsing = {};
        parsing.unitPart = createUnitRegex(this.units);
        //parsing.unitEndRegExp = new RegExp('(' + parsing.unitPart + ')\s*$');
        parsing.prefixPart = createUnitRegex(prefixes);
        //parsing.prefixRegExp = new RegExp('(' + parsing.prefixPart + ')+');
        parsing.single = new RegExp('^\\s*(' + NUMBER + ')\\s*(.+?)?\\s*$');
        parsing.multiple = new RegExp('\\s*' + NUMBER + '\\s*(?:[a-zA-Z0-9]+)?\\s*', 'g');
        parsing.unit = new RegExp('(' + parsing.prefixPart + ')?(' + parsing.unitPart + ')$');

        // Create the instance factory
        const Value = this.Value = function(value, unit) {
            this.value = value;
            this.unit = unit;
        };

        Object.defineProperty(this.Value.prototype, 'amounts:type', {
            value: name,
        });

        const self = this;

        /*
         * Method that converts the current value into another unit and
         * returns just the converted number
         */
        this.Value.prototype.as = function(unit) {
            if(this.unit === unit) {
                return this.value;
            }

            return self.convert(this.value, this.unit, unit);
        };

        /*
         * Convert this value into another unit and return it as an object.
         */
        this.Value.prototype.to = function(unit) {
            // Resolve the unit to use
            unit = self._findConversion(unit).name;
            if(this.unit === unit) {
                return this;
            }
            const v = self.convert(this.value, this.unit, unit);
            return new Value(v, unit);
        };

        /**
         * Check if the value is using the given unit.
         */
        this.Value.prototype.is = function(unit) {
            unit = self._findConversion(unit, false);
            if(! unit) return false;

            return this.unit === unit.name;
        };

        // Go through all conversions and expose getters for them
        for(let key of Object.keys(this.conversions)) {
            const conversion = this.conversions[key];
            for(let cName of conversion.names) {
                Object.defineProperty(this.Value.prototype, normalizeUnitName(cName), {
                    get: createAs(cName)
                });
            }

            for(let pId of conversion.exposePrefixes) {
                const prefix = prefixes[pId];
                for(let pName of prefix.names) {
                    for(let cName of conversion.names) {
                        let unitName = pName + normalizeUnitName(cName);
                        Object.defineProperty(this.Value.prototype, unitName, {
                            get: createAs(unitName)
                        });
                    }
                }
            }
        }
    }

    _instance(value, unit) {
        return new this.Value(value, unit);
    }

    create(value, unit) {
        if(value instanceof this.Value) {
            return value;
        }

        const type = typeof value;
        if(type === 'string') {
            // TODO: Properly parse
            return this._parse(value);
        } else if(type === 'number') {
            if(unit) {
                unit = this._findConversion(unit).name;
            }
            return this._instance(value, unit || this.base);
        } else if(type === 'object') {
            unit = this._findConversion(unit).name;
            return this.create(value.value, unit);
        } else {
            throw new Error('Unable to create value');
        }
    }

    _findConversion(unit, throwErrors=true) {
        unit = unitToLower(normalizeUnitName(unit));
        const c = this.units[unit];
        if(c) return c;

        const parsed = this.parsing.unit.exec(unit);
        if(! parsed) {
            if(throwErrors) {
                throw new Error('Unsupported unit: ' + unit);
            } else {
                return null;
            }
        }

        const lastPart = parsed[parsed.length - 1];
        const baseUnit = this.units[lastPart];
        let shortUnit = baseUnit.names[0];
        let scale = 1;
        if(baseUnit.prefix) {
            // This unit supports prefixes, check if we have been given a supported prefix
            if(parsed.length > 2) {
                const prefix = prefixes[parsed[1]];
                if(! prefix) {
                    throw new Error('Unsupported unit, resolved to `' + baseUnit.name + '` but could not parse prefix of full unit: ' + unit);
                }
                scale = baseUnit.prefix > 1 ? Math.pow(prefix.scale, baseUnit.prefix) : prefix.scale;
                shortUnit = prefix.names[0] + shortUnit;
            }
        } else {
            // Unit does not support prefixes, make sure we don't have one
            if(parsed.length > 2) {
                if(throwErrors) {
                    throw new Error('Unit `' + parsed[parsed.length - 1] + '` does not support prefixes, can not parse: ' + unit);
                } else {
                    return null;
                }
            }
        }

        if(scale == 1) {
            return baseUnit;
        } else {
            this.units[shortUnit] = {
                name: shortUnit,

                toBase: function(value) {
                    return baseUnit.toBase(value * scale);
                },

                fromBase: function(value) {
                    return baseUnit.fromBase(value) / scale;
                }
            };

            return this.units[shortUnit];
        }
    }

    convert(value, unit, newUnit) {
        if(unit === newUnit) return value;

        let from = this._findConversion(unit);
        let to = this._findConversion(newUnit);

        const base = from.toBase(value);
        return to.fromBase(base);
    }

    _parseSingle(value) {
        const parts = this.parsing.single.exec(value);
        if(! parts) {
            throw new Error('Unable to parse ' + this.name + ': ' + value);
        }
        const number = parts[1]
        let unit = parts[2];
        if(! unit) {
            unit = this.base;
        }

        // Verify that we can parse the unit
        unit = this._findConversion(unit).name;

        let amount = parseFloat(number);
        if(this.base === '') {
            // Special case for generic amount
            amount = this.units[unit].toBase(amount);
            unit = '';
        }

        return [ amount, unit ];
    }

    _parse(value) {
        if(this.multiple) {
            this.parsing.multiple.lastIndex = 0;
            let baseValue = 0;
            let parsed;
            while((parsed = this.parsing.multiple.exec(value))) {
                let v = this._parseSingle(parsed[0]);
                baseValue += this.convert(v[0], v[1], this.base);
            }

            return this._instance(baseValue, this.base);
        } else {
            const v = this._parseSingle(value);

            return this._instance(v[0], v[1]);
        }
    }
}

class QuantityBuilder {
    constructor(name) {
        this.name = name;
        this.conversions = [];
    }

    multiple() {
        this._multiple = true;
        return this;
    }

    base(name, opts) {
        this._base = name;
        this.conversions.push({
            names: opts.names,
            prefix: opts.prefix || false,
            exposePrefixes: opts.exposePrefixes || [],
            toBase: noop,
            fromBase: noop
        });

        return this;
    }

    add(name, opts) {
        let toBase;
        let fromBase;
        if(opts.scale) {
            toBase = function(value) {
                return value * opts.scale;
            };

            fromBase = function(value) {
                return value / opts.scale;
            }
        } else {
            toBase = opts.toBase;
            fromBase = opts.fromBase;
        }

        this.conversions.push({
            names: opts.names,
            prefix: opts.prefix || false,
            exposePrefixes: opts.exposePrefixes || [],
            toBase: toBase,
            fromBase: fromBase,
        });

        return this;
    }

    build() {
        if(! this._base) {
            this.base('', { names: [ '' ], prefix: true })
        }

        const factory = new Factory(this.name, this._base, this.conversions, this._multiple);
        const result = function() {
            return factory.create.apply(factory, arguments);
        };
        result.toJSON = function(value) {
            return {
                value: value.value,
                unit: value.unit
            }
        };
        result.is = function(value) {
            return factory.name === value['amounts:type'];
        };
        return result;
    }
}

module.exports = function(name) {
    return new QuantityBuilder(name);
};
