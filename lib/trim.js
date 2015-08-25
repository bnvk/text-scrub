var _ = require('underscore')

var Trim = function(opts, line) {

  if (opts.start && typeof opts.start === 'number') {
    line = line.substring(opts.start, line.length)
  }
  else if (opts.start && typeof opts.start === 'string') {
    line = line.substring(opts.start.length, line.length)
  }

  if (opts.end && typeof opts.start === 'number') {
    line = line.substring(0, line.length - opts.end)
  }
  else if (opts.end && typeof opts.end === 'string') {
    line = line.substring(0, line.length - opts.end.length)
  }

  return line
}

module.exports = Trim
