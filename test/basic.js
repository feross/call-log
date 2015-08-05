var callLog = require('../')
var common = require('./common')
var test = require('tape')

function Cat () {}
Cat.prototype.meow = function (sound) { return sound }
Cat.prototype.scratch = function () {}

Cat.static1 = function () {}
Cat.static2 = function (cb) { cb() }

Cat.prototype.ignored = 'should be ignored'
Cat.ignored2 = 'should be ignored'

callLog(Cat)

test('basic logging works', function (t) {
  t.plan(9)
  var cat = new Cat()

  common.onNextLog(function (string) {
    t.equal(string, 'called meow')
  })
  cat.meow()

  common.onNextLog(function (arg1, arg2) {
    t.equal(arg1, 'called meow')
    t.equal(arg2, 'MEOAAAAWWW!')
  })
  var output = cat.meow('MEOAAAAWWW!')
  t.equal(output, 'MEOAAAAWWW!')

  common.onNextLog(function (string) {
    t.equal(string, 'called scratch')
  })
  cat.scratch()

  common.onNextLog(function (string) {
    t.equal(string, 'called static1')
  })
  Cat.static1()

  common.onNextLog(function (arg1, arg2) {
    t.equal(arg1, 'called static2')
    t.equal(arg2.toString(), 'function () { t.pass(\'cb called\') }')
  })
  Cat.static2(function () { t.pass('cb called') })

})
