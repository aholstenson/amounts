# Amounts

Measurements and unit conversions for JavaScript. Supports angle, duration,
energy, illuminance, length, mass, power, pressure, speed, temperature, volume
and generic amounts.

```javascript
const { length, duration } = require('amounts');

const value = length('30 m');
console.log(length.as('ft'));

console.log(length('98 ft').as('cm'));

console.log(duration('20 m, 4 s'));
```

## API

All amounts that can be represented share a common API. Factories support:

* `factory(string)`

    Parse the given string into an amount.

* `factory(value, unit)`

    Create an amount with the given value and unit.

* `factory(value)`

    Create an amount with the given value and the default unit.

Instances have the following API:

* `amount.value: Number`

    Get the value of the amount.

* `amount.unit: String`

    Get the unit of the amount.

* `amount.as(unit): Number`

    Convert the amount to the given unit and return the result as a number.

* `amount.to(unit): Amount`

    Convert the amount into another unit and return an object with the value.

Every amount also exposes getters for the most commonly used units:

```javascript
length('20 cm').meters
length('19 ft').cm

volume(1, 'l').oz
```

## Generic amounts

The generic amount does not have any units, but supports SI-prefixes.

```javascript
const { generic } = require('amounts');

// Without any unit, returns an amount with value 20
console.log(generic(20));

// With a generic SI-unit, returns an amount with value 20000
console.log(generic('20k'));

// Full length names are supported
console.log(generic('20 micro'))
```

## SI-prefixes

Units in the SI system can be combined with SI-prefixes to create a new unit.
SI-prefixes are supported both by their short names and their long names.
Examples: `cm`, `milliliters`, 'hPa', 'MW', 'kilowatt'

Long Name      | Short name     | Factor
---------------|----------------|---------------------
`yocto`        | `y`            | 10<sup>-24</sup>
`zepto`        | `z`            | 10<sup>-21</sup>
`atto`         | `a`            | 10<sup>-18</sup>
`femto`        | `f`            | 10<sup>-15</sup>
`pico`         | `p`            | 10<sup>-12</sup>
`nano`         | `n`            | 10<sup>-9</sup>
`micro`        | `u`, `mc`, `µ` | 10<sup>-6</sup>
`milli`        | `m`            | 10<sup>-3</sup>
`centi`        | `c`            | 10<sup>-2</sup>
`deci`         | `d`            | 10<sup>-1</sup>
`deca`, `deka` | `da`           | 10<sup>1</sup>
`hecto`        | `h`            | 10<sup>2</sup>
`kilo`         | `k`            | 10<sup>3</sup>
`mega`         | `M`            | 10<sup>6</sup>
`giga`         | `G`            | 10<sup>9</sup>
`tera`         | `T`            | 10<sup>12</sup>
`peta`         | `P`            | 10<sup>15</sup>
`exa`          | `E`            | 10<sup>18</sup>
`zetta`        | `Z`            | 10<sup>21</sup>
`yotta`        | `Y`            | 10<sup>24</sup>

## Angle

```javascript
const { angle } = require('amounts');

console.log(angle(2, 'rad'));
console.log(angle('5 degrees').as('radians'));
```

Unit         | SI   | Names
-------------|------|--------------------
Degree       | No   | `deg`, `degree`, `degrees`
Radian       | Yes  | `rad`, `radian`, `radians`

## Duration

Durations represent a number of milliseconds something takes. Multiple units
can be combined into a value.

```javascript
const { duration } = require('amounts');

console.log(duration(2000)); // Defaults to milliseconds
console.log(duration('1d'));
console.log(duration('2h 10m'));
console.log(duration('2 days, 5 hours'));
```

Unit         | SI   | Names
-------------|------|---------------------------
Milliseconds | No   | `ms`, `millisecond`, `milliseconds`
Seconds      | No   | `s`, `second`, `seconds`
Minutes      | No   | `m`, `minute`, `minutes`
Hours        | No   | `h`, `hour`, `hours`
Days         | No   | `d`, `day`, `days`

## Energy

```javascript
const { energy } = require('amounts');

console.log(energy(10)); // Joules
console.log(energy('3.5 kJ').kWh);
```

Unit         | SI   | Names
-------------|------|--------------------
Joules       | Yes  | `J`, `j`, `joule`, `joules`
Watt hours   | True | `Wh`, `wh`, `wattHour`, `wattHours`

## Illuminance

```javascript
const { illuminance } = require('amounts');

console.log(illuminance(2, 'lux'));
console.log(angle('8000 lux'));
```

Unit         | SI   | Names
-------------|------|--------------------
Lux          | No   | `lux`


## Length

```javascript
const { length } = require('amounts');

console.log(length(2)); // Meters
console.log(length('5 ft').as('micrometer'));
console.log(length('2 ft ').cm);
```

Unit         | SI   | Names
-------------|------|--------------------
Metre        | Yes  | `m`, `meter`, `meters`, `metre`, `metres`
Inch         | No   | `in`, `inch`, `inches`
Feet         | No   | `ft`, `foot`, `feet`
Yard         | No   | `yd, `yard`, `yards`
Mile         | No   | `mi`, `mile`, `miles`

## Mass

```javascript
const { mass } = require('amounts');

console.log(mass(210)); // Grams
console.log(mass('78 kg').lbs);
console.log(mass('2 stone').kg)
```

Unit         | SI   | Names
-------------|------|--------------------
Gram         | Yes  | `g`, `gram`, `grams`, `gramme`, `grammes`
Pound        | No   | `lb`, `lbs`, `pound`, `pounds`, `#`
Ounce        | No   | `oz`, `ounce`, `ounces`
Stone        | No   | `st`, `stone`, `stones`

## Power

```javascript
const { power } = require('amounts');

console.log(power(500)); // Watts
console.log(power('6000 kW').mW);
console.log(power('6 hp').as('microwatts'));
```

Unit         | SI   | Names
-------------|------|--------------------
Watt         | Yes  | `w`, `W`, `watt`
Horsepower   | No   | `hp`, `horsepower`

## Pressure

```javascript
const { pressure } = require('amounts');

console.log(pressure(500)); // Pascal
console.log(power('700 hPa').atm);
console.log(power('7 bar').kPa);
```

Unit         | SI   | Names
-------------|------|--------------------
Pascal       | Yes  | `pa`, `Pa`, `pascal`
Atmosphere   | No   | `atm`, `atmosphere`, `athmospheres`
Bar          | No   | `bar`
PSI          | No   | `psi`, `poundsPerSquareInch`
Torr         | No   | `torr`

## Speed

```javascript
const { speed } = require('amounts');

console.log(speed(500)); // m/s
console.log(speed('5 km/s').kph);
console.log(speed('10 mph').mps);
```

Unit           | SI   | Names
---------------|------|--------------------
Metres/Second  | Yes  | `m/s`, `mps`, `metersPerSecond`, `metresPerSecond`, `metres/second`, `meters/second`
Kilometre/Hour | No   | `km/h`, `kph`, `kilometersPerHour`, `kilometresPerHour`, `kilometers/hour`, `kilometre/hour`
Miles/Hour     | No   | `mph`, `milesPerHour`, `miles/hour`
Feet/Second    | No   | `ft/s`, `fps`, `footPerSecond`, `feetPerSecond`, `foot/second`, `feet/second`
Knot           | No   | `kt`, `knot`, `knots`

## Temperature

```javascript
const { temperature } = require('amounts');

console.log(temperature(22)); // Celsius
console.log(temperature('200 k').celsius);
console.log(temperature(80, 'f').kelvin);
```

Unit         | SI   | Names
-------------|------|--------------------
Celsius      | No   | `C`, `c`, `celsius`
Kelvin       | Yes  | `K`, `kelvin`, `kelvins`
Fahrenheit   | No   | `F`, `f`, `fahrenheit`, `fahrenheits`

## Volume

```javascript
const { volume } = require('amounts');

console.log(volume(2)); // Liters
console.log(volume(2, 'quarts').dl);
console.log(volume('20 ml').tbsp);
```

Unit         | SI   | Names
-------------|------|--------------------
Liter        | Yes  | `l`, `L`, `liter`, `litre`, `litre`, `litres`
Gallon       | No   | `gal`, `gallon`, `gallons`
Quart        | No   | `qt`, `quart`, `quarts`
Pint         | No   | `pt`, `pint`, `pints`
Cup          | No   | `cu`, `cup`, `cups`
Fluid ounce  | No   | `floz`, `oz`, `fluid-ounce`, `ounce`, `fluid-ounces`, `ounces`
Tablespoon   | No   | `tb`, `tbsp`, `tbs`, `tablesppon`, `tablespoons`
Teaspoon     | No   | `tsp`, `teaspoon`, `teaspoons`
