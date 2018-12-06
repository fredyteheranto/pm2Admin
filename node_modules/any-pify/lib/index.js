/* eslint-disable no-param-reassign */
const pify = require('pify');
const P = require('any-promise');

module.exports = function anyPify(fn, ops) {
  // Using old ES5 style for maximum compatibility with no build step
  if (!ops) {
    ops = {};
  }
  if (!ops.promiseModule) {
    ops.promiseModule = P;
  }
  return pify(fn, ops);
};
