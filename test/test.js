var assert = require("assert");

var TextScrub = require('../index')

// Output Structure
var output = {
  unsorted: [],
  groups: {}
};

// Args: unique
var unique = [];

var line_regex = 'yo dog, I herd you like some % of boots@cats.com and bomb.com will pay $999.99 for it'
var line_multi = '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
var line_unique = ['Dogs', 'Dogs', 'Dogs', 'Cats']
var line_splitter = 'Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'

describe('TextScrub', function(){

  describe('TextScrub.Extractor()', function() {
    it('Extract email addresses with regular expression', function() {
      line_fixed = TextScrub.Extractor(['emails'], line_regex)
      assert.equal('boots@cats.com', line_fixed.emails[0])
    })
    it('Extract urls with regular expression', function() {
      line_fixed = TextScrub.Extractor(['urls'], line_regex)
      assert.equal('cats.com', line_fixed.urls[0])
    })
    it('Extract currency with regular expression', function() {
      line_fixed = TextScrub.Extractor(['currency'], line_regex)
      assert.equal('999.99', line_fixed.currency[0])
    })
  })

  describe('TextScrub.Swap()', function() {
    it('Swaps string contained within string', function() {
      line_fixed = TextScrub.Swap({find:'thunderbird-profile/ImapMail/account-6.com/', replace: ''}, line_multi)
      assert.equal('/home/root/path/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York', line_fixed)
    })
    it('Swaps string that matches regex', function() {
      line_fixed = TextScrub.Swap({regex:'url', replace: 'null'}, line_multi)
      assert.equal('/home/root/path/thunderbird-profile/ImapMail/null/null/null/East null/null/New York', line_fixed)
    })
  })

  describe('TextScrub.Trim()', function() {
    it('Trims start and end using number opts', function() {
      line_fixed = TextScrub.Trim({start: 16, end: 34}, line_multi)
      assert.equal('thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/', line_fixed)
    })
    it('Trims start and end using string opts', function() {
      line_fixed = TextScrub.Trim({start: '/home/root/path/thunderbird-profile/ImapMail/', end: '/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'}, line_multi)
      assert.equal('account-6.com', line_fixed)
    })
  })

  describe('TextScrub.Grow()', function(argument) {
    it('Grows string by adding to start and end', function() {
      line_fixed = TextScrub.Grow({start: '/home/root/path/', end: '/Brooklyn'}, line_splitter)
      assert.equal('/home/root/path/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York/Brooklyn', line_fixed)
    })
  })

  describe('TextScrub.Unique()', function(argument) {
    it('Makes contents of array unique', function() {
      line_fixed = TextScrub.Unique({}, line_unique)
      assert.equal('Dogs', line_fixed[0])
      assert.equal('Cats', line_fixed[1])
    })
  })

  describe('TextScrub.Spliter()', function(){
    it('Splits string into sub categories and structures accordingly', function() {
      var line_fixed = TextScrub.Splitter({ term: '.sbd/', depth: 2, overage: 'join', joiner: '-' }, line_splitter)
      assert.equal('USA-East Coast-Cities-New York', line_fixed.groups.Clients[0])
    })
    it('Splits string into sub categories and structures accordingly', function() {
      var line_fixed = TextScrub.Splitter({ term: '.sbd/', depth: 2, overage: 'unsorted' }, line_splitter)
      assert.equal('USA', line_fixed.unsorted[0])
      assert.equal('East Coast', line_fixed.unsorted[1])
      assert.equal('New York', line_fixed.groups.Clients[0])
    })
  })

})
