var Regex = {}

Regex.email     = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
Regex.url       = /([a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
Regex.currency  = /[1-9]\d*(?:\.\d{0,2})?/gi

module.exports = Regex
