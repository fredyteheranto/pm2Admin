require('any-promise/register')('native', { Promise });
const test = require('ava');
const delay = require('./delay');
const pify = require('../');

test('native promise', (t) => {
  const p = pify(delay)();
  return p.then(() => t.true(p instanceof Promise));
});
