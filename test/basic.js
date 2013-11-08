var callLog = require('../')
var test = require('tape')

function hookStdout (callback) {
  var oldWrite = process.stdout.write

  process.stdout.write = (function(write) {
    return function (string, encoding, fd) {
      write.apply(process.stdout, arguments)
      callback(string, encoding, fd)
      process.stdout.write = oldWrite
    }
  })(process.stdout.write)

}

function Cat () {}
Cat.prototype.meow = function (sound) { return sound; }
Cat.prototype.scratch = function () {}

Cat.static1 = function () {}
Cat.static2 = function (cb) { cb() }

callLog(Cat)

test('instrumentation works', function (t) {
  t.plan(7)
  var cat = new Cat()

  hookStdout(function (string) {
    t.equal(string, 'Called: meow()\n')
  })
  cat.meow()

  hookStdout(function (string) {
    t.equal(string, 'Called: meow(MEOAAAAWWW!)\n')
  })
  var output = cat.meow('MEOAAAAWWW!')
  t.equal(output, 'MEOAAAAWWW!')

  hookStdout(function (string) {
    t.equal(string, 'Called: scratch()\n')
  })
  cat.scratch()

  hookStdout(function (string) {
    t.equal(string, 'Called: static1()\n')
  })
  Cat.static1()

  hookStdout(function (string) {
    t.equal(string, 'Called: static2(function () { t.ok(true) })\n')
  })
  Cat.static2(function () { t.ok(true) })

})