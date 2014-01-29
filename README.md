call-log [![Build Status](https://travis-ci.org/feross/call-log.png?branch=master)](https://travis-ci.org/feross/call-log) [![Gittip](http://img.shields.io/gittip/feross.png)](https://www.gittip.com/feross/)
==========

[![browser support](https://ci.testling.com/feross/call-log.png)](https://ci.testling.com/feross/call-log)

[![NPM](https://nodei.co/npm/call-log.png?downloads=true)](https://npmjs.org/package/call-log)

In Node.js, instrument an object or class so that anytime one of its methods is invoked it gets logged to the console.

## Installation

`npm install call-log`

## Usage

```js
var callLog = require('call-log')

function Cat () {}
Cat.prototype.meow = function (sound) { return sound }
Cat.prototype.scratch = function () {}

Cat.static1 = function () {}

// Add instrumentation to Cat
callLog(Cat)

var cat = new Cat()
cat.meow()
cat.meow('MEOAAAAWWW!')

// Prints:
// "Called: meow()"
// "Called: meow(MEOAAAAWWW!)"

```

## MIT License

Copyright (c) [Feross Aboukhadijeh](http://feross.org)