var callLog = require('../')
var common = require('./common')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var test = require('tape')

inherits(Dog, EventEmitter)

function Dog () {
  EventEmitter.call(this)
}

Dog.prototype.woof = function () {
  this.emit('woof')
}

Dog.prototype.wag = function (speed) {
  this.emit('wag', speed)
}

callLog(Dog)

test('eventemitter logging works', function (t) {
  var asserts = []

  var dog = new Dog()

  common.onNextLog(function (arg1) {
    asserts.push(function () { t.equal(arg1, 'called woof') })
  })
  common.onNextLog(function (arg1, arg2) {
    asserts.push(function () { t.equal(arg1, 'called emit') })
    asserts.push(function () { t.equal(arg2, 'woof') })
  })
  dog.woof()

  common.onNextLog(function (arg1, arg2) {
    asserts.push(function () { t.equal(arg1, 'called wag') })
    asserts.push(function () { t.equal(arg2, 'fast') })
  })
  common.onNextLog(function (arg1, arg2, arg3) {
    asserts.push(function () { t.equal(arg1, 'called emit') })
    asserts.push(function () { t.equal(arg2, 'wag') })
    asserts.push(function () { t.equal(arg3, 'fast') })
  })
  dog.wag('fast')

  t.plan(asserts.length)
  asserts.forEach(function (assert) {
    assert()
  })
})
