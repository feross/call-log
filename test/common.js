var fns = []
var log = console.log
global.console.log = function () {
  var fn = fns.shift()
  if (fn) {
    fn.apply(null, arguments)
  } else {
    log.apply(console, arguments)
  }
}

exports.onNextLog = function (fn) {
  fns.push(fn)
}
