require('any-promise/register/pinkie');
const test = require('ava');
const Pinkie = require('pinkie');
const delay = require('./delay');
const pify = require('../');

test('pinkie promise', (t) => {
  const p = pify(delay)();
  return p.then(() => t.true(p instanceof Pinkie));
});
