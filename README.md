call-log
==========

[![Build Status](https://travis-ci.org/feross/call-log.png?branch=master)](https://travis-ci.org/feross/call-log)

[![browser support](https://ci.testling.com/feross/call-log.png)](https://ci.testling.com/feross/call-log)

Instrument an object or class so that anytime a method is invoked, it gets logged to the console.

## Installation

`npm install call-log`

## Usage

```js
var callLog = require('call-log')

function Cat () {}
Cat.prototype.meow = function (sound) { sound }
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