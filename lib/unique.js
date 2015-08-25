var _ = require('underscore')

var Unique = function(opts, lines) {

  var checked = []

  _.each(lines, function(line, key) {
    if (_.indexOf(checked, line) === -1) {
      checked.push(line)
    }
  })

  return checked
}

module.exports = Unique
