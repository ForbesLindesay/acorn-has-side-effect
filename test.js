'use strict';

var assert = require('assert');
var hasSideEffect = require('./');

assert(hasSideEffect('x = 10') === true);
assert(hasSideEffect('x++') === true);
assert(hasSideEffect('x') === false);
assert(hasSideEffect('x', {strict: true}) === true);
assert(hasSideEffect('x.foo') === false);
assert(hasSideEffect('x.foo', {strict: true}) === true);
assert(hasSideEffect('this') === false);
assert(hasSideEffect('this', {strict: true}) === false);
assert(hasSideEffect('this.foo') === false);
assert(hasSideEffect('this.foo', {strict: true}) === true);

console.log('tests passed');
