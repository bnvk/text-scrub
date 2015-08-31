var _ = require('underscore')

var _first_last = function(split, output) {
  // If "group" exists
  if (output.groups[split[0]]) {
    if (_.indexOf(output.groups[split[0]], split[split.length - 1]) === -1) {
      output.groups[split[0]].push(split[split.length -1])
    }
  } else {
    output.groups[split[0]] = [split[split.length - 1]]
  }
  return output
}

var _add_to_unsorted = function(item, output) {
  if (_.indexOf(output.unsorted, item) === -1) {
    output.unsorted.push(item)
  }
  return output
}

var _process_overage = {
  ignore: function(opts, split, output) {
    if (split.length < opts.depth) {
      output = _first_last(split, output)
    }
    else if (split.length > opts.depth && opts.overage === 'ignore') {
      output = _first_last(split, output)
    }
    return output
  },
  unsorted: function(opts, split, output) {
    if (split.length > opts.depth) {
      _.each(split, function(piece, key) {
        if (key > 0 && key < (split.length - opts.depth)) {
          output = _add_to_unsorted(piece, output)
        }
      })
      return _first_last(split, output)
    } else {
      return _first_last(split, output)
    }
  },
  join: function(opts, split, output) {
    if (split.length > opts.depth) {
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
    return output
  }
}

var Splitter = function(opts, line) {

  // Set Output if not set
  var output = { unsorted: [], groups: {} }

  if (opts.output) {
    output = opts.output
  }

  // Split Line
  var split  = line.split(opts.term)

  if (split.length === 1) {
    output = _add_to_unsorted(split[0], output)
  } else {
    if (opts.overage && _.indexOf(['ignore', 'unsorted', 'join'], opts.overage) > -1) {
      output = _process_overage[opts.overage](opts, split, output)
    }
  }

  return output
}

module.exports = Splitter
