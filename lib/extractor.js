var _ = require('underscore')
var regex = require('./regex')

var Extractor = function(opts, line) {

  var output = {}

  if (opts.output) {
    output = opts.output
  }

  if (_.indexOf(opts, 'emails') > -1) {
     output['emails'] = line.match(regex.email)
  }

  if (_.indexOf(opts, 'urls') > -1) {
    output['urls'] = line.match(regex.url)
  }

  if (_.indexOf(opts, 'currency') > -1)  {
     output['currency'] = line.match(regex.currency)
  }

  return output
}

module.exports = Extractor
