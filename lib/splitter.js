var _ = require('underscore')

var _first_last = function(split, output) {
  if (output.groups[split[0]]) {
    output.groups[split[0]].push(split[split.length -1])
  } else {
    output.groups[split[0]] = [split[split.length - 1]];
  }
  return output
}

var Splitter = function(opts, line, output) {

  var split  = line.split(opts.term)

  if (split.length === 1) {
    //console.log(split.length + ' | ' + opts.depth + ' has ONLY parts ' + split[0])
    if (_.indexOf(output.unsorted, split[0]) == -1) {
      output.unsorted.push(split[0])
    }
  }

  if (opts.overage == 'ignore') {
    if (split.length < opts.depth) {
      //console.log(split.length + ' | ' + opts.depth + ' has LESS parts and IGNORE')
      output = _first_last(split, output)
    }
    else if (split.length > opts.depth && opts.overage == 'ignore') {
      //console.log(split.length + ' | ' + opts.depth + ' has MORE parts and IGNORE')
      output = _first_last(split, output)
    }
  }

  if (opts.overage == 'unsorted') {
    if (split.length > opts.depth) {
      //console.log(split.length + ' | ' + opts.depth + ' has MORE parts and UNSORTED')

      _.each(split, function(piece, key) {
        if (key > 0 && key < (split.length - opts.depth)) {
          output.unsorted.push(piece)
        }
      })

      output = _first_last(split, output)
    }
  }

  if (opts.overage == 'join') {
    if (split.length > opts.depth) {
      //console.log(split.length + ' | ' + opts.depth + ' has MORE parts and JOIN')

      var join_pieces = split.length - opts.depth

      var pieces = []
      _.each(split, function(piece, key) {
        if (key > 0) {
          pieces.push(piece)
        }
      })

      var joined = pieces.join(opts.joiner)
      output = _first_last([split[0], joined], output)
    }
  }

  console.log(output)
  return output
}

module.exports = Splitter
