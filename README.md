Text Scrub
==========

Perform trim, grow, extract, scrub, deduplication, and structured splitting operations on lines of text in a chainable fashion. This ain't yo grand daddy's find & replace tool.

Include `text-scrub` in your server side node.js or client side app using [browserify](https://www.npmjs.com/package/browserify) today!

```
npm install text-scrub
var TextScrub = require('text-scrub')
```

#### Use Cases

- Clean bits and pieces from a line of text
- Add bits and pieces to a line of text
- Transform file paths into usable data structures
- You are *not* the RegEx wizard that you wish you were
- Even if you were a RegEx wizard, the code would be gnarly

#### Examples

The following examples are based on an input string such as:

```
var old_text = '[doge@fort]$ /home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
```

TextScrub can either call specific filters manually such as `TextScrub.trim(start: '[doge@fort]$ ', old)` or `TextScrub.swap(...)` or you can chain filters together using the `TextScrub.Wash(tools)` method which would perform the `.trim()` operation and then `.grow()`

```
var new_text = TextScrub.Wash([
  { tool: 'trim', start: '[doge@fort]$ ' },
  { tool: 'swap', find: 'path/thunderbird-profile/ImapMail/account-6.com/', replace: 'messages/' }
], old_text)
```

The resulting text would be

```
/home/root/messages/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York`
```

### Tools & Options

**clean** removes whiteapce from start and end of input

```
TextScrub.clean(opts, line)

return        // string
```

**trim** cuts a specified string (or character count) from the start & end of the input

```
TextScrub.trim(opts, line)

opts.start    // string, integer
opts.end      // string, integer

return        // string
```

**grow** - adds a string to the start & end of the input

```
TextScrub.grow(opts, line)

opts.start    // string
opts.end      // string

return        // string
```

**extractor** - extracts emails, urls, or currency from the input string and returns them in an object

```
TextScrub.extractor(opts, line)

opts          // array ['emails', 'urls', 'currency']
opts.output   // object

return        // object { 'emails': {}, 'urls': {}, 'currency': {} }
```

**swap** - performs find & replace operations, but allows for regex inputs that replace all instances or specified "item" of regex array

```
TextScrub.swap(opts, line)

opts.find     // string
opts.regex    // string   email, url, or currency
opts.item     // integer  (only used with regex)
opts.replace  // string

return        // string
```

**splitter** - performs splitting of a string on "term" and then builds a nested object of sub terms. splitter handles "overage" by either `ignoring`, `joining` or pushing items to `unsorted` output.

```
TextScrub.splitter(opts, line)

opts.term     // string
opts.depth    // integer  2
opts.overage  // string   ignore, join, unsorted
opts.joiner   // string   ','
opts.unique   // bool     true
opts.output   // object   { unsorted: [], groups: {} }

return        //
```

#### The Output option

Two of the tools `.extractor()` and `.splitter()` accept the passing of `opts.options` variable
