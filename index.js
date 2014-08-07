/**
 * Instrument an object or class so that anytime a method is invoked, it gets
 * logged to the console.
 *
 * @param  {function} constructor
 */
module.exports = function (constructor) {
  Object.keys(constructor).forEach(function (methodName) {
    if (typeof constructor[methodName] !== 'function') {
      return
    }

    var originalMethod = constructor[methodName]
    constructor[methodName] = function () {
      var args = Array.prototype.slice.call(arguments)
      args.unshift('called ' + methodName)
      console.log.apply(console, args)
      return originalMethod.apply(null, arguments)
    }
  })

  var proto = constructor.prototype
  if (proto !== undefined) {
    for (var methodName in proto) {
      var propDesc = Object.getOwnPropertyDescriptor(proto, methodName)
      if (typeof proto[methodName] !== 'function' || (propDesc &&
          (!propDesc.configurable || ('get' in propDesc) || ('set' in propDesc)))) {
        return
      }

      ;(function (methodName) {
        var originalMethod = proto[methodName]
        proto[methodName] = function () {
          var args = Array.prototype.slice.call(arguments)
          args.unshift('called ' + methodName)
          console.log.apply(console, args)
          return originalMethod.apply(this, arguments)
        }
      })(methodName)
    }
  }
}
