Text Scrub
==========

Scrubs, cleans, and massage single or multiple lines of text far beyond find & replace. Include text-scrub in your server side node.js or client side app using browserify today!

```
npm install text-scrub
var TextScrub = require('text-scrub')
```

#### Use Cases

- Clean bits and pieces from a line of text
- Add bits and pieces to a line of text
- Transform file paths into usable data structures

#### Examples

The following examples are based on an input string such as:

```
var old_text = '[doge@fort]$ /home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
```

TextScrub can either call specific filters manually such as `TextScrub.Trim(start: '[doge@fort]$ ', old)` or `TextScrub.Swap(...)` or you can chain filters together using the `TextScrub.Wash(tools)` method which would perform the `.Trim()` operation and then `.Swap()`

```
var new_text = TextScrub.Wash({
  Trim: { start: '[doge@fort]$ ' },
  Swap: { find: 'path/thunderbird-profile/ImapMail/account-6.com/', replace: 'messages/' }
}, old_text)
```

The resulting text would be

```
/home/root/messages/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York`
```

#### Tools & Options

**Trim** cuts a specified string (or character count) from the start & end of the input

```
TextScrub.Trim(opts, line)
opts.start    // string, integer
opts.end      // string, integer
```

**Grow** - adds a string to the start & end of the input

```
TextScrub.Grow(opts, line)
opts.start    // string
opts.end      // string
```

**Extractor** - extracts emails, urls, or currency from the input string and returns them in an object

```
TextScrub.Extractor(opts, line)
opts          // array ['emails', 'urls', 'currency']
```

**Swap** - performs find & replace operations, but allows for regex inputs that replace all instances or specified "item" of regex array

```
TextScrub.Swap(opts, line)
opts.find    // string
opts.regex   // string (emails, urls, or currency)
opts.item    // integer (only used to select a regex option)
opts.replace // string
```

**Splitter** - performs splitting of a string on "term" and then builds nested object of sub terms and handles "overage" by either ignoring, joining or pushed to "unsorted" items

```
TextScrub.Splitter(opts, line)
opts.term    // string
opts.depth   // integer
opts.overage // ignore, join, unsorted
opts.joiner  // string
opts.unique  // bool
```
