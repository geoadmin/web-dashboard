var nconf = require('nconf');
var fs = require('fs');
nconf.argv().env().file('config.json').add('secret-file', {type: 'file', file: '.config.json'});
if (fs.existsSync('/var/www/.web-dashboard')) {
  nconf.add('secret-instance-file', {type: 'file', file: '/var/www/.web-dashboard'});
}

nconf.set('port', nconf.get('port') || 3030);

module.exports.get = function() { return nconf; };
