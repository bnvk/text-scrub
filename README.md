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

```
var old_text = '[doge@fort]$ /home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York'
var new_text = TextScrub.Wash({
  Trim: { start: '[doge@fort]$ '},
  Swap: { find: 'path/thunderbird-profile/ImapMail/account-6.com/', replace: 'messages/' }
}, old_text)
```



#### Options

```
TextScrub.FindReplace(opts, line)
```

```
TextScrub.Trim(opts, line)
```

```
TextScrub.Grow(opts, line)
```

```
TextScrub.Extractor(opts, line)
opts: ['emails', 'urls', 'currency']
```

The Splitter tool is called via `TextScrub.Splitter.Scrub(opts, line)


```
term    // string
depth   // integer
overage // ignore, join, unsorted
joiner  // string
unique  // bool
```
