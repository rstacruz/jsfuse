Jsfuse
======

Simple CommonJS-based JavaScript distribution builder.

Replaces `require('...')` with the files they require. This makes it easy to
create distributions for frontend packages. It's like [browserify] or [webpack], only
it produces smaller files and doesn't support circular dependencies.

    $ npm install -g jsfuse
    $ jsfuse your_file.js

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
}()));
```

Which is functionally-equivalent to: (and in fact will compile down to via [closure compiler])

```js
alert("Hello");
```

Why?
----

It's great for making frontend libraries, which usually are distributed as a 
single `.js` file. When using browserify to build the final file, you'll get an 
entire working CommonJS loader embedded into it, which may be unnecessary bloat.

Jsfuse allows you to bake smaller files by assuming some limitations:

 - circular dependencies are not allowed.
 - requiring a dependency more than once will bloat up your file size.
 - doesn't support `node_modules`.

[Browserify]: http://browserify.org/
[Webpack]: http://webpack.github.io/
[closure compiler]: https://developers.google.com/closure/compiler/

Thanks
------

**Jsfuse** © 2014, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/jsfuse/contributors

[![Status](https://travis-ci.org/rstacruz/jsfuse.svg?branch=master)](https://travis-ci.org/rstacruz/jsfuse)
[![npm version](https://img.shields.io/npm/v/jsfuse.png)](https://npmjs.org/packages/jsfuse "View this project on npm")
