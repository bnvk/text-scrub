var assert = require('assert')
var _ = require('underscore')

var TextScrub = require('../index')

// Output Structure
var output = {
  unsorted: [],
  groups: {}
};

// Args: unique
var unique = [];

var line_regex = 'yo dog, I herd you like some % of boots@cats.com and bomb.com will pay $999.99 for it'
var line_nested_path = '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
var line_unique = ['Dogs', 'Dogs', 'Dogs', 'Cats']
var line_splitter = 'Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
var line_nested_multi = '/home/root/path/thunderbird-profile/ImapMail/account-5.com/Projects\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-5.com/Ideas\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/Boston\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/DC\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/West Coast.sbd/Cities.sbd/Seatle\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/West Coast.sbd/Cities.sbd/San Francisco\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/Honey Badgers Ltd.\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Friends.sbd/USA.sbd/EFF\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Europe.sbd/Courage Foundation\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/IMMI\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Wikileaks\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Transparency Toolkit\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-8.com/Friends\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-8.com/Cats\n'

describe('TextScrub', function(){

  describe('TextScrub.clean()', function(argument) {
    it('Removes whitespace form start & end', function() {
      line_fixed = TextScrub.clean({}, '    New York & Brooklyn      ')
      assert.equal('New York & Brooklyn', line_fixed)
    })
  })

  describe('TextScrub.extractor()', function() {
    it('Extract email addresses with regular expression', function() {
      line_fixed = TextScrub.extractor(['emails'], line_regex)
      assert.equal('boots@cats.com', line_fixed.emails[0])
    })
    it('Extract urls with regular expression', function() {
      line_fixed = TextScrub.extractor(['urls'], line_regex)
      assert.equal('cats.com', line_fixed.urls[0])
    })
    it('Extract currency with regular expression', function() {
      line_fixed = TextScrub.extractor(['currency'], line_regex)
      assert.equal('999.99', line_fixed.currency[0])
    })
  })

  describe('TextScrub.swap()', function() {
    it('Swaps string contained within string', function() {
      line_fixed = TextScrub.swap({find:'thunderbird-profile/ImapMail/account-6.com/', replace: ''}, line_nested_path)
      assert.equal('/home/root/path/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York', line_fixed)
    })
    it('Swaps string that matches all instances of a regex', function() {
      line_fixed = TextScrub.swap({regex:'url', replace: 'null'}, line_nested_path)
      assert.equal('/home/root/path/thunderbird-profile/ImapMail/null/null/null/East null/null/New York', line_fixed)
    })
    it('Swaps string that matches specified item of regex', function() {
      line_fixed = TextScrub.swap({regex:'url', item: 1, replace: 'boots-and-cats'}, line_nested_path)
      assert.equal('/home/root/path/thunderbird-profile/ImapMail/boots-and-cats/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York', line_fixed)
    })
  })

  describe('TextScrub.trim()', function() {
    it('Trims start and end using number opts', function() {
      line_fixed = TextScrub.trim({start: 16, end: 34}, line_nested_path)
      assert.equal('thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/', line_fixed)
    })
    it('Trims start and end using string opts', function() {
      line_fixed = TextScrub.trim({start: '/home/root/path/thunderbird-profile/ImapMail/', end: '/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'}, line_nested_path)
      assert.equal('account-6.com', line_fixed)
    })
  })

  describe('TextScrub.grow()', function(argument) {
    it('Grows string by adding to start and end', function() {
      line_fixed = TextScrub.grow({start: '/home/root/path/', end: '/Brooklyn'}, line_splitter)
      assert.equal('/home/root/path/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York/Brooklyn', line_fixed)
    })
  })

  describe('TextScrub.spliter()', function(){
    it('Splits string and ignores overage', function() {
      var line_fixed = TextScrub.splitter({ term: '.sbd/', depth: 2, overage: 'ignore' }, line_splitter)
      assert.equal('New York', line_fixed.groups.Clients[0])
    })
    it('Splits string and joins overage with default , character', function() {
      var line_fixed = TextScrub.splitter({ term: '.sbd/', depth: 2, overage: 'join' }, line_splitter)
      assert.equal('USA,East Coast,Cities,New York', line_fixed.groups.Clients[0])
    })
    it('Splits string and puts ovrage into unsorted', function() {
      var line_fixed = TextScrub.splitter({ term: '.sbd/', depth: 2, overage: 'unsorted' }, line_splitter)
      assert.equal('USA', line_fixed.unsorted[0])
      assert.equal('East Coast', line_fixed.unsorted[1])
      assert.equal('New York', line_fixed.groups.Clients[0])
    })
  })

  describe('TextScrub.wash() with recursive output', function(){
    it('Washes multiple lines of complex object with chained events and splitter', function() {
      var output = { unsorted: [], groups: {} }
      var tools = [
        { scrub: 'trim', start: '/home/root/path/thunderbird-profile/ImapMail/' },
        { scrub: 'swap', regex: 'url', item: 1, replace: '' },
        { scrub: 'trim', start: '/' },
        { scrub: 'splitter', term: '.sbd/', depth: 2, overage: 'unsorted', output: output },
      ]
      var lines = line_nested_multi.split('\n')
      _.each(lines, function(line, key) {
        if (line) {
          output = TextScrub.wash(tools, line, output)
        }
      })
      assert.equal('Projects', output.unsorted[0])
      assert.equal('Ideas', output.unsorted[1])
      assert.equal('USA', output.unsorted[2])
      assert.equal('Cats', output.unsorted[6])
      assert.equal('New York', output.groups.Clients[0])
      assert.equal('Honey Badgers Ltd.', output.groups.Clients[5])
      assert.equal('EFF', output.groups.Friends[0])
      assert.equal('Transparency Toolkit', output.groups.Friends[4])
    })
  })

})
