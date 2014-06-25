var Fs = require('fs'),
  Path = require('path'),
  tpl =
    "(function(){"+
      "var module={exports:{}},exports=module.exports;"+
      "(function(){...})();"+
      "return module.exports;"+
    "}())",
  wrapper =
    "(function(){\n...}())";

module.exports = function jsfuse (file, options, depth) {
  var data = Fs.readFileSync(file, 'utf-8');
  var path = Path.dirname(file);
  if (!options) options = {};

  // first run
  if (!depth) depth = 0;

  data = data.replace(/require\(['"](\..*?)['"]\)/g, function (e, modulepath) {
    var fname = Path.join(path, modulepath + '.js');
    var contents = jsfuse(fname, options, depth+1);
    return tpl.replace('...', contents);
  });

  if (depth === 0 && !options.bare)
    return wrapper.replace('...', data);
  else
    return data;
};
