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

module.exports = function jsfuse (file, depth) {
  var data = Fs.readFileSync(file, 'utf-8');
  var path = Path.dirname(file);

  // first run
  if (!depth) depth = 0;

  data = data.replace(/require\(['"](\..*?)['"]\)/g, function (e, modulepath) {
    var fname = Path.join(path, modulepath + '.js');
    var contents = jsfuse(fname, depth+1);
    return tpl.replace('...', contents);
  });

  if (depth === 0)
    return wrapper.replace('...', data);
  else
    return data;
};
