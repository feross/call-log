var is = require('core-util-is') // added in Node 0.12

/**
 * Instrument an object or class so that anytime a method is invoked, it gets
 * logged to the console.
 *
 * @param  {function} constructor
 */
module.exports = function (constructor) {
  Object.keys(constructor).forEach(function (methodName) {
    if (!is.isFunction(constructor[methodName])) {
      return
    }

    var originalMethod = constructor[methodName]
    constructor[methodName] = function () {
      var args = Array.prototype.slice.call(arguments)
      console.log('Called: ' + methodName + '(' + args + ')')
      return originalMethod.apply(null, args)
    }
  })

  var proto = constructor.prototype
  if (proto !== undefined) {
    Object.keys(proto).forEach(function (methodName) {
      var propDesc = Object.getOwnPropertyDescriptor(proto, methodName)
      if (!propDesc.configurable || ('get' in propDesc) || ('set' in propDesc) ||
          !is.isFunction(proto[methodName])) {
        return
      }

      var originalMethod = proto[methodName]
      proto[methodName] = function () {
        var args = Array.prototype.slice.call(arguments)
        console.log('Called: ' + methodName + '(' + args + ')')
        return originalMethod.apply(this, args)
      }
    })
  }
}
