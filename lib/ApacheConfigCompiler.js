var fs = require('fs');
var conf = require('./Config.js').get();
var Mustache = require('mustache');
var getData = function(srcPath, callback) { 
  fs.readFile(srcPath, 'utf8', function (err, data) {
    if (err) throw err;
      callback(data);
  });
};
var writeData = function(savPath, data) {
  fs.writeFile (savPath, data, function(err) {
    if (err) throw err;
     console.log('File written: ' + savPath);
  });
};
module.exports.compile = function(){
  getData('./apache/web-dashboard.conf.mst', function(data){
    var view = {
      port: conf.get('port'),
      apache_path: conf.get('apache_path')
    };
    var output = Mustache.render(data, view);
    writeData('./apache/web-dashboard.conf', output);
  });
};
