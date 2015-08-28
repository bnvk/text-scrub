var _ = require('underscore')
var regex = require('./regex')

var Swap = function(opts, line) {

  if (opts.find) {
    var new_line = line.replace(opts.find, opts.replace)
  }
  else if (opts.regex && opts.item) {
    var match = line.match(regex[opts.regex])
    var new_line = line.replace(match[opts.item - 1], opts.replace)
  }
  else if (opts.regex) {
    var new_line = line.replace(regex[opts.regex], opts.replace)
  }

  return new_line
}

module.exports = Swap
