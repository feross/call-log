# call-log [![travis](https://img.shields.io/travis/feross/call-log/master.svg)](https://travis-ci.org/feross/call-log) [![npm](https://img.shields.io/npm/v/call-log.svg)](https://npmjs.org/package/call-log)

#### Instrument a JavaScript class (or object) so that anytime a method function is called it gets logged to the console.

![cat](https://raw.githubusercontent.com/feross/call-log/master/img.jpg)

[![browser support](https://ci.testling.com/feross/call-log.png)](https://ci.testling.com/feross/call-log)

## install

```
npm install call-log
```

This module works in the browser with [browserify](http://browserify.org/).

**Note:** If you're **NOT** using browserify, then use the included standalone file
`call-log.min.js`. This exports a `CallLog` constructor on `window`.

## usage

```js
var callLog = require('call-log')

function Cat () {}
Cat.prototype.meow = function (sound) { return sound }

// Add instrumentation to Cat
callLog(Cat)

// Use the cat
var cat = new Cat()
cat.meow()
cat.meow('MEOAAAAWWW!')

// Prints:
// "called meow"
// "called meow", "MEOAAAAWWW!"

```

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org)

