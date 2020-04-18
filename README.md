# zclopts

Zero-configuration command-line option parsing

BETA

[![Build status for Node.js 8.x and newer](https://github.com/sovpro/zclopts/workflows/Node.js%208.x%20and%20newer%20/badge.svg?branch=master)](https://github.com/sovpro/zclopts/commits/master)

```js
import zclopts from '@sovpro/zclopts'

const argv = process.argv.slice (2)
const opts = zclopts (argv)
```

## Flags

`node my-script.js -f`
```js
{ f: true }
```

`node my-script.js -no-f`
```js
{ f: false }
```

Double Flag

`node my-script.js -ff`
```js
{ f: 2 }
```

`node my-script.js -no-ff`
```js
{ f: false }
```

Flag with value

`node my-script.js -f value`
```js
{ f: 'value' }
```

Flag with sequential values

`node my-script.js -f value-1 value-2`
```js
{ f: 'value-1 value-2' }
```

Flag occurring more than once

`node my-script.js -f value-1 value-2 -f value-3 value-4`
```js
{ f: 'value-3 value-4' }
```

Flag group

`node my-script.js -abc`
```js
{ a: true, b: true, c: true }
```

`node my-script.js -no-abc`
```js
{ a: false, b: false, c: false }
```

Flag group with trailing value

`node my-script.js -abc value`
```js
{ a: true, b: true, c: 'value' }
```

`node my-script.js -no-abc value`
```js
{ a: false, b: false, c: 'value' }
```

Flag as a parameter

`node my-script.js -f=value`
```js
{ f: 'value' }
```

## Params

`node my-script.js --param`
```js
{ param: undefined }
```

Param with value

`node my-script.js --param value`
```js
{ param: 'value' }
```

`node my-script.js --param=value`
```js
{ param: 'value' }
```

Param with sequential values

`node my-script.js --param value-1 value-2`
```js
{ param: 'value-1 value-2' }
```

Param occurring more than once

`node my-script.js --param value-1 value-2 --param value-3 value-4`
```js
{ param: ['value-1 value-2', 'value-3 value-4'] }
```
