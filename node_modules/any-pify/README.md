# any-pify

[![Greenkeeper badge](https://badges.greenkeeper.io/knpwrs/any-pify.svg)](https://greenkeeper.io/)

Simply [`pify`] pre-loaded with [`any-promise`].

## Usage

```js
const pify = require('any-pify');
const fs = require('fs');

// Promisify a single function
pify(fs.readFile)('package.json', 'utf8').then(data => {
    console.log(JSON.parse(data).name);
});

// Or promisify all methods in a module
pify(fs).readFile('package.json', 'utf8').then(data => {
  console.log(JSON.parse(data).name);
});
```

## API

### `pify(input, [options])`

Returns a promise wrapped version of the supplied function or module.

The [`promiseModule`] option from [`pify`] is not present here. It is passed
the value resolved from [`any-promise`]. The [`options`] argument is passed
directly to [`pify`].

## License

**MIT**

[`any-promise`]: https://github.com/kevinbeaty/any-promise "any-promise"
[`options`]: https://github.com/sindresorhus/pify#options "pify options"
[`pify`]: https://github.com/sindresorhus/pify "pify"
[`promiseModule`]: https://github.com/sindresorhus/pify#promisemodule "pify promiseModule"
