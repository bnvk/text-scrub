var _ = require('underscore')

var Swap = function(opts, line) {
  // TODO: add regex helpers
  var new_line = line.replace(opts.find, opts.replace);
  return new_line
}

module.exports = Swap
