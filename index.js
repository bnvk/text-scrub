var _ = require('underscore')

var Scrubber = {}

Scrubber.regex    = require('./lib/regex')
Scrubber.swap     = require('./lib/swap')
Scrubber.trim     = require('./lib/trim')
Scrubber.grow     = require('./lib/grow')
Scrubber.extractor= require('./lib/extractor')
Scrubber.unique   = require('./lib/unique')
Scrubber.splitter = require('./lib/splitter')

Scrubber.wash = function(tools, line, output) {
  //console.log('---------------------------------------------------')
  //console.log(line)
  _.each(tools, function(tool, key) {
    if (tool.tool && _.indexOf(['swap', 'trim', 'grow', 'extractor', 'unique', 'splitter'], tool.tool) > -1) {
      line = Scrubber[tool.tool](tool, line)
    } else {
      line = 'TextScrub invalid tool: ' + JSON.stringify(tool)
    }
  })

  return line
}

module.exports = Scrubber
