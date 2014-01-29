var callLog = require('../')
var test = require('tape')

var _fn = null
function onNextLog (fn) {
  _fn = fn
}

var _log = console.log.bind(console)
global.console.log = function (data) {
  if (_fn) {
    _fn(data)
    _fn = null
  } else {
    _log(data)
  }
}

function Cat () {}
Cat.prototype.meow = function (sound) { return sound }
Cat.prototype.scratch = function () {}

Cat.static1 = function () {}
Cat.static2 = function (cb) { cb() }

callLog(Cat)

test('instrumentation works', function (t) {
  t.plan(7)
  var cat = new Cat()

  onNextLog(function (string) {
    t.equal(string, 'Called: meow()')
  })
  cat.meow()

  onNextLog(function (string) {
    t.equal(string, 'Called: meow(MEOAAAAWWW!)')
  })
  var output = cat.meow('MEOAAAAWWW!')
  t.equal(output, 'MEOAAAAWWW!')

  onNextLog(function (string) {
    t.equal(string, 'Called: scratch()')
  })
  cat.scratch()

  onNextLog(function (string) {
    t.equal(string, 'Called: static1()')
  })
  Cat.static1()

  onNextLog(function (string) {
    t.equal(string, 'Called: static2(function () { t.ok(true) })')
  })
  Cat.static2(function () { t.ok(true) })

})