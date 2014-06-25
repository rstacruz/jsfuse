Jsfuse
======

Simple CommonJS-based JavaScript distribution builder.

Replaces `require('...')` with the files they require. This makes it easy to
create distributions for frontend packages.

It's [browserify] or [webpack] — only it produces smaller files and doesn't 
support circular dependencies.

Limitations:

 - no circular dependencies.
 - requiring a dependency more than once may end up weird.
 - doesn't support `node_modules`.

#### Example

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
