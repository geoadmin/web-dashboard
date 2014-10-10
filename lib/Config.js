var nconf = require('nconf');
var fs = require('fs');
nconf.argv().env().file('config.json').add('secret-file', {type: 'file', file: '.config.json'});
if (fs.existsSync('/var/www/.web-dashboard')) {
  console.log("Adding file....");
  nconf.add('/var/www/.web-dashboard', {type: 'file', file: '.config.json'});
}

console.log("EC User is: ", nconf.get('ES_USERNAME'));

nconf.set('port', nconf.get('port') || 3030);

module.exports.get = function() { return nconf; };
