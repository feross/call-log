# call-log
[![Build Status](http://img.shields.io/travis/feross/call-log.svg)](https://travis-ci.org/feross/call-log)
[![NPM Version](http://img.shields.io/npm/v/call-log.svg)](https://npmjs.org/package/call-log)
[![NPM](http://img.shields.io/npm/dm/call-log.svg)](https://npmjs.org/package/call-log)
[![Gittip](http://img.shields.io/gittip/feross.svg)](https://www.gittip.com/feross/)

In Node.js, instrument an object or class so that anytime one of its methods is invoked it gets logged to the console.

[![browser support](https://ci.testling.com/feross/call-log.png)](https://ci.testling.com/feross/call-log)

## install

```
npm install call-log
```

## usage

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

## mit license

Copyright (c) [Feross Aboukhadijeh](http://feross.org)

