# zclopts

Zero-configuration command-line option parsing

[![Build status for Node.js 8.x and newer](https://github.com/sovpro/zclopts/workflows/Node.js%208.x%20and%20newer%20/badge.svg?branch=master)](https://github.com/sovpro/zclopts/commits/master)

## Example

Example script:
```js
// show-options.js
import zclopts from '@sovpro/zclopts'

const argv = process.argv.slice (2)
const opts = zclopts (argv)

console.log (opts)
```

Example execution:
```bash
node ./show-options.js -abc yes -no-xyz no --param one two -vvv --param three
```

Example output:
```js
Map {
  'a' => true,
  'b' => true,
  'c' => 'yes',
  'x' => false,
  'y' => false,
  'z' => 'no',
  'param' => [ 'one two', 'three' ],
  'v' => 3 }
```

## Flags

`node my-script.js -f`
```js
Map { 'f' => true }
```

`node my-script.js -no-f`
```js
Map { 'f' => false }
```

Double Flag

`node my-script.js -ff`
```js
Map { 'f' => 2 }
```

`node my-script.js -no-ff`
```js
Map { 'f' => false }
```

Flag with value

`node my-script.js -f value`
```js
Map { 'f' => 'value' }
```

Flag with sequential values

`node my-script.js -f value-1 value-2`
```js
Map { 'f' => 'value-1 value-2' }
```

Flag occurring more than once

`node my-script.js -f value-1 value-2 -f value-3 value-4`
```js
Map { 'f' => 'value-3 value-4' }
```

Flag group

`node my-script.js -abc`
```js
Map { 'a' => true, 'b' => true, 'c' => true }
```

`node my-script.js -no-abc`
```js
Map { 'a' => false, 'b' => false, 'c' => false }
```

Flag group with trailing value

`node my-script.js -abc value`
```js
Map { 'a' => true, 'b' => true, 'c' => 'value' }
```

`node my-script.js -no-abc value`
```js
Map { 'a' => false, 'b' => false, 'c' => 'value' }
```

Flag as a parameter

`node my-script.js -f=value`
```js
Map { 'f' => 'value' }
```

## Params

`node my-script.js --param`
```js
Map { 'param' => undefined }
```

Param with value

`node my-script.js --param value`
```js
Map { 'param' => 'value' }
```

`node my-script.js --param=value`
```js
Map { 'param' => 'value' }
```

Param with sequential values

`node my-script.js --param value-1 value-2`
```js
Map { 'param' => 'value-1 value-2' }
```

Param occurring more than once

`node my-script.js --param value-1 value-2 --param value-3 value-4`
```js
Map { 'param' => ['value-1 value-2', 'value-3 value-4'] }
```
