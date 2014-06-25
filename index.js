var Fs = require('fs'),
  Path = require('path');

var tpl =
  "((function(){"+
    "var module={exports:{}},exports=module.exports;"+
    "(function(){...})();"+
    "return module.exports;"+
  "})())";

module.exports = function jsfuse (file) {
  var data = Fs.readFileSync(file, 'utf-8');
  var path = Path.dirname(file);

  data = data.replace(/require\(['"](\..*?)['"]\)/g, function (e, fname) {
    var contents = jsfuse(Path.join(path, fname + '.js'));
    return tpl.replace('...', contents);
  });
  return data;
};
