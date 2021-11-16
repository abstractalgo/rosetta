# [Markdown Cheatsheet][1]

You can play around with Markdown on this [live demo page][2].

This is intended as a quick reference and showcase. For more complete info, see [John Gruber's original spec][3] and the [Github-flavored Markdown info page][4].

##### Table of Contents

- [Headers][5]
- [Emphasis][6]
- [Lists][7]
- [Links][8]
- [Images][9]
- [Code-and-Syntax-Highlighting][10]
- [Tables][11]
- [Blockquotes][12]
- [Inline-HTML][13]
- [Horizontal-Rules][14]
- [Line-Breaks][15]
- [Videos][16]

## Headers

    # H1
    ## H2
    ### H3
    #### H4
    ##### H5
    ###### H6

    Alternatively, for H1 and H2, an underline-ish style:

    Alt-H1
    ======

    Alt-H2
    ------

# H1

## H2

### H3

#### H4

##### H5

###### H6

Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2

    Emphasis, aka italics, with *asterisks* or _underscores_.

    Strong emphasis, aka bold, with **asterisks** or __underscores__.

    Combined emphasis with **asterisks and _underscores_**.

    Strikethrough uses two tildes. ~~Scratch this.~~

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. <del>Scratch this. </del>

## Lists

(In this example, leading and trailing spaces are shown with with dots: ⋅)

    1. First ordered list item
    2. Another item
    ⋅⋅* Unordered sub-list.
    1. Actual numbers don't matter, just that it's a number
    ⋅⋅1. Ordered sub-list
    4. And another item.

    ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

    ⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
    ⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
    ⋅⋅⋅(This is contrary to the typical [GFM][17] line break behaviour, where trailing spaces are not required.)

    * Unordered list can use asterisks
    - Or minuses
    + Or pluses

---

1. First ordered list item
2. Another item
   - Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
4. And another item.

You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

To have a line break without a paragraph, you will need to use two trailing spaces.
Note that this line is separate, but within the same paragraph.
(This is contrary to the typical [GFM][17] line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses

## Links

There are two ways to create links.

    [I'm an inline-style link](https://www.google.com)

    [I'm an inline-style link with title](https://www.google.com "Google's Homepage")

    [I'm a reference-style link][Arbitrary case-insensitive reference text]

    [I'm a relative reference to a repository file](../blob/master/LICENSE)

    [You can use reference-style link definitions][22]

    Or leave it empty and use the [link text itself]

    Some text to show that the reference links can follow later.

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link](Arbitrary case-insensitive reference text)

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][22]

Or leave it empty and use the [link text itself][23]

Some text to show that the reference links can follow later.

## Images

    Here's our logo (hover to see the title text):

    Inline-style:
    ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

    Reference-style:
    ![alt text][logo]

Here's our logo (hover to see the title text):

Inline-style: ![alt text][24]

Reference-style: ![alt text][25]

## Code-and-Syntax-Highlighting

Code blocks are part of the Markdown spec, but syntax highlighting isn't. However, many renderers -- like Github's -- support syntax highlighting. Which languages are supported and how those language names should be written will vary from renderer to renderer.

    Inline `code` has `back-ticks around` it.

Inline `code` has `back-ticks around` it.

Blocks of code are either fenced by lines with three back-ticks ```, or are indented with four spaces. I recommend only using the fenced code blocks -- they're easier and only they support syntax highlighting.

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a tag.
```

var s = "JavaScript syntax highlighting";
alert(s);

s = "Python syntax highlighting"
print s

No language indicated, so no syntax highlighting in Markdown Here (varies on Github).
But let's throw in a tag.

## Tables

Tables aren't part of the core Markdown spec, but they are part of [GFM][17]. They are an easy way of adding tables to your email -- a task that would otherwise require copy-pasting from another application.

    Colons can be used to align columns.

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |

    The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

    Markdown | Less | Pretty
    --- | --- | ---
    *Still* | `renders` | **nicely**
    1 | 2 | 3

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Blockquotes

    > Blockquotes are very handy in email to emulate reply text.
    > This line is part of the same quote.

    Quote break.

    > This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

> Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

## Inline-HTML

You can also use raw HTML in your Markdown, and it'll mostly work pretty well.

    Definition list
    Is something people use sometimes.

    Markdown in HTML
    Does *not* work **very** well. Use HTML _tags_.

Definition list
: Is something people use sometimes.

Markdown in HTML
: Does \*not\* work \*\*very\*\* well. Use HTML \_tags\_.

## Horizontal-Rules

    Three or more ...

    ---
    Hyphens

    ***
    Asterisks

    ___
    Underscores

Three or more ...

---

Hyphens

---

Asterisks

---

Underscores

## Line-Breaks

My basic recommendation for learning how line breaks work is to experiment and discover -- hit \<Enter\> once (i.e., insert one newline), then hit it twice (i.e., insert two newlines), see what happens. You'll soon learn to get what you want.

Here are some things to try out:

    Here's a line for us to start with.

    This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

    This line is also a separate paragraph, but...
    This line is only separated by a single newline, so it's a separate line in the *same paragraph*.

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

## Videos

They can't be added directly but you can add an image with a link to the video like this:

```
      <a href="https://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
  " target="_blank"><img src="https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
```

Or, in pure Markdown, but losing the image sizing and border:

    [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

###### GFM

Github Flavored Markdown

[1]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[2]: http://www.markdown-here.com/livedemo.html
[3]: http://daringfireball.net/projects/markdown/
[4]: https://github.github.com/github-flavored-markdown/
[5]: #headers
[6]: #emphasis
[7]: #lists
[8]: #links
[9]: #images
[10]: #code-and-syntax-highlighting
[11]: #tables
[12]: #blockquotes
[13]: #inline-html
[14]: #horizontal-rules
[15]: #line-breaks
[16]: #videos
[17]: #gfm
[18]: https://www.google.com
[19]: https://www.google.com "Google's Homepage"
[20]: https://www.mozilla.org
[21]: blob/master/LICENSE
[22]: #ref-2
[23]: https://codepen.io/atelierbram/pen/hrqcH
[24]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1'
[25]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 2'
