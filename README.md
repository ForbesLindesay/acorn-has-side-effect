# acorn-has-side-effect

A simple module to check whether an expression has any side effects.  This is aimed at being useful for writing optimising JavaScript compilers.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/acorn-has-side-effect/master.svg)](https://travis-ci.org/ForbesLindesay/acorn-has-side-effect)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/acorn-has-side-effect.svg)](https://gemnasium.com/ForbesLindesay/acorn-has-side-effect)
[![NPM version](https://img.shields.io/npm/v/acorn-has-side-effect.svg)](https://www.npmjs.org/package/acorn-has-side-effect)

## Installation

    npm install acorn-has-side-effect

## Usage

```js
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
```

It assumes that property-access and variable-access should not count as a side effect, even though they technically could be because of property accessors and reference errors etc.  For most purposes this should be fine, but it could go wrong in some rare circumstances.  You can force it to treat even these nodes as having side effects by passing `{strict: true}` for the options.

If you already have an AST, you can pass an acorn AST instead of a string for the source code.

## License

  MIT
