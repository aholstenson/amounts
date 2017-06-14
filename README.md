# Amounts

Measurements and unit conversions for JavaScript.

```javascript
const { Length } = require('amounts');

const length = new Length('30 m'); // or new Length(30) or Length('12 ft')
console.log(length.as('ft'));
```
