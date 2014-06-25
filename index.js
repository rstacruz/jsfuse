var Fs = require('fs'),
  Path = require('path'),
  files, tpl =
    "((function(){"+
      "var module={exports:{}},exports=module.exports;"+
      "(function(){...})();"+
      "return module.exports;"+
    "})())";

module.exports = function jsfuse (file, depth) {
  var data = Fs.readFileSync(file, 'utf-8');
  var path = Path.dirname(file);

  // first run
  if (!depth) {
    depth = 0;
    files = {};
  }

  data = data.replace(/require\(['"](\..*?)['"]\)/g, function (e, modulepath) {
    var fname = Path.join(path, modulepath + '.js');

    if (files[fname]) throw new Error("jsfuse(): circular dependency: "+fname);
    files[fname] = true;

    var contents = jsfuse(fname, depth+1);
    return tpl.replace('...', contents);
  });
  return data;
};
