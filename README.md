# zclopts

Zero-configuration command-line option parsing

BETA

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

Double Flag

`node my-script.js -ff`
```js
{ f: 2 }
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

Flag group with trailing value

`node my-script.js -abc value`
```js
{ a: true, b: true, c: value }
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
