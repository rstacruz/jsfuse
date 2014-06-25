Jsfuse
======

Simple CommonJS-based JavaScript distribution builder.

Replaces `require('...')` with the files they require. This makes it easy to
create distributions for frontend packages.

It's [browserify] or [webpack] — only it produces smaller files and doesn't 
support circular dependencies.

[![Status](https://travis-ci.org/rstacruz/jsfuse.svg?branch=master)](https://travis-ci.org/rstacruz/jsfuse)  

Use
---

    $ npm install -g jsfuse
    $ jsfuse your_file.js

[![npm version](https://img.shields.io/npm/v/jsfuse.png)](https://npmjs.org/jsfuse/jsfuse "View this project on npm")

Example
-------

```js
// index.js
alert(require('./foo'));

// foo.js
module.exports = "Hello";
```

Then run:

    jsfuse index.js

This will replace `require('./foo')` with the exports of `foo.js`, which yields 
something to the effect of:

```js
alert((function(){
 var module={exports:{}},exports=module.exports;
 (function(){ module.exports = "Hello"; })();
 return module.exports;
})());
```

Which is functionally-equivalent to:

```js
alert("Hello");
```

### Why?

It's great for making frontend libraries, which usually are distributed as a 
single `.js` file. When using browserify to build the final file, you'll get an 
entire working CommonJS loader embedded into it, which may be unnecessary bloat.

Jsfuse allows you to bake smaller files by assuming some limitations:

 - circular dependencies are not allowed.
 - requiring a dependency more than once will bloat up your file size.
 - doesn't support `node_modules`.

Acknowledgements
----------------

**Jsfuse** © 2014, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

[ricostacruz.com](http://ricostacruz.com) ·
GitHub [@rstacruz](https://github.com/rstacruz) ·
Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/jsfuse/contributors
[Browserify]: http://browserify.org/
[Webpack]: http://webpack.github.io/
