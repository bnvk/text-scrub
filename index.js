var _ = require('underscore')

var Scrubber = {}

Scrubber.regex    = require('./lib/regex')
Scrubber.clean    = require('./lib/clean')
Scrubber.swap     = require('./lib/swap')
Scrubber.trim     = require('./lib/trim')
Scrubber.grow     = require('./lib/grow')
Scrubber.extractor= require('./lib/extractor')
Scrubber.splitter = require('./lib/splitter')

Scrubber.wash = function(tools, line, output) {
  //console.log('---------------------------------------------------')
  //console.log(line)
  _.each(tools, function(tool, key) {
    if (tool.scrub && _.indexOf(['clean', 'swap', 'trim', 'grow', 'extractor', 'unique', 'splitter'], tool.scrub) > -1) {
      line = Scrubber[tool.scrub](tool, line)
    } else {
      line = 'TextScrub invalid tool: ' + JSON.stringify(tool)
    }
  })

  return line
}

module.exports = Scrubber
