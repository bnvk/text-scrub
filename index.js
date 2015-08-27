var _ = require('underscore')

var Scrubber = {}

Scrubber.Regex    = require('./lib/regex')
Scrubber.Swap     = require('./lib/swap')
Scrubber.Trim     = require('./lib/trim')
Scrubber.Grow     = require('./lib/grow')
Scrubber.Extractor= require('./lib/extractor')
Scrubber.Unique   = require('./lib/unique')
Scrubber.Splitter = require('./lib/splitter')

Scrubber.Wash = function(tools, line) {

  console.log('Processing on ' + line + ' ---------------------------')

  _.each(tools, function(opts, tool) {
    line = Scrubber[tool](opts, line)
    console.log('Post Scrubber tool line: ' + line)
  })

  return line
}

module.exports = Scrubber
