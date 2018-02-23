# call-log [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/feross/call-log.svg)](https://greenkeeper.io/)

[travis-image]: https://img.shields.io/travis/feross/call-log/master.svg
[travis-url]: https://travis-ci.org/feross/call-log
[npm-image]: https://img.shields.io/npm/v/call-log.svg
[npm-url]: https://npmjs.org/package/call-log
[downloads-image]: https://img.shields.io/npm/dm/call-log.svg
[downloads-url]: https://npmjs.org/package/call-log
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

#### Instrument a JavaScript class (or object) so that anytime a method function is called it gets logged to the console.

![cat](https://raw.githubusercontent.com/feross/call-log/master/img.jpg)

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

